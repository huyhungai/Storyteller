
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, StoryAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(data: FormData): string {
  const { inputText, storyStyle, language, audience, outputLength } = data;

  const audienceString = `Age: ${audience.age}, Gender: ${audience.gender}, Expertise: ${audience.expertise}, Interests: ${audience.interests}`;

  return `You are an expert writing assistant specializing in storytelling. Your task is to help a user improve their writing based on specific criteria.

Analyze the following text:
---
${inputText}
---

Apply the following constraints:
- Storytelling Style: ${storyStyle}
- Target Language: ${language}
- Target Audience: ${audienceString}
- Desired Output Length for rewrite: Approximately ${outputLength} words.

Provide your response in a structured JSON format. The JSON object must contain these exact keys: "analysis", "suggestions", "rewrittenText", "homework".

- "analysis": A concise analysis of the original text's strengths and weaknesses in relation to the chosen storytelling style.
- "suggestions": An array of objects, where each object represents a specific, actionable suggestion. Each object must have three string keys: "quote" (a short, relevant excerpt from the original text), "change" (the proposed new text for the quote), and "reason" (a clear explanation of why this change aligns better with the target style and audience).
- "rewrittenText": The full rewritten version of the story, incorporating all suggestions and adhering to the specified style, audience, and length.
- "homework": A short, practical exercise or a writing prompt to help the user practice the techniques discussed in the suggestions.

Ensure the entire response is in ${language}.
`;
}


export const enhanceStory = async (formData: FormData): Promise<StoryAnalysisResult> => {
  const prompt = buildPrompt(formData);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quote: { type: Type.STRING },
                change: { type: Type.STRING },
                reason: { type: Type.STRING },
              },
              required: ["quote", "change", "reason"],
            },
          },
          rewrittenText: { type: Type.STRING },
          homework: { type: Type.STRING },
        },
        required: ["analysis", "suggestions", "rewrittenText", "homework"],
      },
    },
  });
  
  const jsonText = response.text.trim();
  const parsedResult = JSON.parse(jsonText);
  
  return parsedResult as StoryAnalysisResult;
};
