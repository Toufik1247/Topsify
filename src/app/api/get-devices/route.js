import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
    const { accessToken } = await getServerSession(authOptions)
    const res = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    })
    const data = await res.json()

    return NextResponse.json({ data })
}