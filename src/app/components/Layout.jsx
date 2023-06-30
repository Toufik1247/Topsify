import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { HomeContextProvider } from '../HomeContextProvider';
import { HomeContext } from '../HomeContextProvider';
import { useContext } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import Header from './Header';
import { Dialog } from 'primereact/dialog';
import GetUserPlaylists from './GetUserPlaylists';


import '../styles/home.css';
import CreatePlaylist from './CreatePlaylist';

export default function Layout({ children, isLoading }) {

    const { visible, setVisible } = useContext(HomeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [windowSize, setWindowSize] = useState([
        typeof window !== 'undefined' ? window.innerWidth : 1000, // Default width
        typeof window !== 'undefined' ? window.innerHeight : 1000, // Default height
    ]);
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        fetch('/api/get-playlists', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        if (windowSize[0] > 1000) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowSize]);

    useEffect(() => {
    }, [isOpen]);

    return (
        <HomeContextProvider value={isLoading}>
            {isLoading ? (
                <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
                    <ProgressSpinner className='' animationDuration=".7s" />
                </div>
            ) : (
                <div className="grid align-items-center justify-content-center p-dir-col overflow-hidden" style={{ backgroundColor: "#000000" }}>
                    <div className="col-12 flex h-screen ">

                        <div style={{ width: isOpen ? '400px' : '0px', overflow: 'hidden' }} className='h-auto sidebar flex flex-column align-items-stretch'>
                            <div className="col-fixed mt-3 mb-1 mx-1 flex flex-column justify-content-start bgSecond w-25rem border-round">
                                <Link
                                    href="/"
                                    replace
                                    prefetch={false}>
                                    {/* passer a true en prod */}
                                    <Button label="Accueil" className="text-left mb-2 bgSecond border-transparent" icon="pi pi-home">
                                    </Button>
                                </Link>
                                <Link
                                    href="/search"
                                    replace
                                    prefetch={false}>
                                    {/* passer a true en prod */}
                                    <Button label="Rechercher" className="text-left mb-2 bgSecond border-transparent text-gray-400 hover:text-white" icon="pi pi-search">
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-fixed mt-1 mx-1 flex flex-column bgSecond w-25rem border-round h-full">
                                <div className="col-fixed mb-3 flex justify-content-between">
                                    <Button label="Bibliothèque" className="text-left mb-2 bgSecond border-transparent text-gray-400 hover:text-white" icon="pi pi-list" />
                                    <Button onClick={() => setVisible(true)} label="" className="text-left mb-2 bgSecond border-transparent text-gray-400 hover:text-white" icon="pi pi-plus" />
                                </div>
                                <div>

                                    <div className="col-fixed py-3 mt-1 mb-8 mx-1 flex flex-column align-items-left bgThird border-round ">
                                        {playlists?.items?.length ? (
                                            <div className='col-fixed py-3 mt-1 mx-1 flex flex-column align-items-left bgThird border-round overflow-auto h-12rem'>
                                                <GetUserPlaylists
                                                    addTrack={false}
                                                    playlists={playlists} />
                                            </div>

                                        ) : (
                                            <>
                                                <h2 className="text-white text-base font-bold px-2 py-2 ">Créez votre première playlist</h2>
                                                <h4 className="text-white text-sm font-normal px-2 pt-2 pb-4">C&apos;est simple, nous allons vous aider</h4>
                                            </>
                                        )}
                                        <Button onClick={() => setVisible(true)} label="Créer une playlist" rounded className="w-6 mt-2 text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900" />
                                        <Dialog
                                            header="Créer une playlist"
                                            visible={visible}
                                            contentStyle={{ backgroundColor: '#242424', color: 'white' }}
                                            headerStyle={{ backgroundColor: '#242424', color: 'white' }}
                                            style={{ color: 'white' }}
                                            onHide={() => setVisible(false)}
                                            draggable={false}
                                            dismissableMask={true}
                                            className='w-20rem'
                                        >
                                            <CreatePlaylist closeDialog={() => setVisible(false)} />
                                        </Dialog>
                                    </div>

                                </div>
                                <div className="col-fixed py-3 mx-1 flex flex-column align-items-left bgThird border-round">
                                    <h2 className="text-white text-base font-bold px-2 py-2 ">Cherchons quelques podcasts auxquels vous abonner</h2>
                                    <h4 className="text-white text-sm font-normal px-2  pt-2 pb-4">Nous vous transmettrons des informations sur les nouveaux épisodes</h4>
                                    <Link href="/search" passHref>
                                        <Button label="Parcourir les podcasts" rounded className="w-7 text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900" />
                                    </Link>
                                </div>
                                <div className="col-fixed absolute py-3 max-w-20rem bottom-0 my-5 mb-2 mx-1 flex flex flex-wrap align-items-left bgSecond border-round">
                                    <a href="https://www.spotify.com/fr/legal/end-user-agreement/" className="text-400 text-xs px-2 py-2">Légal</a>
                                    <a href="https://www.spotify.com/fr/privacy" className="text-400 text-xs px-2 py-2">Centre de confidentialité</a>
                                    <a href="https://www.spotify.com/fr/legal/privacy-policy/" className="text-400 text-xs px-2 py-2">Protection des données</a>
                                    <a href="#" className="text-400 text-xs px-2 py-2">Paramètres des cookies</a>
                                    <a href="https://www.spotify.com/fr/legal/privacy-policy/#s3" className="text-400 text-xs px-2 py-2">A propos des pubs</a>
                                    <a href="https://www.spotify.com/fr/accessibility" className="text-400 text-xs px-2 py-2">Accessibilité</a>
                                    <a href="https://www.spotify.com/fr/legal/cookies-policy/" className="text-400 text-xs px-2 py-2">Cookies</a>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: isOpen ? '300px' : '0px' }} className="bgTransition sidebarSecond flex-1 content col mt-3 mx-1 p-0 h-auto overflow-auto bgSecond border-round">
                            <Header />
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </HomeContextProvider>
    );
}
