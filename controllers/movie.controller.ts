import { Request, Response } from 'express';
import Movie from '../models/movie.model';
import uploadToCloudinary from '../utils/cloudinaryUpload';

export const createMovie = async (req: Request, res: Response): Promise<any> => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const posterFile = files?.poster?.[0];
        const bannerFile = files?.banner?.[0];

        const { title, description, duration, releaseYear, genre, director, writer, actors, streamingPlatform } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const posterResult = await uploadToCloudinary(posterFile, 'posters');
        const bannerResult = await uploadToCloudinary(bannerFile, 'banners');

        const movie = new Movie({
            title,
            description,
            duration,
            releaseYear,
            genre: genre?.split(',').map((g: string) => g.trim()),
            director: director?.split(',').map((d: string) => d.trim()),
            writer: writer?.split(',').map((w: string) => w.trim()),
            actors: actors?.split(',').map((a: string) => a.trim()),
            streamingPlatform: streamingPlatform?.split(',').map((s: string) => s.trim()),
            poster: posterResult.secure_url,
            banner: bannerResult.secure_url,
        });

        console.log("HI");
        const savedMovie = await movie.save();

        return res.status(201).json({
            message: 'Movie created successfully',
            movie: savedMovie
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Movie Upload Poster' });
    }
}