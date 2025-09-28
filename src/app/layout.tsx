import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
  title: "Contour ERP",
  description: "Enterprise Resource Planning System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400">
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 ml-64 p-8 bg-gradient-to-br from-slate-50/95 via-slate-100/90 to-slate-200/85 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
