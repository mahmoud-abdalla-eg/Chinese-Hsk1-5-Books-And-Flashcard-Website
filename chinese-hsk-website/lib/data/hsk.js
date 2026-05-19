import fs from "node:fs";
import path from "node:path";
import { EXPECTED_HSK_COUNTS, HSK_LEVELS, UNIT_SIZE } from "./schema";

const root = process.cwd();

function readJson(relativePath) {
  const file = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getHskWords(level) {
  const numericLevel = Number(level);
  if (!HSK_LEVELS.includes(numericLevel)) return [];
  return readJson(`source-data/hsk/hsk-${numericLevel}.json`);
}

export function getAllHskWords() {
  return HSK_LEVELS.flatMap((level) => getHskWords(level));
}

export function getHskSummary() {
  return HSK_LEVELS.map((level) => {
    const words = getHskWords(level);
    return {
      level,
      wordCount: words.length,
      expectedCount: EXPECTED_HSK_COUNTS[level],
      unitCount: Math.ceil(words.length / UNIT_SIZE),
      conversationCount: Math.ceil(words.length / UNIT_SIZE),
      progress: 0,
    };
  });
}

export function getUnitsForLevel(level) {
  const words = getHskWords(level);
  const units = [];
  for (let i = 0; i < words.length; i += UNIT_SIZE) {
    const unitWords = words.slice(i, i + UNIT_SIZE);
    units.push({
      id: units.length + 1,
      level: Number(level),
      start: i + 1,
      end: i + unitWords.length,
      words: unitWords,
      wordCount: unitWords.length,
    });
  }
  return units;
}

export function getUnit(level, unitId) {
  return getUnitsForLevel(level).find((unit) => unit.id === Number(unitId));
}

export function getWord(level, wordId) {
  return getHskWords(level).find((word) => word.id === wordId);
}
