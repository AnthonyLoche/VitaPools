import { Hanken_Grotesk, Inter, Geist } from "next/font/google";
import "../assets/globals.css";
import "../assets/css/animation.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://www.vitapools.pt"),

  title: {
    default: "VitaPools | Manutenção e Limpeza de Piscinas em Portugal",
    template: "%s | VitaPools",
  },

  description:
    "Tratamento, manutenção e recuperação da sua piscina com qualidade, confiança e profissionalismo. Especialistas em limpeza e tratamento de piscinas em Portugal.",

  keywords: [
    "manutenção de piscinas",
    "limpeza de piscinas",
    "tratamento de piscinas",
    "piscinas Portugal",
    "VitaPools",
    "recuperação de piscinas",
    "piscinas Ericeira",
    "piscinas Mafra",
    "piscinas Torres Vedras",
    "limpeza de piscinas Ericeira",
    "manutenção de piscinas Mafra",
    "tratamento de água de piscinas",
    "piscinas residenciais",
    "piscinas comerciais Portugal",
    "manutenção de piscinas preço",
    "limpeza de piscinas profissional",
    "tratamento de piscinas verdes",
  ],

  authors: [
    {
      name: "VitaPools",
      url: "https://www.vitapools.pt",
    },
  ],

  creator: "VitaPools",
  publisher: "VitaPools",
  applicationName: "VitaPools",
  category: "Manutenção de Piscinas",

  alternates: {
    canonical: "/",
    languages: {
      "pt-PT": "/",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://www.vitapools.pt",
    siteName: "VitaPools",
    title: "VitaPools | Manutenção e Limpeza de Piscinas em Portugal",
    description:
      "Tratamento, manutenção e recuperação da sua piscina com qualidade, confiança e profissionalismo. Especialistas em limpeza e tratamento de piscinas.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "VitaPools - Manutenção de Piscinas",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VitaPools | Manutenção e Limpeza de Piscinas em Portugal",
    description:
      "Tratamento, manutenção e recuperação da sua piscina com qualidade, confiança e profissionalismo.",
    images: ["/opengraph-image.png"],
    site: "@vitapools",
    creator: "@vitapools",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },

  manifest: "/site.webmanifest",
};

// Viewport export (separado para melhor performance)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000080",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-PT"
      className={`${hankenGrotesk.variable} ${inter.variable} ${geist.variable} scroll-smooth h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-body-md text-body-md bg-background text-on-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}