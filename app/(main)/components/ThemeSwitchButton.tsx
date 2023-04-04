"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

const LOCAL_STORAGE_THEME_KEY = "theme";
const THEME = {
  dark: "dark",
  light: "light",
} as const;

const getIsDarkMode = () => {
  let foundValue;
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    foundValue = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  }
  return (
    foundValue === THEME.dark ||
    (!foundValue &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export default function ThemeSwitchButton() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

  const toggleDarkMode = useCallback(() => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.light);
    } else {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.dark);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="h-6 w-6 transition-colors dark:text-white"
      onClick={toggleDarkMode}
    >
      {isLoaded ? isDarkMode ? <SunIcon /> : <MoonIcon /> : null}
    </div>
  );
}
