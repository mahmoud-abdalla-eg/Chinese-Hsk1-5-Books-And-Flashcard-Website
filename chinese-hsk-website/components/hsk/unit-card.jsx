import Link from "next/link";
import { Card, Pill, ProgressBar } from "@/components/ui/card";
import { levelThemes } from "@/lib/data/design";

export default function UnitCard({ unit }) {
  const theme = levelThemes[unit.level];
  return (
    <Card className="group relative overflow-hidden transition duration-300 hover:-translate-y-1">
      <div
        className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${theme.accent}`}
      />
      <div className="space-y-5 pl-2">
        <div className="flex items-center justify-between gap-3">
          <Pill tone="blue">Unit {unit.id}</Pill>
          <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            {unit.wordCount} words
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            Words {unit.start}-{unit.end}
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
            Vocabulary list, flashcards, conversation scaffold, listening,
            shadowing, and progress tracking in one focused study room.
          </p>
        </div>
        <ProgressBar value={0} />
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/hsk/${unit.level}/unit/${unit.id}`}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950"
          >
            Open unit
          </Link>
          <Link
            href={`/flashcards/hsk/${unit.level}?unit=${unit.id}`}
            className="rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-sm font-black text-slate-800 dark:border-slate-700 dark:bg-white/5 dark:text-slate-100"
          >
            Flashcards
          </Link>
        </div>
      </div>
    </Card>
  );
}
