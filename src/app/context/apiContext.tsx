"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface props {
    token : string;
    setToken: (value: string) => void;
}

const apiContext = createContext<props | undefined>(undefined);

export const ctx = () => {
    const context = useContext(apiContext);
    if (!context) {
        throw new Error("apiContext deve ser usado dentro de um provedor ApiProvider");
    }
    return context;
};

export const ApiProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [token, setToken] = useState('')
    return(
        <apiContext.Provider value={{token, setToken}}>
            {children}
        </apiContext.Provider>
    )
}