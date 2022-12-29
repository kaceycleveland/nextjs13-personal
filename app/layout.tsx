import { NavItemMenu } from "./components/Navigation";
import * as fonts from "./components/fonts";
import "./globals.css";
import { ReactNode } from "react";
import { ScrollToTop } from "./components/ScrollToTop";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <ScrollToTop />
      <body className={`bg-gray-50 ${fonts.roboto.variable} font-sans`}>
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
