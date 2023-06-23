import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import refreshAccessToken from "@/app/components/lib/spotify/refreshAccessToken"

const maxAttemps = 3;
const delayBetweenAttemps = 200;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET() {
    let { accessToken } = await getServerSession(authOptions)

    for (let attempt = 0; attempt < maxAttemps; attempt++) {
        try {
            const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (res.status === 401) {
                const refreshedToken = await refreshAccessToken(accessToken)
                accessToken = refreshedToken.accessToken
                throw new Error('Unauthorized, retrying with refreshed access token')
            }

            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}`);
            }

            const data = await res.json()

            // const recentlyPlayedTracks = data.items?.map(item => ({
            //     name: item?.track?.name,
            //     id: item?.track?.id,
            //     album: {
            //         name: item?.track?.album?.name,
            //         id: item?.track?.album?.id,
            //         image: item?.track?.album?.images[0]?.url,
            //         artist: item?.track?.artists[0]?.name,
            //     },
            // }))

            return NextResponse.json({ data })
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed with error: ${error.message}`);
            if (attempt < maxAttemps - 1) {
                await delay(delayBetweenAttemps);
            } else {
                return NextResponse.error({ message: 'Max attempts exceeded' })
            }
        }
    }
}
