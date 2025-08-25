import Message from "../Models/MessagesModel.js";
import User from "../Models/user.model.js";

export const getMessages = async (req, res) => {
    try {
        const user2 = req.body.id; 
        const user1 = req.userId;
        if (!user1 || !user2) {
            return res.status(400).send("Both user ID's are required")
        }

        const messages = await Message.find({
            $or: [{ sender: user1, receipent: user2 },
            { sender: user2, receipent: user1 }]
        }).sort({ timeStamp: 1 });
        return res.status(200).json({ messages });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}