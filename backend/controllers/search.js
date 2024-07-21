
import User from '../models/user.js';

const search = async (req,res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "Query parameter 'q' is required" });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password');

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default search