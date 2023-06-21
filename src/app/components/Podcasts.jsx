import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import fetchData from './api/fetchData';
import { Card } from 'primereact/card';
import '../styles/podcast.scss'

export default function Podcasts() {

    const { data, error, loading } = fetchData('https://api.spotify.com/v1/browse/new-releases?country=FR&limit=10');

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite: {error.message}</div>;
    }

    const albums = data.albums.items

    const header = (img) => (
        <img alt="Card" src={img} />
    );

    return (
        <div>
            <div className="card flex flex-column justify-content-center">
                <h1 className="text-white ml-2 mt-2">Nouvelles tendances</h1>
                <div className="flex">
                    {albums.slice(0, 6).map((album) =>
                        <Card
                            key={album.id}
                            title={album.name}
                            subTitle={album.artists.map((artist) => artist.name).join(", ")}
                            header={header(album.images[1].url)}
                            className="md:w-25rem m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer">
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

