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
const voiceMap={
  en : "en-US-natalie",
  hi : "hi-IN-shweta",
  es : "es-ES-carmen",
  fr : "fr-FR-adélie",
  de : "de-DE-lukas",
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
    const {lang} = req.body;
    const voiceId=voiceMap[lang] || voiceMap.en;

    const text = news.description || news.title;
    console.log("Generating audio for text length:", text.length, "with voice:", voiceId);
    
    const audioFile = await generateAudio(text, voiceId,true);
    console.log("Audio generated:", !!audioFile);
    
    if (!audioFile) {
      return res.status(500).json({ error: "No audio file returned from Murf" });
    }
    
    res.json({ news, audioUrl: audioFile , language: lang || "en" });
  } catch (error) {
    console.error("Error in convertLatestNewsToAudio:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to fetch or convert news", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

