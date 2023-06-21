import { Button } from 'primereact/button';
import Header from './Header';
import Podcasts from './Podcasts';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/home.scss';
import UserTopItems from './UserTopItems';

export default function HomePage() {

    return (
        <div className="grid p-dir-col overflow-hidden" style={{ backgroundColor: "#000000" }}>
            <div className="col-12 flex h-screen">
                <div className='h-auto flex flex-column align-items-stretch'>
                    <div className="col-fixed mt-3 mb-1 mx-1 flex flex-column justify-content-start surface-900 w-25rem border-round">
                        <Button label="Accueil" className="text-left mb-2 surface-900 border-transparent" icon="pi pi-home" />
                        <Button label="Rechercher" className="text-left mb-2 surface-900 border-transparent text-gray-400 hover:text-white" icon="pi pi-search" />
                    </div>
                    <div className="col-fixed mt-1 mx-1 flex flex-column surface-900 w-25rem border-round">
                        <div className="col-fixed mb-3 flex justify-content-between">
                            <Button label="Bibliothèque" className="text-left mb-2 surface-900 border-transparent text-gray-400 hover:text-white" icon="pi pi-list" />
                            <Button label="" className="text-left mb-2 surface-900 border-transparent text-gray-400 hover:text-white" icon="pi pi-plus" />
                        </div>
                        <div className="col-fixed py-3 mt-1 mb-8 mx-1 flex flex-column align-items-left surface-800 border-round">
                            <h2 className="text-white text-base font-bold px-2 py-2 ">Créez votre première playlist</h2>
                            <h4 className="text-white text-sm font-normal px-2  pt-2 pb-4">C'est simple, nous allons vous aider</h4>
                            <Button label="Créer une playlist" rounded className="w-6 text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900" />
                        </div>
                        <div className="col-fixed py-3 mb-8 mx-1 flex flex-column align-items-left surface-800 border-round">
                            <h2 className="text-white text-base font-bold px-2 py-2 ">Cherchons quelques podcasts auxquels vous abonner</h2>
                            <h4 className="text-white text-sm font-normal px-2  pt-2 pb-4">Nous vous transmettrons des informations sur les nouveaux épisodes</h4>
                            <Button label="Parcourir les podcasts" rounded className="w-7 text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900" />
                        </div>
                        <div className="col-fixed py-3 my-5 mb-2 mx-1 flex flex flex-wrap align-items-left surface-900 border-round">
                            <a href="#" className="text-400 text-xs px-2 py-2">Légal</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">Centre de confidentialité</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">Protection des données</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">Paramètres des cookies</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">A propos des pubs</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">Accessibilité</a>
                            <a href="#" className="text-400 text-xs px-2 py-2">Cookies</a>
                        </div>
                    </div>
                </div>
                <div className="content col mt-3 mx-1 p-0 h-auto overflow-x-hidden surface-900 border-round">
                    <Header></Header>
                    <div className='flex flex-column'>
                        <Podcasts />
                        <UserTopItems />
                        <Podcasts />
                        <Podcasts />
                    </div>
                </div>
            </div>
        </div>

    );
}
