import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CalendarMonth, CalendarEvent } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCalendarImage = async (
  monthData: CalendarMonth
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    // Construct a vivid prompt for the image generation
    const prompt = `
      Create a high-quality, photorealistic calendar illustration for ${monthData.name} of year 2026.
      
      Atmosphere & Weather: ${monthData.weatherDescription}.
      Style: Cinematic lighting, serene, elegant, 4k resolution, high detail, masterpiece.
      
      Typography Integration (CRITICAL):
      The image MUST include the following Bible verse text integrated naturally and elegantly into the composition.
      Verse: "${monthData.defaultVerse}"
      
      CALLIGRAPHY STYLE:
      - The text MUST be written in **COLORFUL, VIBRANT, ARTISTIC CALLIGRAPHY**.
      - Use rich, harmonious colors (e.g., gold, royal blue, emerald green, deep crimson) that contrast beautifully with the background.
      - Do NOT use plain black or white text. The lettering itself should be a work of art.
      - The font should be large, flowing, and legible hand-lettering script.
    `;

    // Using gemini-3-pro-image-preview for best text rendering capabilities
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
            aspectRatio: "4:3", // Landscapeish but suitable for calendar top
            imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    throw new Error("No image data returned");

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generateMockEvents = async (
  monthData: CalendarMonth,
  userEmail: string
): Promise<CalendarEvent[]> => {
  try {
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const daysInMonth = new Date(monthData.year, monthData.monthIndex + 1, 0).getDate();
    const prompt = `
      Generate a list of plausible calendar events for a Korean Christian user (email: ${userEmail}) for ${monthData.name} ${monthData.year}.
      The user is likely active in church.
      
      Include:
      1. Every Sunday: "주일 대예배" (Sunday Worship) at 11:00 AM.
      2. Every Wednesday: "수요 예배" (Wednesday Service) at 07:30 PM.
      3. Every Friday: "금요 철야" (Friday Night Prayer) at 09:00 PM.
      4. Add 3-5 random personal events appropriate for the season (e.g., family dinner, bible study group, hiking, coffee with friends).
      5. Add 1-2 special church events (e.g., choir practice, outreach).

      The dates must be valid for ${monthData.name} ${monthData.year}.
      Total events should be around 15-20.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              startDate: { type: Type.STRING, description: "YYYY-MM-DD format" },
              startTime: { type: Type.STRING, description: "HH:mm format" },
              endTime: { type: Type.STRING, description: "HH:mm format" },
            },
            required: ["title", "startDate", "startTime", "endTime"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as CalendarEvent[];

  } catch (error) {
    console.error("Error generating events:", error);
    return [];
  }
};
