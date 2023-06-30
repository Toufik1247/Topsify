import { useState, useEffect } from 'react';
import { HomeContext } from '../HomeContextProvider';
import { useContext } from 'react';

const GetUserPlaylistsItems = () => {


    const [playlists, setPlaylists] = useState([]);
    const { playlistAdded } = useContext(HomeContext);

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

    return (
        <div className=''>
            {playlists?.items?.map((playlist, index) => (
                <div key={index}>
                    <h3 className='text-white'>{playlist.name}</h3>

                </div>
            ))}
        </div>
    );
};

export default GetUserPlaylistsItems;