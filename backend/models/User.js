import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
    loginTimestamp: { type: Date },
    logoutTimestamp: { type: Date },
    accessToken: { type: String },
});

const User = mongoose.model('User', UserSchema);

export default User;
