import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export const recordAndTranscribe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("✅ Received file:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    // Convert Multer buffer → stream (Deepgram expects a stream)
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const response = await deepgram.listen.prerecorded.transcribeFile(
      bufferStream,
      {
        model: "nova-2",
        smart_format: true,
        language: "en-US",
        punctuate: true,
      }
    );

    const transcript =
      response?.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    if (!transcript.trim()) {
      console.warn("⚠️ No speech detected.");
      return res.status(200).json({ transcript: "", message: "No speech detected" });
    }

    console.log("🗣️ Transcript:", transcript);
    res.status(200).json({ transcript });
  } catch (err) {
    console.error("❌ Transcription error:", err);
    res.status(500).json({ error: "Transcription failed", details: err.message });
  }
};
