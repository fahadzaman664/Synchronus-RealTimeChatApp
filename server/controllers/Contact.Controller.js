import User from "../Models/user.model.js";

export const searchContact = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).send("searchTerm is required")
        }
        const sanitizeSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(sanitizeSearchTerm, "i")
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [{ firstname: regex }, { lastname: regex }, { email: regex }]
                }
            ],

        })
        return res.status(200).json({ contacts });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}