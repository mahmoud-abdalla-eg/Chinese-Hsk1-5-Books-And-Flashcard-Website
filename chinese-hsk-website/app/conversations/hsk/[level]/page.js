import ConversationLesson from "@/components/conversations/conversation-lesson";
import { Pill, Surface } from "@/components/ui/card";
import { getConversationsForLevel } from "@/lib/data/conversations";
import { levelThemes } from "@/lib/data/design";
import { getHskWords } from "@/lib/data/hsk";

export default async function LevelConversationsPage({ params }) {
  const { level } = await params;
  const conversations = getConversationsForLevel(level);
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
          HSK {level} conversations
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
          Practice {conversations.length} unit lessons with target vocabulary,
          simple dialogue, and listening support as content becomes available.
        </p>
      </Surface>
      <div className="grid gap-6">
        {conversations.map((conversation) => (
          <ConversationLesson
            key={conversation.id}
            conversation={conversation}
            words={words}
          />
        ))}
      </div>
    </div>
  );
}
