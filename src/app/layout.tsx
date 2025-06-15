import "./globals.css";
import { dir } from "i18next"; // Import dir for HTML dir attribute
import { languages } from "../i18n/settings";

export const metadata = {
  title: "Shriejan Infraa",
  description: "A Next.js 14 i18n example",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir={dir(languages[0])}>
      <body>{children}</body>
    </html>
  );
}
