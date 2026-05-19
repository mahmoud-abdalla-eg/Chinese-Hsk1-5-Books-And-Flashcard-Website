function estimate(expectedText = "", recognizedText = "") {
  const expected = [...expectedText.replace(/\s/g, "")];
  const recognized = new Set([...recognizedText.replace(/\s/g, "")]);
  const hits = expected.filter((char) => recognized.has(char)).length;
  return expected.length ? Math.round((hits / expected.length) * 100) : 0;
}

export async function POST(request) {
  const body = await request.json();
  const hasAzure = Boolean(
    process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION,
  );
  if (!hasAzure) {
    return Response.json({
      provider: "browser-fallback",
      estimated: true,
      overallAccuracy: estimate(body.expectedText, body.recognizedText),
      recognizedText: body.recognizedText || "",
      expectedText: body.expectedText || "",
      missingWords: [],
      incorrectWords: [],
      feedback:
        "Azure Speech credentials are not configured. Browser transcription scoring is approximate.",
    });
  }
  return Response.json({
    provider: "azure-speech",
    configured: true,
    feedback:
      "Azure Speech credentials are present. Wire SDK or REST upload handling here for production pronunciation assessment.",
  });
}
