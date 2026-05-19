import FlashcardDeck from "@/components/flashcards/flashcard-deck";
import { Card, Pill, Surface } from "@/components/ui/card";
import { levelThemes } from "@/lib/data/design";
import { getHskWords } from "@/lib/data/hsk";

export default async function LevelFlashcardsPage({ params }) {
  const { level } = await params;
  const words = getHskWords(level);
  const theme = levelThemes[Number(level)];
  return (
    <div className="space-y-8 pb-8">
      <Surface className="relative overflow-hidden p-7 lg:p-10">
        <div
          className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${theme.accent}`}
        />
        <Pill>HSK {level}</Pill>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl">
          HSK {level} flashcards
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
          {words.length} local-source cards with Mandarin, pinyin, English,
          Arabic status, audio status, and spaced repetition controls.
        </p>
      </Surface>
      <Card className="p-4 sm:p-6">
        <FlashcardDeck words={words} />
      </Card>
    </div>
  );
}
