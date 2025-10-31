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
    // audioFile may be an object { translatedText, audioUrl } or a direct string URL.
    const audioUrl = typeof audioFile === 'string' ? audioFile : (audioFile.audioUrl || audioFile);
    return res.json({ audioUrl });
  } catch (error) {
    console.error("Error in convertNewsToAudio:", error.response?.data || error);
    res.status(500).json({ error: "Failed to convert news to audio" });
  }
};
const langMap = {
  en: "en-US",
  hi: "hi-IN",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
};
const voiceMap={
  en: "en-US-natalie",
  hi : "hi-IN-shweta",
  es : "es-ES-carmen",
  fr : "fr-FR-adélie",
  de : "de-DE-lukas",
};

export const convertLatestNewsToAudio = async (req, res) => {
  try {
    console.log("🔍 Starting convertLatestNewsToAudio...");
    console.log("📥 Request body:", req.body);
    
    const { lang, category } = req.body;
    console.log("🌍 Selected language:", lang);
    console.log("📂 Selected category:", category);
    
    console.log("📰 Fetching latest news...");
    const news = await fetchLatestNews(category || 'technology');
    console.log("✅ News fetched:", { title: news.title, hasDescription: !!news.description, category: news.category });
    
    if (!news || (!news.title && !news.description)) {
      return res.status(404).json({ error: "No news found" });
    }
    
    const targetLang = langMap[lang] || "en";
    console.log("🌍 Selected target language:", targetLang);
    
    const voiceId = voiceMap[lang] || voiceMap.en;
    console.log("🎙️ Voice ID selected:", voiceId);

    const text = news.title + " ." + news.description;
    console.log("📝 Text to convert (length:", text.length, ")");
    
    const audioFile = await generateAudio(text, voiceId,targetLang);
    console.log("✅ Audio generated:", !!audioFile);

    if (!audioFile) {
      return res.status(500).json({ error: "No audio file returned from Murf" });
    }

    const audioUrl = typeof audioFile === 'string' ? audioFile : (audioFile.audioUrl || audioFile);

    res.json({ 
      news, 
      // prefer translatedText (from generateAudio) or fall back to cleanText if present
      translatedText: audioFile?.translatedText || audioFile?.cleanText || "",
      audioUrl, 
      language: lang || "en",
      category: category || "technology"
    });
  } catch (error) {
    console.error("❌ Error in convertLatestNewsToAudio:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to fetch or convert news", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

