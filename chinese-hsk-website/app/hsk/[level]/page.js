import Link from "next/link";
import UnitCard from "@/components/hsk/unit-card";
import {
  Card,
  Pill,
  ProgressBar,
  SectionHeading,
  Surface,
} from "@/components/ui/card";
import { levelThemes, studyModes } from "@/lib/data/design";
import { getHskWords, getUnitsForLevel } from "@/lib/data/hsk";

export default async function HskLevelPage({ params }) {
  const { level } = await params;
  const numericLevel = Number(level);
  const words = getHskWords(level);
  const units = getUnitsForLevel(level);
  const theme = levelThemes[numericLevel];
  const firstWords = words.slice(0, 9);
  return (
    <div className="space-y-10 pb-8">
      <Surface className="relative overflow-hidden p-7 lg:p-10">
        <div
          className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accent}`}
        />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <Pill>HSK {level}</Pill>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
              {theme.scene}
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
              {theme.tone} This level is divided into focused units with
              vocabulary pages, flashcards, conversation practice, listening,
              grammar, and local progress tracking.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/hsk/${level}/unit/1`}
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-xl dark:bg-amber-200 dark:text-slate-950"
              >
                Start unit 1
              </Link>
              <Link
                href={`/flashcards/hsk/${level}`}
                className="rounded-full border border-slate-950/10 bg-white/70 px-6 py-3 text-sm font-black text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Review flashcards
              </Link>
            </div>
          </div>
          <Card className="bg-slate-950 text-white dark:bg-slate-900/80 dark:text-white">
            <div className="text-6xl font-black">{words.length}</div>
            <p className="mt-1 font-bold opacity-75">words to learn</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-3 dark:bg-slate-950/10">
                <strong className="block text-2xl">{units.length}</strong>
                units
              </div>
              <div className="rounded-2xl bg-white/10 p-3 dark:bg-slate-950/10">
                <strong className="block text-2xl">
                  {Math.min(3, units.length)}
                </strong>
                ways to practice
              </div>
            </div>
            <div className="mt-5">
              <ProgressBar value={0} />
            </div>
          </Card>
        </div>
      </Surface>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <Card>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Level map
            </h2>
            <div className="mt-4 grid gap-2">
              {units.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/hsk/${level}/unit/${unit.id}`}
                  className="flex items-center justify-between rounded-2xl bg-slate-950/[0.04] px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-950 hover:text-white dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-amber-200 dark:hover:text-slate-950"
                >
                  <span>Unit {unit.id}</span>
                  <span>
                    {unit.start}-{unit.end}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Practice modes
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {studyModes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  {mode}
                </span>
              ))}
            </div>
          </Card>
        </aside>
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Study units"
            title={`HSK ${level} units`}
            text="Each unit keeps the vocabulary load manageable while linking into flashcards, conversations, listening, and pronunciation practice."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Pill tone="green">Vocabulary preview</Pill>
                <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                  First words in this level
                </h2>
              </div>
              <Link
                href={`/flashcards/hsk/${level}`}
                className="text-sm font-black text-amber-700 dark:text-amber-300"
              >
                Practice these words
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {firstWords.map((word) => (
                <Link
                  key={word.id}
                  href={`/hsk/${level}/word/${word.id}`}
                  className="rounded-2xl bg-slate-950/[0.04] p-4 transition hover:bg-slate-950 hover:text-white dark:bg-white/[0.06] dark:hover:bg-amber-200 dark:hover:text-slate-950"
                >
                  <span className="hanzi-display block text-3xl font-black">
                    {word.hanzi}
                  </span>
                  <span className="text-sm font-bold opacity-70">
                    {word.pinyin}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
