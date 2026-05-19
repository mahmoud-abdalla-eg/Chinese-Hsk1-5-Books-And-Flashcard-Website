"use client";

import { useRef, useState } from "react";

function compareText(expected, recognized) {
  const expectedChars = [...(expected || "").replace(/\s/g, "")];
  const recognizedSet = new Set([...(recognized || "").replace(/\s/g, "")]);
  if (!expectedChars.length)
    return { score: 0, missingWords: [], incorrectWords: [] };
  const hits = expectedChars.filter((char) => recognizedSet.has(char)).length;
  const missingWords = expectedChars.filter((char) => !recognizedSet.has(char));
  return {
    score: Math.round((hits / expectedChars.length) * 100),
    missingWords,
    incorrectWords: [],
  };
}

export default function PronunciationRecorder({ expectedText }) {
  const [status, setStatus] = useState("idle");
  const [audioUrl, setAudioUrl] = useState("");
  const [result, setResult] = useState(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    setResult(null);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) {
        setResult({
          score: 0,
          recognizedText: "",
          expectedText,
          estimated: true,
          missingWords: [],
          incorrectWords: [],
          message: "Browser speech recognition is unavailable.",
        });
        return;
      }
      const recognition = new Recognition();
      recognition.lang = "zh-CN";
      recognition.onresult = (event) => {
        const recognizedText = event.results?.[0]?.[0]?.transcript || "";
        setResult({
          ...compareText(expectedText, recognizedText),
          recognizedText,
          expectedText,
          estimated: true,
        });
      };
      recognition.onerror = () =>
        setResult({
          score: 0,
          recognizedText: "",
          expectedText,
          estimated: true,
          missingWords: [],
          incorrectWords: [],
          message: "Could not transcribe this attempt.",
        });
      recognition.start();
    };
    recorderRef.current = recorder;
    recorder.start();
    setStatus("recording");
  };

  const stop = () => {
    recorderRef.current?.stop();
    setStatus("idle");
  };

  return (
    <div className="rounded-3xl border border-teal-200 bg-teal-50/70 p-4 dark:border-teal-900 dark:bg-teal-950/30">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={status === "recording" ? stop : start}
          className="rounded-full bg-teal-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-900/20"
        >
          {status === "recording" ? "Stop recording" : "Record pronunciation"}
        </button>
        {audioUrl ? (
          // The learner's temporary recording has no transcript until speech recognition finishes.
          // biome-ignore lint/a11y/useMediaCaption: user-generated pronunciation recordings are ephemeral review audio.
          <audio
            controls
            src={audioUrl}
            className="h-10"
            aria-label="Your pronunciation recording"
          />
        ) : null}
      </div>
      {result ? (
        <div className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
          <strong className="text-2xl text-teal-800 dark:text-teal-200">
            {result.score}% {result.estimated ? "estimated score" : "accuracy"}
          </strong>
          <span>Expected: {result.expectedText}</span>
          <span>
            Recognized: {result.recognizedText || "No text recognized"}
          </span>
          {result.missingWords?.length ? (
            <span>Missing characters: {result.missingWords.join(" ")}</span>
          ) : null}
          {result.message ? <span>{result.message}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
