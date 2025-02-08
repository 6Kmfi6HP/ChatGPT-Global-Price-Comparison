import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Global Price Comparison | Compare Subscription Costs Worldwide",
  description:
    "Compare ChatGPT subscription prices across different countries and currencies. Find the best pricing for ChatGPT Plus and ChatGPT-4o mini subscriptions worldwide.",
  keywords:
    "ChatGPT, OpenAI, subscription prices, global pricing, ChatGPT Plus, ChatGPT-4o mini, price comparison",
  openGraph: {
    title: "ChatGPT Global Price Comparison",
    description:
      "Compare ChatGPT subscription prices across different countries and currencies worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}