import express from "express";
import userRoutes from "./user-routes.js";
import newsRoutes from "./news-routes.js";
export const indexRoute=express.Router();
indexRoute.use("/user",userRoutes);
indexRoute.use("/news",newsRoutes);
