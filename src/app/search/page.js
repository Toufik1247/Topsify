"use client"
import SearchPage from '../components/SearchPage';
import { SessionProvider } from 'next-auth/react'

export default function Search(params) {

    return (
        <SessionProvider>
            <div className='overflow-hidden'>
                <SearchPage />
            </div>
        </SessionProvider>
    );
}
