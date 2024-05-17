'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
interface MainProps {
    children: ReactNode,
}
interface MainContextProps {
    screenWidth: number | null
}

export const MainContext = createContext<MainContextProps>({
    screenWidth: 0
});

const MainProvider: React.FC<MainProps> = ({children}) => {
    const [screenWidth, setScreenWidth] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          setScreenWidth(window.innerWidth);
          const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
          };
          window.addEventListener('resize', updateScreenWidth);
        }
      }, []);

    return (
        <MainContext.Provider value={{
            screenWidth,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider;