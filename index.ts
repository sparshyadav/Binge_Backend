import express from "express";
import cors from 'cors';
import authRoutes from './routes/user.route';
import connectDB from "./config/db";
import dotenv from "dotenv"; 

dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log('Server Running on PORT: ', PORT);
})