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

export async function POST(request) {
    let { accessToken } = await getServerSession(authOptions)
    const userId = await getUserId(accessToken);

    const req = new Request(request);
    const body = await req.json();

    try {
        const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.log('Error during creating playlist:', errorData);
            throw new Error(`API request failed with status ${res.status}`);
        }

        return NextResponse.json(res);
    } catch (error) {
        console.log('Caught error during creating playlist:', error);
    }
}

