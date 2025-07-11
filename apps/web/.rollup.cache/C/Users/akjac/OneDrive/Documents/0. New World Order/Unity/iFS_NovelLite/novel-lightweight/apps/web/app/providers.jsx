"use client";
import { createContext } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
export const AppContext = createContext({
    font: "Default",
    setFont: () => { },
});
const ToasterProvider = () => {
    const { theme } = useTheme();
    return <Toaster theme={theme}/>;
};
export default function Providers({ children }) {
    const [font, setFont] = useLocalStorage("novel__font", "Default");
    return (<ThemeProvider attribute="class" value={{
            light: "light-theme",
            dark: "dark-theme",
        }}>
      <AppContext.Provider value={{
            font,
            setFont,
        }}>
        <ToasterProvider />
        {children}
        <Analytics />
      </AppContext.Provider>
    </ThemeProvider>);
}
//# sourceMappingURL=providers.jsx.map