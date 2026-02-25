import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeriQ - Live Skill Validation Platform",
  description: "Verify Skills. Build Trust. Hire Smart. The only resume verification platform with live skill validation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${sora.variable} ${inter.variable} bg-background text-foreground font-inter antialiased min-h-screen relative`}
        >
          {/* Subtle noise overlay applied globally */}
          <div className="bg-noise" />

          <header className="absolute top-0 right-0 p-6 z-50">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
