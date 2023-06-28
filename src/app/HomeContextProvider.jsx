"use client"
import { useState, createContext } from 'react';
import { useSession } from 'next-auth/react';

export const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('');

    const { data: session, status } = useSession();
    const userIsLoggedIn = !!session;

    return (
        <HomeContext.Provider value={{ userIsLoggedIn, value, setValue, isLoading }}>
            {children}
        </HomeContext.Provider>
    );
}
