import React from 'react';

const SearchedTrack = ({ data }) => {
    return (
        <div className='flex flex-wrap'>
            {data?.map(track => (
                <div
                    key={track?.id}
                    className='bg-black-alpha-70 m-3 flex flex-column border-round-lg max-w-12rem'>
                    <h2 className='text-white text-base m-3'>{track?.name}</h2>
                    <p className='text-white text-base m-3'>{track?.artists[0]?.name}</p>
                </div>
            ))
            }
        </div >
    )
}

export default SearchedTrack;
