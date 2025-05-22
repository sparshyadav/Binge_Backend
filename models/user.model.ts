import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        trim: true
    },
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.role || this.role !== 'admin') {
        this.role = 'user';
    }
    next();
});

export default mongoose.model('User', userSchema);