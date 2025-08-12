import { compare } from "bcrypt";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
//const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in seconds

const maxAgeSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
const maxAgeMs = maxAgeSeconds * 1000;  // 3 days in milliseconds for cookie

const createToken = ({ email, userId }) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAgeSeconds });
}

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }


        const user = await User.create({ email, password });
        res.cookie("jwt", createToken({ email: user.email, userId: user._id }),
            {
                maxAgeSeconds,
                secure: true, // Set to true if using HTTPS
                sameSite: 'none',
            }
        );
        console.log("Received signup request:", { email, password });
        return res.status(201).json({
            message: "User created successfully",
            user: {
                userId: user._id,
                email: user.email,
                profileSetup: user.profilesetup,
            },
            success: true
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message // optional, remove in production if sensitive
        });
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User with this email does not exist",
                success: false
            });
        }

        const auth = await compare(password, existingUser.password);
        if (!auth) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }
        const user = existingUser;
        // Set the JWT token in the cookie
        res.cookie("jwt", createToken({ email: user.email, userId: user._id }),
            {
                maxAgeSeconds,
                secure: true,
                sameSite: 'none',
            }
        );
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                userId: user._id,
                email: user.email,
                profileSetup: user.profilesetup,
                firstName: user.firstname,
                lastName: user.lastname,
                image: user.image,
                color: user.color
            },
            success: true
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}