import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  imgUrl: { type: String },
  imgFile: { type: Buffer },
  title: { type: String },
  text: { type: String },
});

export const ArticleModel = model("article", articleSchema);
