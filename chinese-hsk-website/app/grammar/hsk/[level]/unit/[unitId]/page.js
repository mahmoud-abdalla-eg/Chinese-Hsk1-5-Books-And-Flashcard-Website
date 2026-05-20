import Link from "next/link";
import GrammarCard from "@/components/grammar/grammar-card";
import { Card, Pill, Surface } from "@/components/ui/card";
import { getGrammarUnit, getGrammarUnitsForLevel } from "@/lib/data/grammar";

export default async function GrammarUnitPage({ params }) {
  const { level, unitId } = await params;
  const unit = getGrammarUnit(level, unitId);
  if (!unit) return <Card>Grammar unit not found.</Card>;
  const units = getGrammarUnitsForLevel(level);
  const hasNext = Number(unitId) < units.length;
  return (
    <div className="space-y-8 pb-8">
      <Surface className="relative overflow-hidden p-7 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-300 via-teal-300 to-sky-300" />
        <Pill>
          HSK {level} - Grammar unit {unit.id}
        </Pill>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-7xl">
          Patterns {unit.start}-{unit.end}
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
          Read the pattern, say the example out loud, then make your own
          sentence before moving to the next card.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/grammar/hsk/${level}`}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800"
          >
            Back to level
          </Link>
          {Number(unitId) > 1
            ? <Link
                href={`/grammar/hsk/${level}/unit/${Number(unitId) - 1}`}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-black text-white"
              >
                Previous unit
              </Link>
            : null}
          {hasNext
            ? <Link
                href={`/grammar/hsk/${level}/unit/${Number(unitId) + 1}`}
                className="rounded-full bg-amber-200 px-5 py-3 text-sm font-black text-slate-950"
              >
                Next unit
              </Link>
            : null}
        </div>
      </Surface>

      <div className="grid gap-4 lg:grid-cols-2">
        {unit.items.map((item, index) => (
          <GrammarCard key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
