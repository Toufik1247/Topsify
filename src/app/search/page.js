"use client"
import SearchPage from '../components/SearchPage';
import { HomeContextProvider } from '../HomeContextProvider';

export default function Search() {
    return (
        <HomeContextProvider>
            <div className='overflow-hidden'>
                <SearchPage />
            </div>
        </HomeContextProvider>
    );
}
