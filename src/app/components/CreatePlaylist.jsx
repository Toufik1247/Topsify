import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { HomeContext } from '../HomeContextProvider';
import { useContext } from 'react';

const CreatePlaylist = ({ closeDialog }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    const { playlistAdded, setPlaylistAdded } = useContext(HomeContext);

    const createPlaylist = () => {
        const playlistDetails = {
            name: playlistName,
            description: playlistDescription,
            public: false,
        };

        fetch('/api/create-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistDetails),
        })
            .then(response => {
                response.json()
                setPlaylistAdded(!playlistAdded);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        closeDialog();
    };

    return (
        <div className="flex flex-column align-items-center">
            <div className="mt-5 mb-3">
                <span className="p-float-label">
                    <InputText
                        id="playlistName"
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <label htmlFor="playlistName">Nom</label>
                </span>
            </div>
            <div className="mb-5 mt-3">
                <span className="p-float-label">
                    <InputText
                        id="playlistDescription"
                        type="text"
                        value={playlistDescription}
                        onChange={(e) => setPlaylistDescription(e.target.value)}
                        className='w-15'
                    />
                    <label htmlFor="playlistDescription">Description</label>
                </span>
            </div>
            <div className="">
                <Button
                    className=' text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900'
                    label="Creer"
                    icon="pi pi-check"
                    onClick={createPlaylist}
                />
            </div>
        </div>
    );
};

export default CreatePlaylist;
