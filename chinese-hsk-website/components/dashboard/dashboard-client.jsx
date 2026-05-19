"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Pill, ProgressBar, Surface } from "@/components/ui/card";
import { defaultProgress, progressKey } from "@/lib/progress/storage";

export default function DashboardClient({ summaries }) {
  const [progress, setProgress] = useState(defaultProgress());
  useEffect(() => {
    const saved = window.localStorage.getItem(progressKey);
    if (saved) setProgress(JSON.parse(saved));
  }, []);
  const learnedSet = useMemo(
    () => new Set(progress.learnedWords),
    [progress.learnedWords],
  );
  const totalWords = summaries.reduce((sum, item) => sum + item.wordCount, 0);
  const percent = totalWords
    ? Math.round((learnedSet.size / totalWords) * 100)
    : 0;
  const recent = progress.reviewHistory.slice(-5).reverse();
  return (
    <div className="space-y-8 pb-8">
      <Surface className="grid gap-8 p-7 lg:grid-cols-[1fr_360px] lg:items-center lg:p-10">
        <div>
          <Pill>Local progress</Pill>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
            Your Mandarin cockpit.
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
            Track learned words, favorites, flashcard reviews, pronunciation
            scores, completed conversations, completed units, and recent study
            activity in localStorage first.
          </p>
        </div>
        <Card className="bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <div className="text-6xl font-black">{percent}%</div>
          <p className="mt-1 font-bold opacity-75">overall course progress</p>
          <div className="mt-5">
            <ProgressBar value={percent} />
          </div>
        </Card>
      </Surface>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <span className="text-4xl font-black">{learnedSet.size}</span>
              <p className="font-bold">words learned</p>
            </div>
            <div className="rounded-3xl bg-amber-200 p-5 text-amber-950">
              <span className="text-4xl font-black">
                {progress.favorites.length}
              </span>
              <p className="font-bold">favorites</p>
            </div>
            <div className="rounded-3xl bg-teal-200 p-5 text-teal-950">
              <span className="text-4xl font-black">{totalWords}</span>
              <p className="font-bold">course words</p>
            </div>
          </div>
          <div className="mt-8 space-y-5">
            {summaries.map((summary) => (
              <div key={summary.level}>
                <div className="mb-2 flex justify-between text-sm font-black">
                  <span>HSK {summary.level}</span>
                  <span>{percent}%</span>
                </div>
                <ProgressBar value={percent} />
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              Recommended next lesson
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
              Start with HSK 1 Unit 1, then alternate conversation mode and
              flashcards. Weak-word detection becomes useful after a few review
              sessions.
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              Recent study activity
            </h2>
            <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
              {recent.length ? (
                recent.map((item) => (
                  <span key={item.reviewedAt}>
                    {item.wordId} - {item.quality}
                  </span>
                ))
              ) : (
                <span>No review history yet.</span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
