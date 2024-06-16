import { Schema, model } from "mongoose";

const productSchema = new Schema({
  imgUrl: { type: String },
  nameProduct: { type: String },
  company: { type: String },
  info: { type: String },
  price: { type: String },
});

export const ProductModel = model("product", productSchema);
