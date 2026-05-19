import { Card, Pill, Surface } from "@/components/ui/card";
import {
  buildCoverageReport,
  validateAllLevels,
} from "@/lib/validation/hsk-validation";

export default function DataCheckPage() {
  const validations = validateAllLevels();
  const coverage = buildCoverageReport();
  return (
    <div className="space-y-8 pb-8">
      <Surface className="p-7 lg:p-10">
        <Pill tone="amber">Development only</Pill>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
          Data check
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
          This page shows word counts, missing fields, missing audio,
          conversation coverage, and duplicate words. It is intentionally strict
          so the app never hides incomplete course data.
        </p>
      </Surface>
      <div className="grid gap-5">
        {validations.map((item) => {
          const levelCoverage = coverage.levels.find(
            (level) => level.level === item.level,
          );
          return (
            <Card key={item.level}>
              <div className="grid gap-4 md:grid-cols-5">
                <div>
                  <Pill>HSK {item.level}</Pill>
                  <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                    {item.actualCount}/{item.expectedCount}
                  </p>
                  <p className="text-sm font-bold text-slate-500">words</p>
                </div>
                <Metric label="duplicates" value={item.duplicateWords.length} />
                <Metric
                  label="missing rows"
                  value={item.missingFields.length}
                />
                <Metric label="covered" value={levelCoverage.coveredWords} />
                <Metric
                  label="uncovered"
                  value={levelCoverage.uncoveredWords.length}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl bg-slate-950/[0.04] p-4 dark:bg-white/[0.06]">
      <strong className="text-3xl font-black text-slate-950 dark:text-white">
        {value}
      </strong>
      <p className="text-sm font-bold text-slate-500">{label}</p>
    </div>
  );
}
