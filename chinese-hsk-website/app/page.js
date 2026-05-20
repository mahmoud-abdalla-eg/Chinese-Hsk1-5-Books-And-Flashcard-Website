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
          <h1 className="text-balance max-w-5xl text-5xl font-black leading-[0.95] text-slate-950 sm:text-7xl lg:text-8xl">
            Learn Chinese inside conversations that feel alive.
          </h1>
          <p className="max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            A multilingual HSK 1-5 learning studio for vocabulary, long
            dialogue, flashcards, listening, shadowing, pronunciation recording,
            and local-first progress.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/hsk/1"
              className="rounded-full bg-teal-700 px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-800"
            >
              Start HSK 1
            </Link>
            <Link
              href="/flashcards"
              className="rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
            >
              Review flashcards
            </Link>
            <Link
              href="/grammar"
              className="rounded-full border border-blue-200 bg-blue-50 px-6 py-4 text-sm font-black text-blue-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300"
            >
              Grammar path
            </Link>
          </div>
          <div className="grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm">
            <div className="p-4">
              <strong className="block text-3xl font-black text-slate-950">
                {totalWords}
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                words
              </span>
            </div>
            <div className="border-x border-slate-200 p-4">
              <strong className="block text-3xl font-black text-slate-950">
                {totalUnits}
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                units
              </span>
            </div>
            <div className="p-4">
              <strong className="block text-3xl font-black text-slate-950">
                3
              </strong>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                UI languages
              </span>
            </div>
          </div>
        </div>
        <Surface className="p-5 lg:p-7">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-950">
            <div className="flex items-center justify-between gap-4">
              <Pill tone="green">Live lesson preview</Pill>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                Shadowing
              </span>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="max-w-[85%] rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                  Teacher
                </p>
                <p className="hanzi-display mt-2 text-4xl font-black">
                  {"\u4f60\u4eca\u5929\u60f3\u5b66\u4ec0\u4e48\uff1f"}
                </p>
                <p className="mt-2 text-teal-700">
                  Ni jintian xiang xue shenme?
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  What do you want to study today?
                </p>
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl border border-blue-200 bg-blue-50 p-4 text-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-800">
                  Student
                </p>
                <p className="hanzi-display mt-2 text-4xl font-black">
                  {"\u6211\u60f3\u7ec3\u4e60\u4f1a\u8bdd\u3002"}
                </p>
                <p className="mt-2 text-slate-700">Wo xiang lianxi huihua.</p>
                <p className="mt-2 text-sm text-slate-700">
                  I want to practice conversation.
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                <span>Pronunciation score</span>
                <span>Estimated</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200">
                <div className="h-3 w-[76%] rounded-full bg-teal-600" />
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Choose your level"
          title="Five HSK levels, one consistent learning rhythm."
          text="Each level is split into focused units so you can study words, examples, flashcards, grammar, and conversation practice at a comfortable pace."
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
            <h3 className="mt-5 text-2xl font-black text-slate-950">
              {item.title}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {item.text}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeading
          eyebrow="Study modes"
          title="A complete practice loop, not a vocabulary dump."
          text="Move between conversations, flashcards, grammar, listening, translation, and pronunciation practice without losing your place."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {studyModes.map((mode, index) => (
            <Card key={mode} className="flex items-center gap-4 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-700 text-sm font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-black text-slate-950">
                {mode}
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Pill tone="green">Daily-life coverage</Pill>
            <h2 className="mt-5 text-4xl font-black text-slate-950 sm:text-5xl">
              Conversations are organized around situations learners actually
              meet.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {dailyTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700"
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
