const axios = require("axios");

async function generateEmbedding(text) {
  try {
    // ✅ OpenRouter Primary
    const response = await axios.post(
      "https://openrouter.ai/api/v1/embeddings",
      {
        model: "text-embedding-3-small",
        input: text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      },
    );

    console.log("OpenRouter embedding succeeded.");
    return response.data.data[0].embedding; // <- ensure return
  } catch (openRouterError) {
    console.error("OpenRouter failed:", openRouterError.message);

    try {
      // ✅ OpenAI Fallback
      const openaiRes = await axios.post(
        "https://api.openai.com/v1/embeddings",
        {
          model: "text-embedding-3-small",
          input: text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        },
      );

      console.log("OpenAI embedding succeeded.");
      return openaiRes.data.data[0].embedding;
    } catch (openaiError) {
      console.error("OpenAI also failed:", openaiError.message);
      throw new Error("Both OpenRouter and OpenAI embedding failed.");
    }
  }
}

module.exports = { generateEmbedding };
