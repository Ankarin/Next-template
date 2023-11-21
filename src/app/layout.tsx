import type { Metadata } from "next";
import { getUser } from "@/server/supabase";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import ThemeProvider from "@/providers/ThemeProvider";

import AppBar from "@/components/AppBar";
import QueryProvider from "@/providers/QueryProvider";
import { User } from "@supabase/gotrue-js";
export const metadata: Metadata = {
  title: "Next.js Template",
  description: "Next.js Template",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User | null = await getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <AppBar user={user} />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
