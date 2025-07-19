import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@repo/web/styles/globals.css";

import { TRPCReactProvider } from "@repo/web/trpc/react";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} bg-background text-foreground`}>
          <TRPCReactProvider>
            <div className="px-4 py-8 transition-all duration-300">
              {children}
            </div>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
