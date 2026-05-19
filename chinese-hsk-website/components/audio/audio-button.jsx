"use client";

export default function AudioButton({ src, label = "Play audio" }) {
  const play = () => {
    if (!src) return;
    new Audio(src).play();
  };
  return (
    <button
      type="button"
      onClick={play}
      disabled={!src}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      title={src ? label : "Audio missing"}
    >
      {src ? "Listen" : "Audio pending"}
    </button>
  );
}
