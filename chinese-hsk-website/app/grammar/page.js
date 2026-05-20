import Link from "next/link";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui/card";
import { getGrammarLevels, getGrammarPath } from "@/lib/data/grammar";

const levelLabels = {
  1: "Sentence basics",
  2: "Daily patterns",
  3: "Longer ideas",
  4: "Connected speech",
  5: "Advanced flow",
  6: "Polished expression",
};

export default function GrammarPage() {
  const grammarItems = getGrammarPath();
  const levels = getGrammarLevels();
  return (
    <div className="space-y-10 pb-8">
      <Surface className="grid gap-8 p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:p-10">
        <div>
          <Pill>Grammar path</Pill>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-7xl">
            Learn grammar in small, clear steps.
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
            Choose an HSK level, open a unit, and practice sentence patterns
            with examples, pinyin, and short English explanations.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-slate-900 text-white">
            <strong className="block text-5xl font-black">
              {grammarItems.length}
            </strong>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-white/60">
              cards
            </span>
          </Card>
          <Card className="bg-amber-200 text-amber-950">
            <strong className="block text-5xl font-black">
              {levels.length}
            </strong>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-900/70">
              levels
            </span>
          </Card>
          <Card className="bg-teal-200 text-teal-950">
            <strong className="block text-5xl font-black">10</strong>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-teal-900/70">
              min
            </span>
          </Card>
        </div>
      </Surface>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Choose a level"
          title="Grammar levels"
          text="Each level is split into short units so the page stays easy to scan and practice."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {levels.map(({ level, entries }) => (
            <Link
              key={level}
              href={`/grammar/hsk/${level}`}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_20px_70px_rgba(43,35,22,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)]"
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-300 via-teal-300 to-sky-300" />
              <Pill>HSK {level}</Pill>
              <h2 className="mt-5 text-3xl font-black text-slate-950">
                {levelLabels[level] || `Level ${level}`}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {entries.length} grammar points arranged into focused units.
              </p>
              <span className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-black text-white">
                Open level
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
