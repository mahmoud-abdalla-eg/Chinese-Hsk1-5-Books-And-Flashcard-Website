"use client";

import { useEffect, useState } from "react";
import AudioButton from "@/components/audio/audio-button";
import PronunciationRecorder from "@/components/pronunciation/pronunciation-recorder";
import { defaultProgress, progressKey } from "@/lib/progress/storage";

export default function WordStudyPanel({ word }) {
  const [progress, setProgress] = useState(defaultProgress());
  useEffect(() => {
    const saved = window.localStorage.getItem(progressKey);
    if (saved) setProgress(JSON.parse(saved));
  }, []);
  const persist = (next) => {
    const withDate = { ...next, lastStudiedDate: new Date().toISOString() };
    setProgress(withDate);
    window.localStorage.setItem(progressKey, JSON.stringify(withDate));
  };
  const toggle = (key, id) => {
    const set = new Set(progress[key]);
    set.has(id) ? set.delete(id) : set.add(id);
    persist({ ...progress, [key]: [...set] });
  };
  const learned = progress.learnedWords.includes(word.id);
  const favorite = progress.favorites.includes(word.id);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <AudioButton src={word.audio.word} label="Play word audio" />
        <AudioButton src={word.audio.example} label="Play example sentence" />
        <button
          type="button"
          onClick={() => toggle("favorites", word.id)}
          className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-black text-rose-700 dark:border-rose-900 dark:bg-slate-950 dark:text-rose-200"
        >
          {favorite ? "Saved to favorites" : "Save to favorites"}
        </button>
        <button
          type="button"
          onClick={() => toggle("learnedWords", word.id)}
          className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700 dark:border-emerald-900 dark:bg-slate-950 dark:text-emerald-200"
        >
          {learned ? "Learned" : "Mark as learned"}
        </button>
      </div>
      <PronunciationRecorder expectedText={word.example.hanzi || word.hanzi} />
    </div>
  );
}
