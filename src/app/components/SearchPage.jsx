import Layout from './Layout';
import { useEffect, useState } from 'react';
import FetchData from './api/FetchData';
import CategoriesGenre from './CategoriesGenre';
import CustomHeaderButton from './custom/SearchHeaderButton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SearchedArtist from './SearchedArtist';
import SearchedTrack from './SearchedTrack';
import { ProgressSpinner } from 'primereact/progressspinner';

import '../globals.css';

export default function SearchPage({ children }) {
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [url, setUrl] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('artists');

    const { data, error, loading } = FetchData(url);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        setSearchValue(inputValue);
        const newUrl = `https://api.spotify.com/v1/search?q=${inputValue}&type=album,artist,playlist,track&limit=50`;
        setUrl(newUrl);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem('spotifySearchData', JSON.stringify(data));
            handleFilterClick(new Event('click'), 'artistes');
        }
    }, [data]);

    const handleFilterClick = (e, filterType) => {
        e.preventDefault();
        setFilterType(filterType);

        const storedData = JSON.parse(localStorage.getItem('spotifySearchData'));
        let filteredData;

        switch (filterType) {
            case 'albums':
                filteredData = storedData?.albums?.items;
                break;
            case 'artistes':
                filteredData = storedData?.artists?.items;
                break;
            case 'titres':
                filteredData = storedData?.tracks?.items;
                break;
            case 'playlists':
                filteredData = storedData?.playlists?.items;
                break;
            default:
                console.log("Invalid filter type");
        }

        setFilteredData(filteredData);
    }


    const labels = ["Artistes", "Titres"]

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

    return (
        <Layout>
            <div className='overflow-auto'>
                <span className=" flex m-3 justify-content-between p-input-icon-left w-6 text-white">
                    <i className="pi pi-search w-1 text-white" />
                    <InputText
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Que souhaitez-vous écouter ?"
                        className='w-full w-7 mr-8 p-inputtext-lg font-bold text-sm text-white bgThird border-transparent border-round-3xl' />
                    <Button
                        label="Recherche"
                        onClick={handleSearchClick}
                        className="p-button-rounded w-4 text-center text-sm font-bold bg-white-alpha-90 border-transparent text-900 hover:text-900"
                    />
                </span>
                {searchValue?.length < 3 ? (
                    <CategoriesGenre />
                ) : (
                    <>
                        <div className='flex align-items-center justify-content-left w-auto h-3rem'>
                            {labels.map((label) => (
                                <CustomHeaderButton
                                    key={label}
                                    label={label}
                                    onClick={(e) => handleFilterClick(e, label.toLowerCase())}
                                />
                            ))}

                        </div>
                        {
                            filterType === 'artistes' ? <SearchedArtist data={filteredData} /> :
                                filterType === 'titres' ? <SearchedTrack data={filteredData} /> :
                                    null
                        }

                        {children}
                    </>
                )}
            </div>
        </Layout>
    );
}
