"use client"
import { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import Layout from "@/app/components/Layout";
import FetchData from '@/app/components/api/FetchData';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import musicIcon from '../../public/images/music.png';
import Image from 'next/image';

import '../../globals.css';


export default function PlaylistDetails({ params }) {
    const [url, setUrl] = useState(`https://api.spotify.com/v1/playlists/${params.id}`);
    const [playlistData, setPlaylistData] = useState(null);
    const [trackData, setTrackData] = useState(null);
    const { data, error, loading } = FetchData(url);

    useEffect(() => {
        if (data?.tracks?.href && url === `https://api.spotify.com/v1/playlists/${params.id}`) {
            setPlaylistData(data); // Save the playlist data before changing the URL
            setUrl(data.tracks.href);
        }
        if (url !== `https://api.spotify.com/v1/playlists/${params.id}`) {
            setTrackData(data);
        }
    }, [data, url, params.id]);

    if (error) {
        return <div className='flex align-items-center justify-content-center min-h-screen font-bold text-white text-5xl bg-black-alpha-90'>
            Une erreur s&apos;est produite: {error.message}
        </div>;
    }

    if (loading) {
        return (
            <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
                <ProgressSpinner className='' animationDuration=".7s" />
            </div>
        );
    }

    function formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    return (
        <SessionProvider>
            <Layout>
                <div className="flex flex-column">

                    <div className="flex p-ai-center p-mb-3">
                        <div className='m-3'>
                            {playlistData?.images?.[0]
                                ? <img src={playlistData.images[0].url} alt="playlist cover" className="p-mb-2" style={{ width: '150px', height: '150px' }} />
                                :
                                <div
                                    style={{ width: '150px', height: '150px' }}
                                    className='bgThird border-round-sm flex justify-content-center align-items-center'>
                                    <Image
                                        className='flex align-items-center m-2'
                                        alt={playlistData?.name}
                                        src={musicIcon}
                                        height={64}
                                        width={64}
                                    />
                                </div>
                            }
                        </div>
                        <h1 className="my-4 text-7xl text-white">{playlistData?.name}</h1>
                    </div>
                    <DataTable
                        value={trackData?.items}
                        stripedRows={false}
                    >
                        <Column className="text-white" field="track.name" header="Piste"></Column>
                        <Column className="text-white" field="track.artists" header="Artistes" body={(rowData) => rowData.track.artists.map((artist) => artist.name).join(", ")}></Column>
                        <Column className="text-white" field="track.album.name" header="Album"></Column>
                        <Column className="text-white" field="track.duration_ms" header="Durée" body={(rowData) => formatDuration(rowData.track.duration_ms)}></Column>
                    </DataTable>
                </div>
            </Layout>
        </SessionProvider>
    )
}

