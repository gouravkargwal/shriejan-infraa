import Header from "@/components/Header";
import { dir } from "i18next";

const languages = ["en", "hi"];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <Header params={{ lng }} />
        {children}
      </body>
    </html>
  );
}
