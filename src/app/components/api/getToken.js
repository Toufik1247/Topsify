import axios from 'axios';

const getToken = async () => {
  try {
    const URL = 'https://accounts.spotify.com/api/token'
    const response = await axios.post(URL,
      new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        'client_secret': process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      }),
      {
        headers:
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
    const authToken = response.data.access_token;
    return authToken;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};

export default getToken;