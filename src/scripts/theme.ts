// One theme switch shared by the nav button and the index card.
export type Theme = "light" | "dark";
export const THEME_KEY = "chin-theme";

export const currentTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the switch still holds for this page view */
    }
    dispatchEvent(new CustomEvent("themechange"));
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !document.startViewTransition) apply();
  else document.startViewTransition(apply);
  return next;
}
