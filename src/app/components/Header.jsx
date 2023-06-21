import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Header() {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        const content = document.getElementsByClassName('content')[0];

        if (content) {
            const onScroll = () => {
                setScroll(content.scrollTop > 50);
            };

            content.addEventListener("scroll", onScroll);

            return () => {
                content.removeEventListener('scroll', onScroll);
            };
        }

    }, []);

    return (
        <CSSTransition
            in={scroll}
            timeout={500}
            classNames="bg-transition"
        >
            <div className={`h-auto flex justify-content-between p-3 sticky top-0 z-1 ${scroll ? 'surface-900' : 'bg-black-alpha-90'}`}>

                <div className="flex">
                    <Button rounded className="mr-2 bg-black-alpha-90  border-transparent" icon="pi pi-chevron-left" />
                    <Button rounded className="bg-black-alpha-90 border-transparent" icon="pi pi-chevron-right" />
                </div>
                <div className="flex">
                    <Button label="S'inscrire" className={`mr-2 ${scroll ? 'surface-900' : 'bg-black-alpha-90'} border-transparent text-gray-400 hover:text-white`} />
                    <Button label="Se connecter" rounded className="w-7 text-center text-sm font-bold  bg-white-alpha-90 border-transparent text-900 hover:text-900" />
                </div>
            </div>
        </CSSTransition>
    );
}