import React from 'react';
import FetchData from './api/FetchData';
import { Card } from 'primereact/card';
import '../styles/podcast.scss'
import { ProgressSpinner } from 'primereact/progressspinner';
import Image from 'next/image';

export default function TrendingTopItems() {

    const { data, error, loading } = FetchData('https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=6');

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

    const playlists = data.playlists.items

    const header = (img) => (
        <Image alt="Card" src={img} width={300} height={300} />
    );

    return (
        <div className="card flex flex-column justify-content-center">
            <h1 className="text-white ml-2 mt-2">{data.message}</h1>
            <div className='flex overflow-x-auto'>
                {playlists?.slice(0, 19).map((playlist) =>
                    <Card
                        key={playlist?.id}
                        title={playlist?.name}
                        subTitle={playlist?.description}
                        header={header(playlist?.images[0]?.url)}
                        className="m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer"
                        style={{ minWidth: '300px' }}
                    >
                    </Card>
                )}
            </div>
        </div>
    );
}

