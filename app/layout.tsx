import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elladatora.gr"),
  title: {
    default: "Ελλάδα Τώρα — Η είδηση από όλες τις πλευρές",
    template: "%s · Ελλάδα Τώρα",
  },
  description: "AI περιλήψεις και σύγκριση κάλυψης από ελληνικές και διεθνείς ειδησεογραφικές πηγές.",
  openGraph: {
    title: "Ελλάδα Τώρα — Η είδηση από όλες τις πλευρές",
    description: "Σύντομες περιλήψεις και σύγκριση κάλυψης με καθαρές παραπομπές στις αρχικές πηγές.",
    url: "https://www.elladatora.gr",
    siteName: "Ελλάδα Τώρα",
    locale: "el_GR",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className="antialiased">{children}</body>
    </html>
  );
}
