import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access Denied, Token not Found' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }

    if (user.role !== 'admin') {
        res.status(403).json({ message: 'Forbidden: Admins only' });
        return;
    }

    next();
};