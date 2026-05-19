import fs from "node:fs";
import path from "node:path";
import { HSK_LEVELS } from "./schema";

const root = process.cwd();

function readConversationFile(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getConversationsForLevel(level) {
  const numericLevel = Number(level);
  if (!HSK_LEVELS.includes(numericLevel)) return [];
  const dir = path.join(
    root,
    "source-data",
    "conversations",
    `hsk-${numericLevel}`,
  );
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => readConversationFile(path.join(dir, file)));
}

export function getConversationForUnit(level, unitId) {
  return getConversationsForLevel(level).find(
    (conversation) => Number(conversation.unitId) === Number(unitId),
  );
}

export function getAllConversations() {
  return HSK_LEVELS.flatMap((level) => getConversationsForLevel(level));
}
