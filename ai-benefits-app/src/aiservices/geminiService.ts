import axios from 'axios';
import type { Benefit } from '../types';

// The API key is imported securely from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

// TypeScript interfaces for the Gemini API's request and response structure
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

/**
 * Cleans the raw text response from the Gemini API.
 * @param rawText The raw text, which might include markdown and extra spaces.
 * @returns A clean, simple string.
 */
const cleanGeminiResponse = (rawText: string): string => {
  return rawText.replace(/`/g, '').replace(/[\r\n]+/g, ' ').trim();
};

/**
 * Calls the Gemini API to classify user input into a specific category.
 * @param userInput The free-form text from the user.
 * @returns A promise that resolves to a single category string.
 */
const classifyHealthIssue = async (userInput: string): Promise<Benefit['category']> => {
  const prompt = `Return ONLY the category name from ["Dental", "OPD", "Vision", "Mental Health"] that best matches the following health issue: "${userInput}". Do not add any other text, formatting, or explanation.`;
  console.log("api key : ",API_KEY)
  try {
    const response = await axios.post<GeminiResponse>(API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const categoryText = response.data.candidates[0].content.parts[0].text;
    const cleanedCategory = cleanGeminiResponse(categoryText) as Benefit['category'];

    // Validate the response to ensure it's one of the allowed categories
    const validCategories: Benefit['category'][] = ["Dental", "OPD", "Vision", "Mental Health"];
    if (!validCategories.includes(cleanedCategory)) {
        throw new Error("Invalid category returned by the API.");
    }

    return cleanedCategory;

  } catch (error) {
    console.error("Axios failed fulled error object", error);
    throw new Error("Failed to classify the health issue. The API might be unavailable.");
  }
};

/**
 * Calls the Gemini API to generate a 3-step action plan for a given benefit.
 * @param benefit The benefit object selected by the user.
 * @returns A promise that resolves to a string containing the action plan.
 */
const generateActionPlan = async (benefit: Benefit): Promise<string> => {
  const prompt = `Create a simple, clear, 3-step action plan for a user to avail the health benefit titled "${benefit.title}". The benefit covers: "${benefit.description}". The steps should be numbered (1., 2., 3.) and concise. Do not add any introductory or concluding text.`;

  try {
    const response = await axios.post<GeminiResponse>(API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.4,
      },  
    });
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));
    const planText = response.data.candidates[0].content.parts[0].text;
    return cleanGeminiResponse(planText);
    
  } catch (error) {
    console.error("Error generating action plan:", error);
    throw new Error("Failed to generate an action plan. The API might be unavailable.");
  }
};

export default {generateActionPlan,classifyHealthIssue};