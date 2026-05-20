import Link from "next/link";
import AudioButton from "@/components/audio/audio-button";

export default function VocabularyList({ words, level }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-950/10 bg-white/82 shadow-[0_24px_80px_rgba(43,35,22,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/72">
      <div className="grid grid-cols-[64px_1fr] gap-3 border-b border-slate-200/80 bg-slate-50/90 px-4 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400 sm:grid-cols-[72px_1fr_1fr_140px]">
        <span>#</span>
        <span>Chinese</span>
        <span className="hidden sm:block">Meaning</span>
        <span className="hidden sm:block">Audio</span>
      </div>
      {words.map((word) => (
        <div
          key={word.id}
          className="grid grid-cols-[64px_1fr] items-center gap-3 border-b border-slate-100/80 px-4 py-4 last:border-b-0 dark:border-white/10 sm:grid-cols-[72px_1fr_1fr_140px]"
        >
          <span className="text-sm font-black text-slate-400">
            {word.order}
          </span>
          <Link
            href={`/hsk/${level}/word/${word.id}`}
            className="group rounded-2xl transition"
          >
            <span className="hanzi-display block text-3xl font-black text-slate-950 group-hover:text-amber-700 dark:text-white">
              {word.hanzi}
            </span>
            <span className="block text-sm font-bold text-amber-700 dark:text-amber-300">
              {word.pinyin}
            </span>
          </Link>
          <span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
            {word.meaning.en || "English coming soon"}
            <br />
            <span className="text-slate-400" dir="rtl">
              {word.meaning.ar || "Arabic coming soon"}
            </span>
          </span>
          <AudioButton src={word.audio.word} />
        </div>
      ))}
    </div>
  );
}
