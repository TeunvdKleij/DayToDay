'use client'
import React, {createContext, ReactNode, useEffect, useState} from 'react';
interface MainProps {
    children: ReactNode,
}
interface MainContextProps {
    screenWidth: number | null
    theme: string
    setTheme: (value: string) => void
}

export const MainContext = createContext<MainContextProps>({
    screenWidth: 0,
    theme: "dark",
    setTheme: () => {},
});

const MainProvider: React.FC<MainProps> = ({children}) => {
    const [screenWidth, setScreenWidth] = useState<number | null>(null);
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        if (typeof window !== 'undefined') {
          setScreenWidth(window.innerWidth);
          const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
          };
          window.addEventListener('resize', updateScreenWidth);
        }
        if(localStorage.getItem("theme") != null) {
            const theme : string = localStorage.getItem("theme") as string
            setTheme(theme)
        }
      }, []);

    return (
        <MainContext.Provider value={{
            screenWidth,
            theme,
            setTheme,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider;