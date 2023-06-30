"use client"
import SearchPage from '../components/SearchPage';
import { SessionProvider } from 'next-auth/react'
import { HomeContextProvider } from '../HomeContextProvider';
import { useEffect } from 'react';

export default function Search(params) {

    // Disabling right-click
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
        }
        document.addEventListener("contextmenu", handleContextMenu)

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [])

    return (
        <SessionProvider>
            <HomeContextProvider>

                <div className='overflow-hidden'>
                    <SearchPage />
                </div>

            </HomeContextProvider>
        </SessionProvider>
    );
}
