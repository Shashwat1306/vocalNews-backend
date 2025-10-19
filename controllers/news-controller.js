import { generateAudio } from "../services/murf-ai-service.js";

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

