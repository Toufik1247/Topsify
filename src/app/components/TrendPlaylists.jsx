import React from 'react';
import fetchData from './api/fetchData';
import { Card } from 'primereact/card';
import '../styles/podcast.scss'

export default function TrendingTopItems() {

    const { data, error, loading } = fetchData('https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=10');

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite: {error.message}</div>;
    }

    const playlists = data.playlists.items

    const header = (img) => (
        <img alt="Card" src={img} />
    );

    return (
        <div className="card flex flex-column justify-content-center">
            <h1 className="text-white ml-2 mt-2">{data.message}</h1>
            <div className='flex overflow-x-auto'>
                {playlists.slice(0, 19).map((playlist) =>
                    <Card
                        key={playlist.id}
                        title={playlist.name}
                        subTitle={playlist.description}
                        header={header(playlist.images[0].url)}
                        className="m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer"
                        style={{ minWidth: '300px' }}
                    >
                    </Card>
                )}
            </div>
        </div>
    );
}

