import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user","editor", "admin", "student"], default: "user" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;