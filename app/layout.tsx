import { NavItemMenu } from "./components/Navigation";
import * as fonts from "./components/fonts";
import "./globals.css";
import { ReactNode } from "react";
import { ScrollToTop } from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <Analytics />
      <ScrollToTop />
      <body
        className={`bg-gray-50 ${fonts.roboto.variable} ${fonts.monoton.variable} font-sans`}
      >
        <div className={"flex h-screen flex-col justify-between"}>
          <NavItemMenu />
          <main className="mx-auto w-full flex-1 pt-28">{children}</main>
          <footer className="bg-slate-200 bg-opacity-50 text-center backdrop-blur-lg backdrop-filter lg:text-left">
            <div className="p-4 text-center text-gray-700">
              © 2022 Kacey Cleveland
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Kacey Cleveland Dev",
    template: "%s | Kacey Cleveland Dev",
  },
  description: "I break, fix, and optimize things.",
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};
