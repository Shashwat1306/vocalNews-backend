import axios from "axios";

export const generateAudio = async (text, voice_id = "en-US-natalie", translate = true) => {
  try {
    const data = {
      text,
      voice_id,
      translate,
    };
    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    ); 
    return response.data.audioFile;
  } catch (error) {
    console.error("Error generating audio:", error.response?.data || error);
    throw error;
  }
};
