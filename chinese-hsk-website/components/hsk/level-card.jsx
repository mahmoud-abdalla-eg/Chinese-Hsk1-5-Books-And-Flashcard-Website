import Link from "next/link";
import { Card, Pill, ProgressBar } from "@/components/ui/card";
import { levelThemes } from "@/lib/data/design";

export default function LevelCard({ summary }) {
  const theme = levelThemes[summary.level];
  return (
    <Card className="group relative min-h-[320px] overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(43,35,22,0.16)]">
      <div
        className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accent}`}
      />
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-200/55 blur-3xl transition duration-500 group-hover:scale-125 dark:bg-amber-500/10" />
      <div className="absolute bottom-5 right-5 font-serif text-8xl font-black text-slate-950/[0.035] dark:text-white/[0.04]">
        {summary.level}
      </div>
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <Pill>HSK {summary.level}</Pill>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white dark:bg-white dark:text-slate-950">
              {summary.progress}%
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              {theme.scene}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
              {theme.tone}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-950/[0.04] p-3 dark:bg-white/[0.06]">
              <strong className="block text-2xl text-slate-950 dark:text-white">
                {summary.wordCount}
              </strong>
              <span className="font-bold text-slate-500">words</span>
            </div>
            <div className="rounded-2xl bg-slate-950/[0.04] p-3 dark:bg-white/[0.06]">
              <strong className="block text-2xl text-slate-950 dark:text-white">
                {summary.unitCount}
              </strong>
              <span className="font-bold text-slate-500">units</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <ProgressBar value={summary.progress} />
          <Link
            href={`/hsk/${summary.level}`}
            className="inline-flex w-full justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-amber-200 dark:text-slate-950"
          >
            Start HSK {summary.level}
          </Link>
        </div>
      </div>
    </Card>
  );
}
