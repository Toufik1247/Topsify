"use client"
import { useEffect, useState, useContext } from 'react';
import { signIn, signOut } from "next-auth/react"
import { CSSTransition } from 'react-transition-group';
import { Button } from 'primereact/button';
import { HomeContext } from '../HomeContextProvider';

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
            classNames="bgTransition"
        >
            <div className={`h-auto flex justify-content-between p-3 sticky top-0 z-1 ${scroll ? 'bgSecond' : 'bg-black-alpha-90'}`}>
                <div className="flex">
                    <HomeContext.Consumer>
                        {({ userIsLoggedIn }) => (
                            <>
                                {userIsLoggedIn ? (
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
