import { SavedNews } from "../models/saved-model.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model.js";

// ✅ Save a news article for a logged-in user
export const saveNews = async (req, res) => {
  try {
    // 1️⃣ Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // 2️⃣ Decode token to get user email
    const decoded = jwt.verify(token, "UCANTSEEME");
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // 3️⃣ Create saved news with userId attached
    const saved = await SavedNews.create({
      ...req.body,
      userId: user._id,
    });

    console.log(`✅ News saved for ${user.email}:`, saved.title || saved.url);
    res.status(201).json({ message: "News saved successfully!", saved });
  } catch (error) {
    console.error("❌ Error saving news:", error);
    res.status(500).json({ message: "Error saving news", error: error.message });
  }
};

// ✅ Get all saved news for the logged-in user
export const getSavedNews = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "UCANTSEEME");
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const news = await SavedNews.find({ userId: user._id });
    res.json(news);
  } catch (error) {
    console.error("❌ Error fetching saved news:", error);
    res.status(500).json({ message: "Error fetching saved news", error: error.message });
  }
};

// ✅ Delete a saved news article
export const deleteSavedNews = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "UCANTSEEME");
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const deleted = await SavedNews.findOneAndDelete({
      _id: req.params.id,
      userId: user._id,
    });

    if (!deleted)
      return res.status(404).json({ message: "News not found or not yours" });

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting saved news:", error);
    res.status(500).json({ message: "Error deleting saved news", error: error.message });
  }
};
