import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: { type: String },
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
});

export const UserModel = model("user", userSchema);
