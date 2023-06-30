"use client"
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react'
import { HomeContextProvider } from './HomeContextProvider';
import HomePage from './components/Home';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './styles/home.css'
import './globals.css'

export default function Home() {

  // Disabling right-click
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <SessionProvider>
      <HomeContextProvider>
        <div className='h-screen flex flex-column overflow-hidden disable-text-selection'>
          <HomePage />
        </div>
      </HomeContextProvider>
    </SessionProvider>
  );
}