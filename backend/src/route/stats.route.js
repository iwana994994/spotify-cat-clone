import { Router } from "express";
import { getStats } from "../controller/stats.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const route= Router();

route.use(protectRoute);

route.get("/", getStats)

export default route