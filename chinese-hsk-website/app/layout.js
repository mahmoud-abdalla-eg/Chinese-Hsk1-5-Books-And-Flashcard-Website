import "./globals.css";
import { LanguageProvider } from "@/components/language/language-provider";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";

export const metadata = {
  title: "Mandarin Flow HSK",
  description:
    "Conversation-based HSK 3.0 Chinese learning for English, Chinese, and Arabic learners.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full text-slate-900 antialiased dark:text-slate-100">
        <LanguageProvider>
          <div className="min-h-screen overflow-hidden">
            <SiteHeader />
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
