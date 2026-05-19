import fs from "node:fs";
import path from "node:path";
import { getConversationsForLevel } from "../data/conversations";
import { getHskWords } from "../data/hsk";
import { EXPECTED_HSK_COUNTS, HSK_LEVELS } from "../data/schema";

const root = process.cwd();

function audioExists(audioPath) {
  if (!audioPath) return false;
  const normalized = audioPath.startsWith("/") ? audioPath.slice(1) : audioPath;
  return fs.existsSync(
    path.join(root, "public", normalized.replace(/^public[/]/, "")),
  );
}

export function validateLevel(level) {
  const words = getHskWords(level);
  const duplicateMap = new Map();
  for (const word of words)
    duplicateMap.set(word.hanzi, (duplicateMap.get(word.hanzi) || 0) + 1);
  const duplicateWords = [...duplicateMap.entries()]
    .filter(([, count]) => count > 1)
    .map(([hanzi]) => hanzi);
  const missingFields = words.flatMap((word) => {
    const missing = [];
    if (!word.pinyin) missing.push("pinyin");
    if (!word.meaning?.en) missing.push("english translation");
    if (!word.meaning?.ar) missing.push("arabic translation");
    if (!word.example?.hanzi) missing.push("example sentence");
    if (!word.example?.pinyin) missing.push("example pinyin");
    if (!word.example?.en) missing.push("example english");
    if (!word.example?.ar) missing.push("example arabic");
    if (!audioExists(word.audio?.word)) missing.push("word audio");
    if (!audioExists(word.audio?.example)) missing.push("example audio");
    return missing.length ? [{ id: word.id, hanzi: word.hanzi, missing }] : [];
  });
  return {
    level: Number(level),
    expectedCount: EXPECTED_HSK_COUNTS[level],
    actualCount: words.length,
    countMatchesExpected: words.length === EXPECTED_HSK_COUNTS[level],
    duplicateWords,
    missingFields,
  };
}

export function validateAllLevels() {
  return HSK_LEVELS.map((level) => validateLevel(level));
}

export function buildCoverageReport() {
  const levels = HSK_LEVELS.map((level) => {
    const words = getHskWords(level);
    const conversations = getConversationsForLevel(level);
    const repetition = Object.fromEntries(words.map((word) => [word.id, 0]));
    const missingTranslations = [];
    const missingConversationAudio = [];
    for (const conversation of conversations) {
      for (const line of conversation.dialogue || []) {
        for (const word of words) {
          if (line.hanzi?.includes(word.hanzi)) repetition[word.id] += 1;
        }
        if (!line.translation?.en || !line.translation?.ar || !line.pinyin)
          missingTranslations.push({
            conversationId: conversation.id,
            lineId: line.id,
          });
        if (!audioExists(line.audio))
          missingConversationAudio.push({
            conversationId: conversation.id,
            lineId: line.id,
          });
      }
    }
    const validation = validateLevel(level);
    return {
      level,
      totalWords: words.length,
      coveredWords: Object.values(repetition).filter((count) => count > 0)
        .length,
      uncoveredWords: words
        .filter((word) => repetition[word.id] === 0)
        .map((word) => ({ id: word.id, hanzi: word.hanzi })),
      repetitionCountPerWord: repetition,
      missingAudioFiles: validation.missingFields.filter((entry) =>
        entry.missing.some((field) => field.includes("audio")),
      ),
      missingTranslations,
      missingConversationAudio,
      duplicateWords: validation.duplicateWords,
      flashcardWordCount: words.length,
      wordDetailPageCount: words.length,
    };
  });
  return { generatedAt: new Date().toISOString(), levels };
}
