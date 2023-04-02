"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

const LOCAL_STORAGE_THEME_KEY = "theme";
const THEME = {
  dark: "dark",
  light: "light",
} as const;

const getIsDarkMode = () => {
  const foundValue =
    typeof window !== undefined
      ? localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
      : undefined;
  return (
    foundValue === THEME.dark ||
    (!foundValue && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export default function ThemeSwitchButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.light);
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.dark);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const isDarkMode = getIsDarkMode();
    if (isDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.dark);
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEME.light);
    }
  }, []);

  return (
    <div
      className="h-6 w-6 transition-colors dark:text-white"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </div>
  );
}
