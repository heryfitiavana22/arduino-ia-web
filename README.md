# arduino-ia-web
Contrôler des LEDs en utilisant l'IA, l'arduino et le web

## Demo

https://github.com/heryfitiavana22/arduino-ia-web/assets/105294881/1b4681bd-df91-4931-b22b-fe3e85492104



## IA utilisé 
- Modèle [`openai/whisper-large-v3`](openai/whisper-large-v3) de [`Hugging Face`](https://huggingface.co/) pour transcrire l'audio en texte
- [`Gemini`](https://ai.google.dev/gemini-api?hl=fr) pour transfomer la commande en séquence

## Installation
### Pré-requis 
- Arduino (microcontrôleur) avec module wifi : `esp32`, `esp8622`, ... (ici c'est `Arduino Wemos d1 r2` qui est basé sur `esp8622`)

### Schéma du montage
[Schéma tinkercad](https://www.tinkercad.com/things/eyMkdizslbK-arduino-ia-schema?sharecode=Uh9K5QIhPXPalWjdm8trB4nPp_uR-Yu5L5nm1TKFP8U)

### Clone repo
```bash
  git clone https://github.com/heryfitiavana22/arduino-ia-web.git
  cd arduino-ia-web
```

### Arduino
- Réaliser le montage
- Changez le `ssid` et `password` dans le code
- Téléversez le programme sur votre Arduino.

### web
> Créer le fichier `.env` et mettre les valeurs exactes
```bash
  cd web
  npm install 
  npm run dev
```
