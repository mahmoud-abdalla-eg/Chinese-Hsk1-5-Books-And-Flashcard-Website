import AudioButton from "@/components/audio/audio-button";
import { Card, Pill } from "@/components/ui/card";

export default function ConversationLesson({ conversation, words = [] }) {
  const targetWords = words.filter((word) =>
    conversation.targetVocabularyIds?.includes(word.id),
  );
  return (
    <Card className="space-y-6 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Pill
            tone={conversation.status === "needs-authoring" ? "amber" : "green"}
          >
            {conversation.status || "ready"}
          </Pill>
          <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
            {conversation.title?.en}
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
            {conversation.title?.zh} -{" "}
            <span dir="rtl">{conversation.title?.ar}</span>
          </p>
        </div>
        <div className="rounded-3xl bg-slate-950 p-4 text-center text-white dark:bg-white dark:text-slate-950">
          <strong className="block text-3xl font-black">
            {targetWords.length}
          </strong>
          <span className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
            target words
          </span>
        </div>
      </div>
      {conversation.dialogue?.length ? (
        <div className="space-y-3">
          {conversation.dialogue.map((line) => (
            <div
              key={line.id}
              className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between gap-3">
                <strong>{line.role}</strong>
                <AudioButton src={line.audio} />
              </div>
              <p className="hanzi-display mt-2 text-2xl font-black text-slate-950 dark:text-white">
                {line.hanzi}
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                {line.pinyin}
              </p>
              <p>{line.translation?.en}</p>
              <p dir="rtl">{line.translation?.ar}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 rounded-[2rem] border border-dashed border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100 md:grid-cols-[1fr_260px]">
          <div>
            <strong className="text-lg">Conversation text pending.</strong>
            <p className="mt-2 text-sm font-semibold leading-7">
              This is a reviewed-authoring scaffold, not fake lesson content.
              Add natural Chinese lines, pinyin, English, Arabic, grammar notes,
              cultural notes, questions, and real audio paths before marking it
              complete.
            </p>
          </div>
          <div className="rounded-3xl bg-white/65 p-4 text-sm font-bold text-amber-900 dark:bg-white/10 dark:text-amber-100">
            Coverage currently reports these words as uncovered until dialogue
            lines are authored.
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-black text-slate-950 dark:text-white">
          Target vocabulary
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {targetWords.slice(0, 100).map((word) => (
            <span
              key={word.id}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {word.hanzi} - {word.pinyin}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
