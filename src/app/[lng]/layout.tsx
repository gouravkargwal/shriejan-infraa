import Header from "@/components/Header";
import { languages } from "../../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LanguageSpecificLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng } = params;

  return (
    <>
      <Header params={{ lng }} />
      {children}
    </>
  );
}
