"use client";

import { useMemo, useState } from "react";
import AudioButton from "@/components/audio/audio-button";
import { scoreReview } from "@/lib/progress/storage";

export default function FlashcardDeck({ words }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviews, setReviews] = useState([]);
  const word = words[index] || null;
  const due = useMemo(() => reviews.length, [reviews]);
  if (!word) return <p>No flashcards found.</p>;
  const rate = (quality) => {
    setReviews((current) => [
      ...current,
      {
        wordId: word.id,
        quality,
        nextReviewAt: scoreReview(quality),
        reviewedAt: new Date().toISOString(),
      },
    ]);
    setFlipped(false);
    setIndex((current) => (current + 1) % words.length);
  };
  return (
    <div className="space-y-5">
      <div className="rounded-[2.5rem] border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-teal-50 p-5 text-center shadow-2xl shadow-amber-900/10 dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-teal-950/40 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          Card {index + 1} / {words.length} - Reviews this session {due}
        </p>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="mt-8 min-h-72 w-full rounded-[2rem] border border-dashed border-amber-300 bg-white/82 p-8 shadow-inner dark:border-white/10 dark:bg-slate-900/70"
        >
          {!flipped ? (
            <span className="hanzi-display block text-7xl font-black text-slate-950 dark:text-white sm:text-8xl">
              {word.hanzi}
            </span>
          ) : (
            <span className="space-y-4 text-left">
              <span className="block text-4xl font-black text-slate-950 dark:text-white">
                {word.pinyin}
              </span>
              <span className="block text-xl font-bold text-slate-700 dark:text-slate-200">
                {word.meaning.en}
              </span>
              <span
                className="block text-xl font-bold text-slate-500 dark:text-slate-400"
                dir="rtl"
              >
                {word.meaning.ar || "Arabic translation pending"}
              </span>
              <span className="block rounded-2xl bg-slate-950/[0.04] p-4 text-sm font-semibold text-slate-500 dark:bg-white/[0.06]">
                {word.example.hanzi || "Example sentence pending review"}
              </span>
            </span>
          )}
        </button>
        <div className="mt-5 flex justify-center">
          <AudioButton src={word.audio.word} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Again", "bg-rose-600"],
          ["Hard", "bg-amber-600"],
          ["Good", "bg-teal-700"],
          ["Easy", "bg-slate-950"],
        ].map(([quality, color]) => (
          <button
            key={quality}
            type="button"
            onClick={() => rate(quality)}
            className={`rounded-2xl px-4 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 ${color}`}
          >
            {quality}
          </button>
        ))}
      </div>
    </div>
  );
}
