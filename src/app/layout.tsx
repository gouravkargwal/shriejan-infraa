import "../app/globals.css";

export const metadata = {
  title: "Shriejan Infraa",
  description: "A Next.js 14 i18n example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
