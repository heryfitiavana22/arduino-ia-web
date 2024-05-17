# arduino-ia-web
Contrôler des leds en utilisant l'IA, l'arduino et le web

## Demo
<video src="./demo.mp4" controls></video>

## IA utilisé 
- Le model [`openai/whisper-large-v3`](openai/whisper-large-v3) dans [`Hugging Face`](https://huggingface.co/) pour transcrire l'audio en texte
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
- réaliser le montage
- changer le `ssid` et `password` dans le code
- téléverser le programme

### web
> Créer le fichier `.env` et mettre les valeurs exactes
```bash
  cd web
  npm install 
  npm run dev
```
