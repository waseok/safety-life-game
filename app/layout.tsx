import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "안전 인생게임 | Safety Life CYOA",
  description:
    "7대 안전영역을 체험하는 삽화 중심 선택형 인생게임. 올바른 안전 판단을 내려보세요!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
