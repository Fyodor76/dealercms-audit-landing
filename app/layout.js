import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Бесплатный аудит сайта — DealerCMS",
  description:
    "Оставьте заявку на бесплатный аудит сайта. Покажем, где сайт теряет заявки и что можно улучшить.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  );
}
