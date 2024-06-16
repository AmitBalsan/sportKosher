import express from "express";
import { ProductModel } from "../models/productModel";

export const addProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { imgUrl, nameProduct, company, info, price } = req.body;
    const product = await new ProductModel({
      imgUrl,
      nameProduct,
      company,
      info,
    });

    await product.save();
    res.status(201).send("Product added successfully.");
  } catch (error) {
    res.status(500).render("internal error");
  }
};

export const getProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("entered getProducts in backend");
    const products = await ProductModel.find();

    res.status(200).send(products);
  } catch (error) {
    console.error(error);
  }
};
