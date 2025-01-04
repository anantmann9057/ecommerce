import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    enum: ["user", "author", "admin"],
    default: "user",
  },
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
