import React from 'react';
import { Card } from 'primereact/card';
import FetchData from './api/FetchData';
import { ProgressSpinner } from 'primereact/progressspinner';
import Image from 'next/image';

import '../styles/podcast.scss'
import { HomeContextProvider } from '../HomeContextProvider';

export default function Podcasts({ isLoading }) {

    const { data, error, loading } = FetchData('https://api.spotify.com/v1/browse/new-releases?country=FR&limit=6');

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


    const albums = data.albums.items

    const header = (img) => (
        <Image alt="Card" src={img} width={300} height={300} />

    );

    return (
        <HomeContextProvider value={isLoading}>
            <div>
                <div className="card flex flex-column justify-content-center">
                    <h1 className="text-white ml-2 mt-2">Nouvelles tendances</h1>
                    <div className='flex overflow-x-auto'>
                        {albums.slice(0, 19).map((album) =>
                            <Card
                                key={album.id}
                                title={album.name}
                                subTitle={album.artists.map((artist) => artist.name).join(", ")}
                                header={header(album.images[1].url)}
                                className="md:w-25rem m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer"
                                style={{ minWidth: '300px', display: 'inline-block' }}
                            >
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </HomeContextProvider>
    );
}

