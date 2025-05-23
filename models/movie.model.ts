import mongoose, { Schema, Document } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: true
    },
    poster: {
        type: String
    },
    banner: {
        type: String
    },
    genre: [
        { type: String, required: true },
    ],
    director: [
        { type: String }
    ],
    writer: [
        { type: String }
    ],
    actors: [
        { type: String }
    ],
    streamingPlatform: [
        { type: String, required: true }
    ]
})

export default mongoose.model('Movie', movieSchema);