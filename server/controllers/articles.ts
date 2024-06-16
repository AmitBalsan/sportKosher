import express from "express";
import { ArticleModel } from "../models/articleModel";

export const addArticle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { imgUrl, imgFile, title, text } = req.body;
    console.log(imgUrl, imgFile, title, text);
    const article = await new ArticleModel({
      imgUrl,
      imgFile,
      title,
      text,
    });

    await article.save();
    res.status(201).send("Article added successfully.");
  } catch (error) {
    res.status(500).render("internal error");
  }
};

export const getArticles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("entered getArticles in backend");
    const articles = await ArticleModel.find();

    res.status(200).send(articles);
  } catch (error) {
    console.error(error);
  }
};
