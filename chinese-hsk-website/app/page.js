import Link from "next/link";
import LevelCard from "@/components/hsk/level-card";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui/card";
import { courseHighlights, dailyTopics, studyModes } from "@/lib/data/design";
import { getHskSummary } from "@/lib/data/hsk";

export default function HomePage() {
  const summaries = getHskSummary();
  const totalWords = summaries.reduce((sum, item) => sum + item.wordCount, 0);
  const totalUnits = summaries.reduce((sum, item) => sum + item.unitCount, 0);
  return (
    <div className="space-y-20 pb-8">
      <section className="grid gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-rise-in space-y-7">
          <Pill>Conversation-first HSK 3.0</Pill>
          <h1 className="text-balance max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
            Learn Chinese inside conversations that feel alive.
          </h1>
          <p className="max-w-2xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
            A multilingual HSK 1-5 learning studio for vocabulary, long
            dialogue, flashcards, listening, shadowing, pronunciation recording,
            and local-first progress.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/hsk/1"
              className="rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-2xl shadow-slate-900/20 transition hover:-translate-y-1 dark:bg-amber-200 dark:text-slate-950"
            >
              Start HSK 1
            </Link>
            <Link
              href="/admin/data-check"
              className="rounded-full border border-slate-950/10 bg-white/70 px-6 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              View data integrity
            </Link>
          </div>
          <div className="grid max-w-2xl grid-cols-3 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 text-center shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
            <div className="p-4">
              <strong className="block text-3xl font-black text-slate-950 dark:text-white">
                {totalWords}
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                words
              </span>
            </div>
            <div className="border-x border-slate-950/10 p-4 dark:border-white/10">
              <strong className="block text-3xl font-black text-slate-950 dark:text-white">
                {totalUnits}
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                units
              </span>
            </div>
            <div className="p-4">
              <strong className="block text-3xl font-black text-slate-950 dark:text-white">
                3
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                UI languages
              </span>
            </div>
          </div>
        </div>
        <Surface className="relative overflow-hidden p-5 lg:p-7">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-teal-300/35 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-amber-300/40 blur-3xl" />
          <div className="relative rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-900/30">
            <div className="flex items-center justify-between gap-4">
              <Pill tone="green">Live lesson preview</Pill>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                Shadowing
              </span>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="max-w-[85%] rounded-[1.5rem] bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-200">
                  Teacher
                </p>
                <p className="hanzi-display mt-2 text-4xl font-black">
                  你今天想学什么？
                </p>
                <p className="mt-2 text-amber-200">
                  Ni jintian xiang xue shenme?
                </p>
                <p className="mt-2 text-sm text-white/70">
                  What do you want to study today?
                </p>
              </div>
              <div className="ml-auto max-w-[85%] rounded-[1.5rem] bg-amber-200 p-4 text-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-900">
                  Student
                </p>
                <p className="hanzi-display mt-2 text-4xl font-black">
                  我想练习会话。
                </p>
                <p className="mt-2 text-slate-700">Wo xiang lianxi huihua.</p>
                <p className="mt-2 text-sm text-slate-700">
                  I want to practice conversation.
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-white/60">
                <span>Pronunciation score</span>
                <span>Estimated</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-3 w-[76%] rounded-full bg-gradient-to-r from-teal-300 to-amber-200" />
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Choose your level"
          title="Five HSK levels, one consistent learning rhythm."
          text="Each level is separated, counted from local JSON, divided into study units, and ready for authored conversations and audio generation."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {summaries.map((summary) => (
            <LevelCard key={summary.level} summary={summary} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {courseHighlights.map((item) => (
          <Card key={item.title} className="relative overflow-hidden">
            <Pill tone="green">{item.label}</Pill>
            <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
              {item.text}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeading
          eyebrow="Study modes"
          title="A complete practice loop, not a vocabulary dump."
          text="The interface is ready for conversation, shadowing, flashcards, listening, translation, and typing practice. The data checker keeps missing lesson content visible until reviewed."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {studyModes.map((mode, index) => (
            <Card key={mode} className="flex items-center gap-4 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-amber-200 dark:bg-amber-200 dark:text-slate-950">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-black text-slate-950 dark:text-white">
                {mode}
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-[#20180f] p-6 text-amber-50 shadow-2xl shadow-slate-900/20 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Pill tone="rose">Daily-life coverage</Pill>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Conversations are organized around situations learners actually
              meet.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {dailyTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-amber-100/15 bg-white/8 px-4 py-2 text-sm font-bold text-amber-50/80"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
