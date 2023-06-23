import React from 'react';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';

import {
    FaShuffle,
    FaPlay,
    FaRepeat,
    FaHeart,
    FaBackwardStep,
    FaForwardStep,
    FaVolumeHigh
} from 'react-icons/fa6';


const Player = ({ song }) => {
    const [value, setValue] = React.useState(0);

    return (
        <div className="flex w-full justify-content-between align-items-center">
            <div className='flex w-4 '>
                <div>
                    <Button icon={<FaShuffle />} className="p-button-rounded bg-black-alpha-90  border-transparent " />
                </div>
                <div>
                    <Button icon={<FaHeart />} className="p-button-rounded bg-black-alpha-90  border-transparent " />
                </div>
            </div>
            <div className='flex flex-column w-4 align-items center justify-content-center'>
                <div className='flex w-full align-items center justify-content-center my-2'>
                    <div>
                        <Button icon={<FaShuffle />} className="p-button-rounded bg-black-alpha-90  border-transparent " />
                    </div>
                    <div>
                        <Button icon={<FaBackwardStep />} className="p-button-rounded bg-black-alpha-90  border-transparent" />
                    </div>
                    <div className="w-1 flex align-items center justify-content-center">
                        <Button
                            icon={<FaPlay />}
                            className="p-button-rounded bg-white p-button-outlined" />
                    </div>
                    <div>
                        <Button icon={<FaForwardStep />} className="p-button-rounded bg-black-alpha-90  border-transparent" />
                    </div>
                    <div>
                        <Button icon={<FaRepeat />} className="p-button-rounded bg-black-alpha-90  border-transparent" />
                    </div>
                </div>
                <div>
                    <Slider value={value} onChange={(e) => setValue(e.value)} className='w-full' style={{ '--slider-range-background-color': 'green' }} />
                </div>
            </div>
            <div className='flex justify-content-end align-items-center w-4 mr-5'>
                <div className="w-1">
                    <Button icon={<FaVolumeHigh />} className="p-button-rounded bg-black-alpha-90  border-transparent" />
                </div>
                <div className="w-2">
                    <Slider value={value} onChange={(e) => setValue(e.value)} style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
}

export default Player;
