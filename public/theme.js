const theme = localStorage.getItem("theme");
const matchesMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (theme === "dark" || (!theme && matchesMedia)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
