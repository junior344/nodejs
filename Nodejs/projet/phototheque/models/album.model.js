import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: [String],
},{timestamps: true});

export default mongoose.model('Album', albumSchema);