const token = import.meta.env.VITE_GEMINI_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!token) throw new Error("Set hugging face token in environment variable");
export const HF_TOKEN = token;

const genAI = new GoogleGenerativeAI(token);
export const gemini = genAI.getGenerativeModel({ model: "gemini-pro" });
