import { UserModel } from "../models/userModel";
import express from "express";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("register api entered");
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);
    const validateEmail = await UserModel.findOne({ email: email });
    if (validateEmail) {
      console.error("already registered");
    } else {
      console.log("good email");
      const userId = uuid();
      const user = new UserModel({ userId, fullName, email, password });
      await user.save();
      res.status(201).send("Registered completely.");
    }
  } catch (error) {
    res.status(500).render("internal error");
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("login backend entered");
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Bad request , missing email or password");
    }
    console.log(email, password);
    const validateUser = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (validateUser) {
      console.log("good login");
      const payload = { email, name: validateUser.fullName };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: `1h` }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).send("error try again or register");
    }
  } catch (error) {
    res.status(500).render("internal-error");
  }
};

export function logOut() {
  process.env.ACCESS_TOKEN_SECRET = "";
  process.env.REFRESH_TOKEN_SECRET = "";
  console.log("accessToken in env file:", process.env.ACCESS_TOKEN_SECRET);
  console.log("refreshToken in env file:", process.env.REFRESH_TOKEN_SECRET);
}
