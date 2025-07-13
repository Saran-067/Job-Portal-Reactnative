import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"; // ✅ make sure path is correct

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        const user = await User.findById(decode.userId); // 🔑 fetch user
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        req.user = user; // ✅ Attach the whole user object to req
        next();
    } catch (error) {
        console.log("Auth Error:", error);
        return res.status(500).json({
            message: "Internal authentication error",
            success: false
        });
    }
};

export default isAuthenticated;
