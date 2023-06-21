import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import fetchData from './api/fetchData';
import { Card } from 'primereact/card';
import '../styles/podcast.scss'

export default function UserTopItems() {

    const { data, error, loading } = fetchData('https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=10');

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite: {error.message}</div>;
    }

    console.log(data.playlists.items[0].images[0].url)
    const playlists = data.playlists.items

    const header = (img) => (
        <img alt="Card" src={img} />
    );

    return (
        <div>
            <div className="card flex flex-column justify-content-center">
                <h1 className="text-white ml-2 mt-2">{data.message}</h1>
                <div className="flex">
                    {playlists.slice(0, 6).map((playlist) =>
                        <Card
                            key={playlist.id}
                            title={playlist.name}
                            subTitle={playlist.description}
                            header={header(playlist.images[0].url)}
                            className="md:w-25rem m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer">
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

