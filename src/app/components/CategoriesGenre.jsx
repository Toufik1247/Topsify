import { useContext } from 'react';
import { HomeContext } from '../HomeContextProvider';
import fetchData from './api/fetchData';
import Link from 'next/link';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function CatoregiesGenre() {
    const { value } = useContext(HomeContext);
    // console.log(value)

    const { data, error, loading } = fetchData('https://api.spotify.com/v1/browse/categories?country=FR&locale=fr_FR&limit=50');

    if (loading) {
        return (
            <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
                <ProgressSpinner className='' animationDuration=".7s" />
            </div>
        );
    }

    if (error) {
        return <div className='flex align-items-center justify-content-center min-h-screen font-bold text-white text-5xl bg-black-alpha-90'>
            Une erreur s'est produite: {error.message}
        </div>;
    }

    const categories = data?.categories?.items

    const header = (img, name) => (
        <div className='relative'>
            <img alt="category" className='border-round-xl' style={{ width: '200px' }} src={img} />
            <div
                className='absolute text-white font-bold text-xl bottom-0 mb-3 ml-3 '
            >
                {name}
            </div>
        </div>
    );

    return (
        <div className=' flex flex-column justify-content-center'>
            <h2 className='text-white ml-4 my-5'>Parcourir tout</h2>
            <div className='flex ml-4 h-50 overflow-auto lg:flex-wrap md:flex-nowrap'>
                {categories?.map((categorie) =>
                    <Link href={`/category/${categorie?.id}/${categorie?.name}`}
                        key={categorie?.id}
                    >
                        <div
                            className=' m-2 cursor-pointer'

                        >
                            {header(categorie?.icons[0]?.url, categorie?.name)}
                        </div>
                    </Link>
                )}
            </div>
        </div >
    );
}


