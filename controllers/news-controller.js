import { generateAudio } from "../services/murf-ai-service.js";
import { fetchLatestNews } from "../services/news-service.js";
export const convertNewsToAudio = async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const audioFile = await generateAudio(text, voiceId);
    if (!audioFile) {
      return res.status(500).json({ error: "No audio file returned from Murf" });
    }
    return res.json({ audioUrl: audioFile });
  } catch (error) {
    console.error("Error in convertNewsToAudio:", error.response?.data || error);
    res.status(500).json({ error: "Failed to convert news to audio" });
  }
};

export const convertLatestNewsToAudio = async (req, res) => {
  try {
    console.log("Starting convertLatestNewsToAudio...");
    
    console.log("Fetching latest news...");
    const news = await fetchLatestNews();
    console.log("News fetched:", { title: news.title, hasDescription: !!news.description });
    
    if (!news || (!news.title && !news.description)) {
      return res.status(404).json({ error: "No news found" });
    }
    
    const text = news.description || news.title;
    const voiceId = req.body?.voiceId || "en-US-natalie";
    console.log("Generating audio for text length:", text.length, "with voice:", voiceId);
    
    const audioFile = await generateAudio(text, voiceId);
    console.log("Audio generated:", !!audioFile);
    
    if (!audioFile) {
      return res.status(500).json({ error: "No audio file returned from Murf" });
    }
    
    res.json({ news, audioUrl: audioFile });
  } catch (error) {
    console.error("Error in convertLatestNewsToAudio:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to fetch or convert news", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

