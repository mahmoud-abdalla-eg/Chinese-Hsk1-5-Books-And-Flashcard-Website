import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const GRAMMAR_UNIT_SIZE = 12;

function readGrammarPath() {
  const file = path.join(root, "source-data", "grammar", "learning-path.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getGrammarPath() {
  return readGrammarPath();
}

export function getGrammarLevels() {
  const items = getGrammarPath();
  const grouped = new Map();
  for (const item of items) {
    const current = grouped.get(item.hskLevel) || [];
    current.push(item);
    grouped.set(item.hskLevel, current);
  }
  return [...grouped.entries()]
    .sort(([a], [b]) => a - b)
    .map(([level, entries]) => ({ level, entries }));
}

export function getGrammarItemsForLevel(level) {
  const numericLevel = Number(level);
  return getGrammarPath().filter((item) => item.hskLevel === numericLevel);
}

export function getGrammarUnitsForLevel(level) {
  const items = getGrammarItemsForLevel(level);
  const units = [];
  for (let index = 0; index < items.length; index += GRAMMAR_UNIT_SIZE) {
    const unitItems = items.slice(index, index + GRAMMAR_UNIT_SIZE);
    units.push({
      id: units.length + 1,
      level: Number(level),
      start: index + 1,
      end: index + unitItems.length,
      itemCount: unitItems.length,
      items: unitItems,
    });
  }
  return units;
}

export function getGrammarUnit(level, unitId) {
  return getGrammarUnitsForLevel(level).find(
    (unit) => unit.id === Number(unitId),
  );
}
