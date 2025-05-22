import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password, phoneNumber, role } = req.body;
        if (!email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All Fields are Required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email Already Exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid Email Format' });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!validator.isMobilePhone(phoneNumber, 'en-IN')) {
            return res.status(400).json({ message: 'Invalid Phone Number' });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedUsername = username?.trim();
        const trimmedPhone = phoneNumber.trim();

        const user = await User.create({
            username: trimmedUsername, email: trimmedEmail, password: hashedPassword, phoneNumber: trimmedPhone, role
        })

        return res.status(201).json({ message: 'User Created Successfully', user })
    }
    catch (error) {
        return res.status(500).json({ message: 'Signup Failed', error });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');;
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        console.log("HI");

        return res.status(200).json({ token, user: { username: user.username, email: user.email, phoneNumber: user.phoneNumber, role: user.role } })
    }
    catch (error) {
        return res.status(500).json({ message: 'Login Failed', error });
    }
}


