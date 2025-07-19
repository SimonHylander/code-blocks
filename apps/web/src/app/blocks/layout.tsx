import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@repo/web/styles/globals.css";

import { TRPCReactProvider } from "../../trpc/react";
import { TopNavigation } from "@repo/web/app/_components/top-navigation";
import { Toaster } from "@repo/web/components/ui/sonner";

export const metadata: Metadata = {
  title: "Code Snippets",
  description:
    "Code snippets and boilerplate code I commonly use in every codebase.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-background text-foreground`}>
        <TRPCReactProvider>
          <TopNavigation />
          <div className="px-4 py-8 transition-all duration-300">
            {children}
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
