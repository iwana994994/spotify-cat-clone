import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getAllUsers =async (req, res,next) => {
console.log("🚀 Ušao u getAllUsers");
try {
    console.log("🚀 Pozvana getAllUsers funkcija!");
    console.log("📌 req.auth:", req.auth);
    
    const filter = req.auth?.userId ? { clerkId: { $ne: req.auth.userId } } : {};
    console.log("🔍 Filter koji koristimo:", filter);

    const users = await User.find(filter).select("fullName email clerkId");
    console.log("🎯 Users iz baze:", users);

    res.status(200).json(users);
}
catch (error) {
    console.error("❌ Greska u getAllUsers:", error);
    res.status(500).json({ message: "Greška u serveru" });
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
}

}

export const getAllMessages =async (req, res,next) => {
    

     try {
         const myId= req.auth.userId; // 👈 uzmi userId iz req.auth
     const userId = req.params.id; // 👈 uzmi userId iz req.params.id

     const messages = await Message.find(
        {$or:[{senderId:myId},{receiverId:userId},
            {senderId:userId},{receiverId:myId}
        ]}).sort({createdAt:1})
     res.status(200).json(messages);
        
     } catch (error) {
        next(error);
        
     }
}