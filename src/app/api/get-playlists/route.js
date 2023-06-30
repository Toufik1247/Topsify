import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import refreshAccessToken from "@/app/components/lib/spotify/refreshAccessToken"

async function getUserId(accessToken) {
    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (res.status === 401) {
        const refreshedToken = await refreshAccessToken(accessToken)
        accessToken = refreshedToken.accessToken
        throw new Error('Unauthorized, retrying with refreshed access token')
    }

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.id;
}

export async function GET() {
    let { accessToken } = await getServerSession(authOptions)
    const userId = await getUserId(accessToken);

    try {
        const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.log('Error during creating playlist:', errorData);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.log('Caught error during creating playlist:', error);
    }
}


