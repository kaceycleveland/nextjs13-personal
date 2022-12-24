"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      if (!window.location.hash)
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, 0);
  }, [pathname]);

  return null;
};
