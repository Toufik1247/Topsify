"use client"
import Layout from "../Layout";
import UserRecentlyPlayed from "./UserRecentlyPlayed";
import Podcasts from "./NewReleases";
import TrendingTopItems from "./TrendPlaylists";
import { HomeContext } from "../HomeContextProvider";
import { useSession } from "next-auth/react";
import { SessionProvider } from 'next-auth/react'

export default function HomePage() {
    const { session } = useSession();
    const loadingStatus = false

    return (
        <SessionProvider session={session}>
            <Layout isLoading={loadingStatus}>
                <HomeContext.Consumer>
                    {({ userIsLoggedIn }) => (
                        <>
                            {userIsLoggedIn ? (
                                <>
                                    <UserRecentlyPlayed />
                                    <Podcasts />
                                    <TrendingTopItems />
                                </>
                            ) : (
                                <>
                                    <Podcasts />
                                    <TrendingTopItems />
                                </>
                            )}
                        </>
                    )}
                </HomeContext.Consumer>
            </Layout>
        </SessionProvider >
    );
}
