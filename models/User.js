import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Ensure _id is a string
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;