import { clerkClient } from "@clerk/express";
export const protectRoute = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "You are not logged in" });
    }
    next();
};