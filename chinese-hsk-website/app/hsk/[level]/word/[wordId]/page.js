import { Card, Pill, Surface } from "@/components/ui/card";
import WordStudyPanel from "@/components/vocabulary/word-study-panel";
import { getWord } from "@/lib/data/hsk";

export default async function WordPage({ params }) {
  const { level, wordId } = await params;
  const word = getWord(level, wordId);
  if (!word) return <Card>Word not found.</Card>;
  const examples = word.examples?.length ? word.examples : [word.example];
  return (
    <div className="grid gap-8 pb-8 lg:grid-cols-[0.88fr_1.12fr]">
      <Surface className="relative overflow-hidden text-center lg:sticky lg:top-28 lg:self-start">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="relative">
          <Pill>
            HSK {level} - word {word.order}
          </Pill>
          <h1 className="hanzi-display mt-8 text-8xl font-black leading-none text-slate-950 dark:text-white sm:text-9xl">
            {word.hanzi}
          </h1>
          <p className="mt-5 text-3xl font-black text-amber-700 dark:text-amber-300">
            {word.pinyin}
          </p>
          <p className="mt-4 text-xl font-bold text-slate-700 dark:text-slate-200">
            {word.meaning.en}
          </p>
          <p
            className="mt-2 text-xl font-bold text-slate-500 dark:text-slate-400"
            dir="rtl"
          >
            {word.meaning.ar || "Arabic coming soon"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {word.tags.length
              ? word.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-950/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600 dark:bg-white/[0.08] dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))
              : <span className="rounded-full bg-slate-950/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
                  core word
                </span>}
          </div>
        </div>
      </Surface>
      <div className="space-y-6">
        <Card>
          <Pill tone="slate">{word.partOfSpeech}</Pill>
          <h2 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
            Example sentences
          </h2>
          <div className="mt-4 space-y-4">
            {examples.map((example, index) => (
              <div
                key={`${example.hanzi || "example"}-${index}`}
                className="rounded-[1.5rem] border border-slate-950/10 bg-slate-950/[0.04] p-4 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Example {index + 1}
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                  {example.hanzi || "Practice sentence coming soon"}
                </p>
                <p className="mt-2 text-amber-700 dark:text-amber-300">
                  {example.pinyin || "Pinyin coming soon"}
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {example.en || "English coming soon"}
                </p>
                <p
                  className="mt-2 text-slate-500 dark:text-slate-400"
                  dir="rtl"
                >
                  {example.ar || "Arabic coming soon"}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            Listen, record, and save
          </h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            Listen when audio is available, then record yourself and compare
            your pronunciation. Save words as learned or add them to favorites
            for quick review.
          </p>
          <div className="mt-5">
            <WordStudyPanel word={word} />
          </div>
        </Card>
      </div>
    </div>
  );
}
