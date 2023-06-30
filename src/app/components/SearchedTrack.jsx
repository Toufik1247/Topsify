import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import GetUserPlaylists from './GetUserPlaylists';

const SearchedTrack = ({ data }) => {
    const [dialogVisible, setDialogVisible] = useState(false);

    const openDialog = () => {
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const msToTime = (duration) => {
        var minutes = Math.floor((duration / (1000 * 60)) % 60),
            seconds = Math.floor((duration / 1000) % 60);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const albumTemplate = (rowData) => {
        return <img src={rowData.album.images[0].url} alt={rowData.album.name} style={{ width: '50px', height: '50px' }} />
    }

    const durationTemplate = (rowData) => {
        return <p>{msToTime(rowData.duration_ms)}</p>
    }

    const buttonTemplate = (item) => {
        return (
            <Button
                onClick={openDialog}
                label=""
                className="text-left mb-2 bgSecond border-transparent text-gray-400 hover:text-white"
                icon="pi pi-plus"
            />
        );
    };

    const trackAndArtistsTemplate = (rowData) => {
        return (
            <div>
                <h2 className='text-white text-base m-3'>{rowData.name}</h2>
                <p className='text-white text-base m-3'>{rowData.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-column my-3'>

            <DataTable
                value={data}
                className="p-datatable-sm"
            >
                <Column body={albumTemplate} header="Album"></Column>
                <Column body={trackAndArtistsTemplate} header="Piste & Artistes"></Column>
                <Column className="text-white" body={durationTemplate} header="Durée"></Column>
                <Column
                    className="text-white flex justify-content-center"
                    body={buttonTemplate}
                    header="Ajouter à une playlist"
                ></Column>
            </DataTable>

            <Dialog
                visible={dialogVisible}
                contentStyle={{ backgroundColor: '#242424', color: 'white' }}
                headerStyle={{ backgroundColor: '#242424', color: 'white' }}
                style={{ color: 'white' }}
                onHide={closeDialog}
                draggable={false}
                dismissableMask={true}
                className='w-20rem'
                closable={false}
            >
                <GetUserPlaylists addTrack={false} />
            </Dialog>
        </div >
    )
}

export default SearchedTrack;


