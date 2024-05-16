import { CommandLed } from "../../data-type";
import { gemini } from "./utils";
// allume le led rouge, et aujourd'hui à 17h allume le blue puis eteindre la led rouge apres 5s
export async function textToSequence(prompt: string): Promise<CommandLed[]> {
  const result = await gemini.generateContent(`
    Traduire la demande suivante en une liste d'objets avec le couleurs, l'action et le délai (mettre tout les delai en millisecond) : 
    "${prompt}"
    
    Voici la forme de la liste d'objets attendus:
    [
        {"color": "color_value", "action": "or of off", "delay": delay_value,}
    ]

    Donne directement la reponse sans ajouter d'autres texte
    Fait attention au sequence et au delai. Mettre les couleurs en miniscule et en anglais
    La date actuelle est : ${new Date()}
  `);
  const response = result.response;
  const text = response.text();
  console.log(text);

  return JSON.parse(text);
}

