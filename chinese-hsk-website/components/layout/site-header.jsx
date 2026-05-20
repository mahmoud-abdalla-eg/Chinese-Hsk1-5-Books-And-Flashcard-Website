import Link from "next/link";
import { Localized } from "@/components/language/language-provider";
import LanguageSwitcher from "@/components/language/language-switcher";

const navItems = [
  { href: "/", label: "home" },
  { href: "/flashcards", label: "flashcards" },
  { href: "/conversations", label: "conversations" },
  { href: "/grammar", label: "grammar" },
  { href: "/dashboard", label: "dashboard" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#eadcc8]/80 bg-[#fbf2e4]/82 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-xl font-black text-amber-200 shadow-xl shadow-amber-900/10 dark:bg-amber-200 dark:text-slate-950">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_42%)]" />
            <span className="relative">{"\u6C49"}</span>
          </span>
          <span>
            <span className="block text-base font-black tracking-tight text-slate-950 dark:text-white">
              <Localized k="appName" />
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
              Conversation HSK 3.0
            </span>
          </span>
        </Link>
        <nav className="hidden items-center rounded-full border border-slate-950/10 bg-white/58 p-1 text-sm font-black text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-slate-950 hover:text-white dark:hover:bg-amber-200 dark:hover:text-slate-950"
            >
              <Localized k={item.label} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="grid grid-cols-5 border-t border-slate-950/5 bg-white/55 text-center text-xs font-black text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200 md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="px-2 py-3">
            <Localized k={item.label} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
