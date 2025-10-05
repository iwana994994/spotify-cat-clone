import {Router} from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const route= Router();

route.get("/",getAllAlbums)
route.get("/:id",getAlbumById)
export default route