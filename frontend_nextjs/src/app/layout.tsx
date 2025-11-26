import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "A clean, modern notes application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="container-app" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
