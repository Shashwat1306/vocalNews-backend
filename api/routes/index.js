import express from "express";
import userRoutes from "./user-routes.js";
import newsRoutes from "./news-routes.js";
import savedNewsRoutes from "./savedNews-routes.js";
export const indexRoute=express.Router();
indexRoute.use("/user",userRoutes);
indexRoute.use("/news",newsRoutes);
indexRoute.use("/saved-news", savedNewsRoutes);