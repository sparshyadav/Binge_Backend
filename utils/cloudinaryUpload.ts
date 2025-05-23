import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = (file: Express.Multer.File, folder: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error || !result) {
                    return reject(error);
                }

                resolve(result);
            }
        )

        stream.end(file.buffer);
    });
}

export default uploadToCloudinary;