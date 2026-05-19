export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const hasAzure = Boolean(
    process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION,
  );
  if (!hasAzure) {
    return Response.json(
      {
        ok: false,
        missingCredentials: true,
        message:
          "Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION before generating Mandarin audio.",
        requested: body,
      },
      { status: 400 },
    );
  }
  return Response.json(
    {
      ok: false,
      message:
        "Audio generation endpoint is scaffolded. Use scripts/generate-audio.ts to batch-generate files after choosing a provider voice.",
    },
    { status: 501 },
  );
}
