import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "UpNext - Programas de Formação em Tecnologia",
  description: "Plataforma para divulgar e encontrar programas de formação em tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
