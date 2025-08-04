import { NavItemMenu } from "./components/Navigation";
import * as fonts from "./components/fonts";
import "../globals.css";
import { ReactNode } from "react";
import { ScrollToTop } from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

import { draftMode } from "next/headers";
import { ThemeProvider } from "../components/theme-provider";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "../../sanity-lib/lib/live";

interface RootLayoutProps {
  children?: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <Analytics />
      <ScrollToTop />
      <body
        className={`bg-gray-200 dark:bg-slate-900 ${fonts.roboto.variable} ${fonts.monoton.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={"flex h-screen flex-col justify-between"}>
            <NavItemMenu />
            <main className="mx-auto w-full flex-1 pt-28">{children}</main>
            <footer className="bg-gray-300 text-center backdrop-blur-lg backdrop-opacity-50 dark:bg-slate-800 lg:text-left">
              <div className="p-4 text-center text-gray-700 dark:text-slate-300">
                © 2022 Kacey Cleveland
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.kleveland.dev"),
  title: {
    default: "Kacey Cleveland Dev",
    template: "%s | Kacey Cleveland Dev",
  },
  description: "I break, fix, and optimize things.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/appole-touch-icon.png",
  },
};
