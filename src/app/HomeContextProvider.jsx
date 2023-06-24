import { useState, useEffect, createContext } from 'react';
import { getSession } from 'next-auth/react';
import { ProgressSpinner } from 'primereact/progressspinner';

export const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('');

    useEffect(() => {
        (async function checkSession() {
            const session = await checkLoginStatus();
            if (session) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        })();
    }, []);

    async function checkLoginStatus() {
        const session = await getSession();
        return session;
    }

    if (isLoading) {
        return (
            <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
                <ProgressSpinner className='' animationDuration=".7s" />
            </div>
        );
    }
    return (
        <HomeContext.Provider value={{ isLoggedIn, setIsLoggedIn, value, setValue }}>
            {children}
        </HomeContext.Provider>
    );
}
