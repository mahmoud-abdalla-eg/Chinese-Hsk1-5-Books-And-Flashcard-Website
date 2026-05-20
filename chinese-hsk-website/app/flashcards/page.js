import Link from "next/link";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui/card";
import { levelThemes } from "@/lib/data/design";
import { getHskSummary } from "@/lib/data/hsk";

export default function FlashcardsPage() {
  const summaries = getHskSummary();
  return (
    <div className="space-y-10 pb-8">
      <Surface className="grid gap-8 p-7 lg:grid-cols-[1fr_360px] lg:items-center lg:p-10">
        <div>
          <Pill>Spaced repetition</Pill>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
            Flashcards that keep the conversation moving.
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
            Review Chinese on the front, then pinyin, English, Arabic, examples,
            and audio status on the back. The deck uses Again, Hard, Good, and
            Easy review choices.
          </p>
        </div>
        <Card className="bg-slate-950 text-white dark:bg-slate-900/80 dark:text-white">
          <div className="text-6xl font-black">5</div>
          <p className="mt-1 font-bold opacity-75">HSK decks</p>
          <p className="mt-4 text-sm opacity-70">
            Pick a level and review words in quick, focused sessions.
          </p>
        </Card>
      </Surface>
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Pick a deck"
          title="Study by level"
          text="Choose a deck, test yourself, and save difficult words for another round."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {summaries.map((summary) => {
            const theme = levelThemes[summary.level];
            return (
              <Link
                key={summary.level}
                href={`/flashcards/hsk/${summary.level}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/70"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accent}`}
                />
                <span className="text-3xl font-black text-slate-950 dark:text-white">
                  HSK {summary.level}
                </span>
                <span className="mt-3 block text-sm font-bold text-slate-500">
                  {summary.wordCount} cards
                </span>
                <span className="mt-8 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-slate-900/80 dark:text-white">
                  Open deck
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
