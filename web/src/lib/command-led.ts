import { CommandLed } from "../data-type";

const ARDUINO_URL = import.meta.env.VITE_ARDUINO_URL;
export async function commandLed({ color, delay, action }: CommandLed) {
  const response = await fetch(
    `${ARDUINO_URL}:5000/led?color=${color}&delay=${delay}&action=${action}`
  );
  if (response.ok) return true;
  return false;
}
