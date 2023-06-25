import Layout from '../Layout';
import { useContext, useEffect } from 'react';
import { HomeContext } from '../HomeContextProvider';
import FetchData from './api/FetchData';
import CatoregiesGenre from './CategoriesGenre';
import { ProgressSpinner } from 'primereact/progressspinner';

import '../globals.css';

export default function SearchPage() {
    const { value } = useContext(HomeContext);

    const url = value === '' ? 'https://api.spotify.com/v1/search?q=a&type=album,artist,playlist,track,show,episode,audiobook&market=fr&limit=50' : `https://api.spotify.com/v1/search?q=${value}&type=album,artist,playlist,track,show,episode,audiobook&market=fr&limit=1`;

    const { data, error, loading } = FetchData(url);

    if (loading) {
        return (
            <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
                <ProgressSpinner className='' animationDuration=".7s" />
            </div>
        );
    }

    if (error) {
        return <div className='flex align-items-center justify-content-center min-h-screen font-bold text-white text-5xl bg-black-alpha-90'>
            Une erreur s&apos;est produite: {error.message}
        </div>;
    }

    console.log(data);

    return (
        <Layout>
            <div className='overflow-auto'>
                {value.length < 3 ?
                    <CatoregiesGenre />
                    :
                    'ok'}
            </div>
        </Layout>
    );
}

