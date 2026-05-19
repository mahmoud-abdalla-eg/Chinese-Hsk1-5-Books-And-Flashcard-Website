const fs = require("node:fs");
const path = require("node:path");

const hasAzure = Boolean(
  process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION,
);
if (!hasAzure) {
  console.warn(
    "AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are missing. No audio files were generated.",
  );
  process.exit(0);
}
console.log(
  "Audio generation scaffold ready. Add Azure Speech REST synthesis here after selecting Mandarin voices and output format.",
);
for (let level = 1; level <= 5; level += 1) {
  for (const folder of ["words", "sentences", "conversations"]) {
    fs.mkdirSync(
      path.join(process.cwd(), "public", "audio", folder, `hsk-${level}`),
      { recursive: true },
    );
  }
}
