const fs = require("node:fs");
const path = require("node:path");

console.log(
  "Conversation authoring scaffold exists in source-data/conversations/hsk-*/unit-*.json.",
);
console.log(
  "Do not auto-fill dialogue without review: each line needs Chinese, pinyin, English, Arabic, and real audio.",
);
for (let level = 1; level <= 5; level += 1) {
  const dir = path.join(
    process.cwd(),
    "source-data",
    "conversations",
    `hsk-${level}`,
  );
  const count = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => file.endsWith(".json")).length
    : 0;
  console.log(`HSK ${level}: ${count} conversation scaffold files`);
}
