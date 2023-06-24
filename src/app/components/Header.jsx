"use client"
import { useState, useEffect } from 'react';
import { signIn, signOut } from "next-auth/react"
import { CSSTransition } from 'react-transition-group';
import { Button } from 'primereact/button';
import { HomeContext } from '../HomeContextProvider';
import { usePathname } from "next/navigation";
import { InputText } from 'primereact/inputtext';


export default function Header() {

    const [pathName, setPathName] = useState('');
    const [value, setValue] = useState('');

    console.log(value)

    const actualPath = usePathname()
    useEffect(() => {
        setPathName(actualPath)
    }, [pathName]);


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
            <div className={`h-auto flex justify-content-between p-3 sticky top-0 z-1 ${scroll ? 'bgSecond' : 'bg-black-alpha-90'}`}>
                <div className="flex lg:w-25rem md:w-20rem">
                    <Button rounded className="mr-2 bg-black-alpha-90  border-transparent" icon="pi pi-chevron-left" />
                    <Button rounded className="bg-black-alpha-90 border-transparent" icon="pi pi-chevron-right" />
                    {pathName === '/search' ?
                        <>
                            <span className="p-input-icon-left w-full text-white">
                                <i className="pi pi-search w-1 text-white" />
                                <InputText
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Que souhaitez-vous écouter ?"
                                    className='w-full p-inputtext-lg font-bold text-sm text-white bgThird border-transparent border-round-3xl' />
                            </span>
                        </>
                        :
                        <>
                        </>}
                </div>
                <div className="flex">
                    <HomeContext.Consumer>
                        {({ isLoggedIn }) => (
                            <>
                                {isLoggedIn ? (
                                    <Button
                                        onClick={() => signOut("spotify")}
                                        label="Se déconnecter"
                                        rounded
                                        className="text-center text-sm font-bold bg-white-alpha-90 border-transparent text-900 hover:text-900"
                                    />
                                ) : (
                                    <>
                                        <Button
                                            label="S'inscrire"
                                            className={`mr-2 ${scroll ? 'surface-900' : 'bg-black-alpha-90'} border-transparent text-gray-400 hover:text-white`}
                                        />
                                        <Button
                                            onClick={() => signIn("spotify")}
                                            label="Se connecter"
                                            rounded
                                            className="w-7 text-center text-sm font-bold bg-white-alpha-90 border-transparent text-900 hover:text-900"
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </HomeContext.Consumer>

                </div>
            </div>
        </CSSTransition>

    );
}
