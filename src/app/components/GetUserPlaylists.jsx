import { useState, useEffect } from 'react';
import { HomeContext } from '../HomeContextProvider';
import { useContext } from 'react';
import musicIcon from '../public/images/music.png';
import Image from 'next/image';
import Link from 'next/link';

const GetUserPlaylists = ({ addTrack }) => {


    const [playlists, setPlaylists] = useState([]);
    const { playlistAdded, setPlaylistAdded } = useContext(HomeContext);

    useEffect(() => {
        getPlaylists();
    }, [playlistAdded]);

    useEffect(() => {
    }, [playlists]);

    const getPlaylists = () => {
        fetch('/api/get-playlists', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPlaylists(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const addToPlaylist = (playlistId, trackUri) => {
        fetch('/api/add-to-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistId, trackUri }),
        })
            .then(response => {
                if (response.ok) {
                    setPlaylistAdded(!playlistAdded);
                } else {
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        closeDialog();
    };


    const Component = ({ playlist }) => {
        return (
            <div
                className='flex align-items-center my-2'
            >
                <div className='bg-black-alpha-70 border-round-sm flex justify-content-center align-items-center w-2'>
                    <Image
                        className='flex align-items-center m-2'
                        alt={playlist?.name}
                        src={musicIcon}
                        height={26}
                        width={26}
                    />
                </div>
                <div className='flex'>
                    <h5 className='ml-2 text-white'>{playlist?.name}</h5>
                    <h5 className='ml-2 text-white'>{playlist?.owner?.display_name}</h5>
                </div>
            </div>
        )
    }

    return (
        <div className=''>
            {playlists?.items?.map((playlist, index) => {
                if (!addTrack) {
                    return (
                        <Link href={`/playlist/${playlist.id}`} key={playlist?.id}>
                            <Component playlist={playlist} />
                        </Link>
                    );
                } else {
                    return (
                        <div onClick={() => addToPlaylist(playlist.id, trackId)} key={playlist?.id}>
                            <Component playlist={playlist} />
                        </div>
                    );
                }
            })}
        </div>
    );

};

export default GetUserPlaylists;