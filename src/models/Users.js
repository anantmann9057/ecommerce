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
  fName: {
    type: String,
    trim: true,
  },
  lName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  image: {
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
