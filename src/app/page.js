"use client"
import './styles/home.scss'
import React from 'react';
import { createContext, useState, useEffect } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import HomePage from './components/Home';
import { getSession } from 'next-auth/react';
// import Player from './components/Player';
import { ProgressSpinner } from 'primereact/progressspinner';

export const HomeContext = createContext();

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function checkSession() {
      const session = await checkLoginStatus();
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    })();
  }, []);

  async function checkLoginStatus() {
    const session = await getSession();
    return session;
  }

  if (isLoading) {
    return (
      <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
        <ProgressSpinner className='' animationDuration=".7s" />
      </div>

    )

  }

  return (
    <HomeContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className='h-screen flex flex-column overflow-hidden'>
        <div style={{ height: '90%' }}>
          <HomePage />
        </div>
        {/* <div style={{ height: '10%', backgroundColor: "#000000" }}>
          <Player />
        </div> */}
      </div>
    </HomeContext.Provider>
  );
}
