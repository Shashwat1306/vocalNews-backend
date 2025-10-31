import axios from "axios";

export const generateAudio = async (text, voice_id = "en-US-natalie", targetLang = "en") => {
  try {
    // 1️⃣ Step 1: Translate the text using Murf Translation API
    const translateResponse = await axios.post(
      "https://api.murf.ai/v1/text/translate",
      {
        texts: [text],
        target_language: targetLang,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    const translatedText = translateResponse.data?.translations?.[0]?.translated_text || text;
    console.log("🌐 Translated Text:", translatedText);
    const cleanText = translatedText.replace(/[^\P{C}\n]+/gu, '').trim();


    // 2️⃣ Step 2: Generate speech for translated text
    const ttsResponse = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        text: cleanText,
        voice_id,
        format : "mp3",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    const audioUrl = ttsResponse.data?.audioFile;
    console.log("🔊 Generated Audio URL:", audioUrl);

    // 3️⃣ Step 3: Return both
    return { cleanText, audioUrl };
  } catch (error) {
    console.error("❌ Error generating translated audio:", error.response?.data || error.message);
    throw error;
  }
};
