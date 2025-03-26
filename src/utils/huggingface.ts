const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const API_URL = "https://api.mistral.ai/v1/chat/completions";

export async function query(message: string): Promise<string> {
  if (!MISTRAL_API_KEY) {
    console.error("Mistral API key is not configured");
    return "Sorry, the story generation service is not properly configured. Please contact support.";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content: "You are a creative storyteller. Generate engaging stories based on the user's prompt."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a story.";
  } catch (error) {
    console.error("Error querying Mistral AI API:", error);
    return "Sorry, I encountered an error generating the story. Please try again.";
  }
}