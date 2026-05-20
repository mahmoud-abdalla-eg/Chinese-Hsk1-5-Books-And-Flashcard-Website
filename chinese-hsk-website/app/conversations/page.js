import Link from "next/link";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui/card";
import { levelThemes } from "@/lib/data/design";
import { getHskSummary } from "@/lib/data/hsk";

export default function ConversationsPage() {
  const summaries = getHskSummary();
  return (
    <div className="space-y-10 pb-8">
      <Surface className="grid gap-8 p-7 lg:grid-cols-[1fr_360px] lg:items-center lg:p-10">
        <div>
          <Pill>Dialogue learning</Pill>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
            Conversation lessons by HSK level.
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
            Use short dialogue lessons to connect vocabulary with real
            situations, then practice listening, shadowing, and comprehension.
          </p>
        </div>
        <Card className="bg-[#20180f] text-amber-50 dark:bg-slate-900/80 dark:text-white">
          <div className="text-6xl font-black">72</div>
          <p className="mt-1 font-bold opacity-75">unit lessons</p>
          <p className="mt-4 text-sm opacity-70">
            Follow the units in order or jump to the level you are studying now.
          </p>
        </Card>
      </Surface>
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Conversation library"
          title="Practice useful dialogue one unit at a time."
          text="Each level is organized into small lessons so new words are easier to hear, repeat, and remember."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {summaries.map((summary) => {
            const theme = levelThemes[summary.level];
            return (
              <Link
                key={summary.level}
                href={`/conversations/hsk/${summary.level}`}
                className="group relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl transition hover:-translate-y-1 dark:bg-slate-900/80 dark:text-white"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accent}`}
                />
                <span className="text-3xl font-black">HSK {summary.level}</span>
                <span className="mt-3 block text-sm font-bold opacity-70">
                  {summary.conversationCount} unit lessons
                </span>
                <span className="mt-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 dark:bg-slate-950 dark:text-white">
                  Open library
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
