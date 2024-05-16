import { useEffect, useState } from "react";
import { audioToText } from "./lib/huggingface/audio-to-text";
import { textToSequence } from "./lib/gemini/text-to-sequence";
import { commandLed } from "./lib/command-led";

export default function App() {
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const startRecording = () => {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
      return alert("Votre navigateur ne supporte pas l'enregistrement vocal");

    setMessage("");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const tmpRecorder = new MediaRecorder(stream);
        tmpRecorder.ondataavailable = (e) => {
          setAudioChunks((prevChunks) => [...prevChunks, e.data]);
        };
        tmpRecorder.start();
        setMediaRecorder(tmpRecorder);
        setRecording(true);
      })
      .catch((err) => {
        alert("Erreur d'accès au microphone");
        console.error("Error accessing microphone:", err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setTranscribing(true);
    }
  };

  const requestSequenceLed = async () => {
    setTranscribing(true);
    try {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const text = await audioToText(audioBlob);
      const commandsLed = await textToSequence(text);

      for (const command of commandsLed) {
        commandLed(command);
      }
      setMessage("Command du led fait");
    } catch (error: any) {
      setMessage(error.message);
    }
    setTranscribing(false);
    setAudioChunks([]);
  };

  useEffect(() => {
    console.log(transcribing);
    console.log(audioChunks);

    if (transcribing && audioChunks.length > 0) {
      requestSequenceLed();
    }
  }, [transcribing, audioChunks]);

  return (
    <div className="container">
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {transcribing && <p>loading...</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
