import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

const STORAGE_KEY = "app_theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    // опціонально — додаємо клас на html
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
