const theme = localStorage.getItem("theme");
const matchesMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (theme === "dark" || (!theme && matchesMedia)) {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
}
