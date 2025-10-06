import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong, deleteSong,createAlbum,deleteAlbum,checkAdmin } from "../controller/admin.controller.js";
const router = Router();


router.get("/checkAdmin",protectRoute, checkAdmin);

router.post("/songs",protectRoute, requireAdmin, createSong);
router.delete("/songs/:id",protectRoute, requireAdmin , deleteSong);

router.post("/albums",protectRoute, requireAdmin, createAlbum);
router.delete("/albums/:id",protectRoute, requireAdmin,  deleteAlbum); 
export default router;