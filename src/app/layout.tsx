import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import AllProviders from "@/providers/AllProviders";
import { Nunito } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Middlenation",
  description: "Be the the best person from all of mankind",
};

const nunito = Nunito({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(nunito.className)}>
      <body>
        <AllProviders>
          <main className="min-h-screen pt-12 bg-slate-50 antialiased text-slate-900  light dark:bg-slate-900 dark:text-white">
            <Navbar />
            <div className="container max-w-7xl mx-auto h-full pt-12">
              {children}
            </div>
            <Toaster />
          </main>
        </AllProviders>
      </body>
    </html>
  );
}
