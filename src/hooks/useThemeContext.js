import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error('useModeContext must be inside ThemeContextProvider');
  }

  return context;
}