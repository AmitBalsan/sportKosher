import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { logOut, loginUser, registerUser } from "./controllers/users";
import { addProduct, getProducts } from "./controllers/products";
import { addArticle, getArticles } from "./controllers/articles";
import { authMiddleWare } from "./middleWares/authMiddleWares";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  try {
    mongoose.connect(mongoUri).then(() => {
      console.log("MongoDB is connected!");
    });
  } catch (err) {
    console.error(err);
  }
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://sportkosher.onrender.com/",
      "https://sportkosher.onrender.com:5173/",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(express.json());
app.put("/register-user", registerUser);
app.post("/login", loginUser);

app.post("/send-email", async (req: express.Request, res: express.Response) => {
  console.log("enter send - mail");
  console.log(req.body);
  const { email, subject, message } = req.body;
  console.log(email, subject, message);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amit.b390@gmail.com",
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: email,
    to: "amit.b390@gmail.com",
    subject: subject,
    text: `From : ${email} \n\n  ${message} `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Mail sent successfully.");
  } catch (error) {
    console.error("Error sending mail: ", error);
    res.status(500).send("Error sending mail , please try again later.");
  }
});
app.post("/api/add-product", addProduct);
app.post("/api/add-article", addArticle);
app.get("/api/products", getProducts);
app.get("/api/articles", getArticles);
app.post("logout", authMiddleWare, logOut);

app.listen(PORT, () => {
  console.log("Port 3000 is running.");
});
