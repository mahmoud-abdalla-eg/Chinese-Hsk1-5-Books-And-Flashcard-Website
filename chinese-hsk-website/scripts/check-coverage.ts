const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
function readWords(level) {
  return JSON.parse(
    fs.readFileSync(
      path.join(root, "source-data", "hsk", `hsk-${level}.json`),
      "utf8",
    ),
  );
}
function readConversations(level) {
  const dir = path.join(root, "source-data", "conversations", `hsk-${level}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")));
}
function audioExists(audioPath) {
  if (!audioPath) return false;
  const normalized = audioPath.startsWith("/") ? audioPath.slice(1) : audioPath;
  return fs.existsSync(
    path.join(root, "public", normalized.replace(/^public[/]/, "")),
  );
}
const levels = [];
for (let level = 1; level <= 5; level += 1) {
  const words = readWords(level);
  const conversations = readConversations(level);
  const repetition = Object.fromEntries(words.map((word) => [word.id, 0]));
  const missingTranslations = [];
  const missingConversationAudio = [];
  const duplicateMap = new Map();
  for (const word of words)
    duplicateMap.set(word.hanzi, (duplicateMap.get(word.hanzi) || 0) + 1);
  for (const conversation of conversations) {
    for (const line of conversation.dialogue || []) {
      for (const word of words)
        if (line.hanzi?.includes(word.hanzi)) repetition[word.id] += 1;
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
  const missingAudioFiles = words
    .filter(
      (word) =>
        !audioExists(word.audio?.word) || !audioExists(word.audio?.example),
    )
    .map((word) => ({ id: word.id, hanzi: word.hanzi }));
  levels.push({
    level,
    totalWords: words.length,
    coveredWords: Object.values(repetition).filter((count) => count > 0).length,
    uncoveredWords: words
      .filter((word) => repetition[word.id] === 0)
      .map((word) => ({ id: word.id, hanzi: word.hanzi })),
    repetitionCountPerWord: repetition,
    missingAudioFiles,
    missingTranslations,
    missingConversationAudio,
    duplicateWords: [...duplicateMap.entries()]
      .filter(([, count]) => count > 1)
      .map(([hanzi]) => hanzi),
    flashcardWordCount: words.length,
    wordDetailPageCount: words.length,
  });
}
const report = { generatedAt: new Date().toISOString(), levels };
const file = path.join(root, "coverage-report.json");
fs.writeFileSync(file, JSON.stringify(report, null, 2));
for (const level of report.levels) {
  console.log(
    `HSK ${level.level}: ${level.coveredWords}/${level.totalWords} words covered, ${level.uncoveredWords.length} uncovered, ${level.missingAudioFiles.length} missing audio entries`,
  );
}
console.log(`Coverage report written to ${file}`);
