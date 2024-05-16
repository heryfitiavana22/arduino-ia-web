import axios from "axios";
import { HF_TOKEN } from "./utils";

export async function audioToText(data: Blob) {
  const response = await axios.post<Response>(
    "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
    data,
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status != 200)
    throw new Error(
      "Réessayer avec moins de bruit ou approcher un peu plus sur le micro"
    );

  return response.data.text;
}

type Response = {
  text: string;
};
