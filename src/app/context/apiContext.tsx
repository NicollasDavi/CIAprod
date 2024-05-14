"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Props {
    token: string;
    setToken: (value: string) => void;
}

const ApiContext = createContext<Props | undefined>(undefined);

export const useCtx = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useCtx deve ser usado dentro de um provedor ApiProvider");
    }
    return context;
};

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState('');
    return (
        <ApiContext.Provider value={{ token, setToken }}>
            {children}
        </ApiContext.Provider>
    );
};
