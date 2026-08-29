import type { Metadata } from "next";
import { BUSINESS_NAME } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} — Website In Progress`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
