import "../globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`bg-gray-50 font-sans`}>
        <main className="mx-auto w-full flex-1">{children}</main>
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
