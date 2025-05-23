import express from "express";
import cors from 'cors';
import authRoutes from './routes/user.route';
import movieRoutes from './routes/movie.routes';
import connectDB from "./config/db";
import dotenv from "dotenv";
import { cloudinaryConnect } from "./config/cloudinary";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);

app.listen(PORT, () => {
    connectDB();
    cloudinaryConnect()
    console.log('Server Running on PORT: ', PORT);
})