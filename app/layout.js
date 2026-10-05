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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://audit.dealercms.ru";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Бесплатный аудит сайта дилерского центра",
  description:
    "Проверим видимость по моделям, наличию и сервисным запросам. Покажем точки роста и дадим приоритетные рекомендации.",
  applicationName: "DealerCMS Audit",
  keywords: ["DealerCMS", "аудит сайта", "автодилер", "заявки", "дилерский центр"],
  authors: [{ name: "DealerCMS" }],
  creator: "DealerCMS",
  publisher: "DealerCMS",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "DealerCMS",
    title: "Бесплатный аудит сайта дилерского центра",
    description:
      "Проверим видимость по моделям, наличию и сервисным запросам. Покажем точки роста и дадим приоритетные рекомендации.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DealerCMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бесплатный аудит сайта дилерского центра",
    description:
      "Проверим видимость по моделям, наличию и сервисным запросам. Покажем точки роста и дадим приоритетные рекомендации.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    title: "DealerCMS Audit",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1265FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2B78" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  );
}
