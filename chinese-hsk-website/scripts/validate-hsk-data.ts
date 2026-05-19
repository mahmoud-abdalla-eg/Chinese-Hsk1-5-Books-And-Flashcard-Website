const fs = require("node:fs");
const path = require("node:path");

const expected = { 1: 300, 2: 197, 3: 491, 4: 990, 5: 1579 };
const root = process.cwd();
function readWords(level) {
  return JSON.parse(
    fs.readFileSync(
      path.join(root, "source-data", "hsk", `hsk-${level}.json`),
      "utf8",
    ),
  );
}
function audioExists(audioPath) {
  if (!audioPath) return false;
  const normalized = audioPath.startsWith("/") ? audioPath.slice(1) : audioPath;
  return fs.existsSync(
    path.join(root, "public", normalized.replace(/^public[/]/, "")),
  );
}
function validateLevel(level) {
  const words = readWords(level);
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
    level,
    expectedCount: expected[level],
    actualCount: words.length,
    duplicateWords,
    missingFields,
  };
}
let hasWarnings = false;
for (let level = 1; level <= 5; level += 1) {
  const result = validateLevel(level);
  const warnings = [];
  if (result.actualCount !== result.expectedCount)
    warnings.push(
      `expected ${result.expectedCount}, found ${result.actualCount}`,
    );
  if (result.duplicateWords.length)
    warnings.push(`duplicates: ${result.duplicateWords.join(", ")}`);
  if (result.missingFields.length)
    warnings.push(
      `${result.missingFields.length} words missing required fields/audio`,
    );
  if (warnings.length) {
    hasWarnings = true;
    console.warn(`HSK ${result.level} warnings: ${warnings.join("; ")}`);
  } else {
    console.log(`HSK ${result.level} OK: ${result.actualCount} words`);
  }
}
if (hasWarnings)
  console.warn(
    "Validation completed with warnings. Build data is usable, but course content is incomplete.",
  );
