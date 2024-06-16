import jwt from "jsonwebtoken";
import express from "express";

export const authMiddleWare = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader?.split(" ")?.[1];
  try {
    if (accessToken) {
      const userPayload = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.user = userPayload;
      next();
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
