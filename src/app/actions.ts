// src/app/actions.ts

export async function handleChat(input: string) {
  try {
    // ✅ CORRECT ADDRESS: Found in your api.py (@app.post("/ask"))
    const API_URL = "https://ahmed-portfolio-api.onrender.com/ask"; 

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ CORRECT INPUT: Your API expects { "question": ... }
      body: JSON.stringify({ question: input }), 
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    
    // ✅ CORRECT OUTPUT: Your API returns { answer: "...", sources: ... }
    return { 
      answer: data.answer || "Connected, but the AI gave an empty answer." 
    };

  } catch (error) {
    console.error("Chat Error:", error);
    return { 
      answer: "Connection Error: The Render API is not responding. Please wait 50s for it to wake up." 
    };
  }
}