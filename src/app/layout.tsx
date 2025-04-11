import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SharedLayout } from "@/components/SharedLayout";
import { ThemeProvider } from "@/lib/theme";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sprout Hub",
  description: "Manage your plant collection and watering schedules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider>
            <SharedLayout>{children}</SharedLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
