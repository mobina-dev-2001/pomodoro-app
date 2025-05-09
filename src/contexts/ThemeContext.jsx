import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const DEFAULT_FONT = "Kumbh Sans";
const DEFAULT_COLOR = "hsl(0, 91%, 71%)";

const fontMap = { kumbhSans: DEFAULT_FONT, robotoSlab: "Roboto Slab", spaceMono: "Space Mono" };
const colorMap = { froly: DEFAULT_COLOR, malibu: "hsl(182, 91%, 71%)", heliotrope: "hsl(260, 91%, 71%)" };

export function ThemeProvider({ children }) {
  const [font, setFont] = useState(() => {
    try {
      const stored = localStorage.getItem("selectedFont");
      return stored && fontMap[stored] ? fontMap[stored] : DEFAULT_FONT;
    } catch (error) {
      console.error("Failed to read font from localStorage:", error);
      return DEFAULT_FONT;
    }
  });

  const [color, setColor] = useState(() => {
    try {
      const stored = localStorage.getItem("selectedColor");
      return stored && colorMap[stored] ? colorMap[stored] : DEFAULT_COLOR;
    } catch (error) {
      console.error("Failed to read color from localStorage:", error);
      return DEFAULT_COLOR;
    }
  });

  useEffect(() => {
    document.documentElement.style.setProperty( "--font-theme", `'${font || DEFAULT_FONT}', sans-serif` );
    document.documentElement.style.setProperty( "--color-theme", color || DEFAULT_COLOR );
  }, [font, color]);

  return (
    <ThemeContext.Provider value={{ font, setFont, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
