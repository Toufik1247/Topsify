import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';

export default function UserRecentlyPlayed() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/recently-played')
            .then(response => response.json())
            .then(data => {
                setTracks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const recentlyPlayedTracks = tracks.data.items?.map(item => ({
        name: item?.track?.name,
        id: item?.track?.id,
        album: {
            name: item?.track?.album?.name,
            id: item?.track?.album?.id,
            image: item?.track?.album?.images[0]?.url,
            artist: item?.track?.artists[0]?.name,
        },
    }))

    const filteredTracks = recentlyPlayedTracks?.filter((track, index, self) =>
        index === self.findIndex(t => t.id === track.id)
    );

    const header = (img) => (
        <img alt="Card" src={img} />
    );

    return (
        <div>
            <h1 className="text-white mt-2">Ecoutés récemment</h1>
            <div className='flex overflow-x-auto'>
                {filteredTracks?.slice(0, 19).map((album) =>
                    <Card
                        key={album.id}
                        title={album.name}
                        subTitle={album.album.artist}
                        header={header(album.album.image)}
                        className="m-3 bg-black-alpha-30 hover:bg-black-alpha-10 text-white text-sm customTitle p-3 cursor-pointer"
                        style={{ minWidth: '300px', display: 'inline-block' }}
                    ></Card>
                )}
            </div>
        </div>
    );

}
