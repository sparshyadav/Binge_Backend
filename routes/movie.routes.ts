import express from "express";
import { createMovie } from "../controllers/movie.controller";
import upload from '../middlewares/multer';
import { authMiddleware, isAdmin } from "../middlewares/auth";

const router = express.Router();

router.post('/create-movie', authMiddleware, isAdmin, upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
])
    , createMovie);

export default router;