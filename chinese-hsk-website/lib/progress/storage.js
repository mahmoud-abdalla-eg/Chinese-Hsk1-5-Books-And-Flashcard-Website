export const progressKey = "mandarin-flow-progress-v1";

export function defaultProgress() {
  return {
    learnedWords: [],
    favorites: [],
    reviewHistory: [],
    pronunciationScores: {},
    completedConversations: [],
    completedUnits: [],
    lastStudiedDate: null,
  };
}

export function scoreReview(quality) {
  const days = { Again: 0, Hard: 1, Good: 3, Easy: 7 }[quality] ?? 1;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
}
