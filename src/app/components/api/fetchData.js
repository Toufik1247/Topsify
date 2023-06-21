import { useEffect, useState } from 'react';
import axios from 'axios';
import getToken from './getToken';

const fetchData = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = 'spotifyAuthToken';
    const tokenTimeStamp = 'spotifyAuthTokenTimestamp';

    const fetchToken = async () => {
        const now = new Date().getTime();
        const storedTokenTimestamp = localStorage.getItem(tokenTimeStamp);

        if (storedTokenTimestamp && now - storedTokenTimestamp < 3600000) { // 3600000ms == 1hr
            return localStorage.getItem(token);
        }

        const fetchedToken = await getToken();
        localStorage.setItem(token, fetchedToken);
        localStorage.setItem(tokenTimeStamp, now);
        return fetchedToken;
    };

    const getData = async (token) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError(err);
            if (err.response && err.response.status === 401) {
                tryAgain();
            }
        }
    };

    const tryAgain = async () => {
        const newToken = await fetchToken();
        getData(newToken);
    }

    useEffect(() => {
        tryAgain();
    }, [url]);

    return { data, error, loading };
};

export default fetchData;
