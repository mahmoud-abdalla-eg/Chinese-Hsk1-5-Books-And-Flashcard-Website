export function Card({ className = "", children }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export function Surface({ className = "", children }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children, tone = "amber" }) {
  const tones = {
    amber:
      "bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-300/20",
    blue: "bg-sky-100 text-sky-950 ring-sky-200 dark:bg-sky-300/15 dark:text-sky-200 dark:ring-sky-300/20",
    green:
      "bg-emerald-100 text-emerald-950 ring-emerald-200 dark:bg-emerald-300/15 dark:text-emerald-200 dark:ring-emerald-300/20",
    rose: "bg-rose-100 text-rose-950 ring-rose-200 dark:bg-rose-300/15 dark:text-rose-200 dark:ring-rose-300/20",
    slate:
      "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ring-1 ${tones[tone] || tones.slate}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value = 0 }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-200">
      <div
        className="h-full rounded-full bg-teal-600"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow ? <Pill>{eyebrow}</Pill> : null}
      <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-lg font-semibold leading-8 text-slate-600 dark:text-slate-300">
          {text}
        </p>
      ) : null}
    </div>
  );
}
