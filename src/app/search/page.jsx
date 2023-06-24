"use client"
import Layout from '../Layout';
import { HomeContextProvider } from '../HomeContextProvider';


// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';

export default function Search() {
    return (
        <HomeContextProvider>
            <Layout>
                <div className='flex align-items-center justify-content-center h-screen'>
                    <h1 className='text-white'>Hello from search page !</h1>
                </div>
            </Layout>
        </HomeContextProvider>
    );
}
