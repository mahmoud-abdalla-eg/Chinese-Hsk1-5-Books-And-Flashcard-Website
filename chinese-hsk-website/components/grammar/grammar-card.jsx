import { Card, Pill } from "@/components/ui/card";

export default function GrammarCard({ item, index }) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Pill tone="slate">{item.lessonCode}</Pill>
        <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h2 className="text-2xl font-black text-slate-950 dark:text-white">
        {item.pattern || "Practice pattern"}
      </h2>
      <div className="rounded-[1.5rem] border border-slate-950/10 bg-slate-950/[0.04] p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="hanzi-display text-3xl font-black text-slate-950 dark:text-white">
          {item.example.hanzi || "Practice example coming soon"}
        </p>
        <p className="mt-2 font-bold text-amber-700 dark:text-amber-300">
          {item.example.pinyin || "Pinyin coming soon"}
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
          {item.example.en || "Explanation coming soon"}
        </p>
      </div>
    </Card>
  );
}
