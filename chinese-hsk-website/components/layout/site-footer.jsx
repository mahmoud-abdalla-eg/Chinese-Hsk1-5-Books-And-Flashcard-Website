import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-950/10 bg-[#20180f] text-amber-50 dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="text-3xl font-black">Mandarin Flow HSK</div>
          <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-amber-100/70">
            A conversation-based HSK 3.0 learning system built around local
            source data, transparent validation, and study modes that can grow
            into production audio and pronunciation assessment.
          </p>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-amber-300">
            Study
          </h3>
          <div className="mt-4 grid gap-3 text-sm font-bold text-amber-100/75">
            <Link href="/hsk/1">HSK 1</Link>
            <Link href="/flashcards">Flashcards</Link>
            <Link href="/conversations">Conversations</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-amber-300">
            System
          </h3>
          <div className="mt-4 grid gap-3 text-sm font-bold text-amber-100/75">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin/data-check">Data check</Link>
            <span>Local-first progress</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
