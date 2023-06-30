import React from 'react';
import Image from 'next/image';
import artistNoPhoto from '../public/images/artistNoPhoto.png';

const SearchedArtist = ({ data }) => {

    return (
        <div className='flex flex-wrap'>
            {data?.slice(0, 10).map(artist => (
                <div
                    key={artist?.id}
                    className='bg-black-alpha-70 m-3 flex flex-column border-round-lg max-w-12rem'>
                    <div className=' m-3 '>
                        {artist?.images[0]?.url ? (
                            <Image
                                alt={artist?.name}
                                src={artist?.images[0]?.url}
                                height={160}
                                width={160}
                                className='border-circle'
                            />
                        ) : (
                            <div className=' border-circle bgThird flex align-items-center justify-content-center w-10rem h-10rem'>
                                <Image
                                    alt={artist?.name}
                                    src={artistNoPhoto}
                                    height={64}
                                    width={64}
                                />
                            </div>
                        )}
                    </div>
                    <h2 className='text-white text-base m-3'>{artist?.name}</h2>
                </div>
            ))
            }
        </div >
    )
}

export default SearchedArtist;

