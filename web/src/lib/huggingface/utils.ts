const token = import.meta.env.VITE_HF_KEY;

if (!token) throw new Error("Set hugging face token in environment variable");
export const HF_TOKEN = token;
