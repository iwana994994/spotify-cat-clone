import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = (req, res, next) => {
    const auth = req.auth(); // pozovi kao funkciju
    if (!auth || !auth.userId) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    
    next();
  };
export const requireAdmin = async (req, res, next) => {
    try {
        const userId = req.auth.userId; // 👈 uzmi userId iz req.auth
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const currentUser = await clerkClient.users.getUser(userId);
        

        const userEmail = currentUser.emailAddresses?.[0]?.emailAddress; // 👈 izvući email
        const isAdmin = process.env.ADMIN_EMAIL === userEmail;

        console.log("CheckAdmin - ADMIN_EMAIL:", process.env.ADMIN_EMAIL);


        console.log("isAdmin:", isAdmin);

        if (!isAdmin) {
            return res.status(403).json({ message: "Email address doesn't match admin" });
        }

        next(); // ✅ ako jeste admin, nastavi dalje
    } catch (error) {
        console.error("Error checking admin status:", error);
        return res.status(500).json({ message: "Server error while checking admin" });
    }
};
