"use client"
import Layout from "../Layout";
import UserRecentlyPlayed from "./UserRecentlyPlayed";
import Podcasts from "./NewReleases";
import TrendingTopItems from "./TrendPlaylists";
import { HomeContextProvider } from "../HomeContextProvider";
import { HomeContext } from "../HomeContextProvider";

export default function Home() {

    return (
        <HomeContextProvider>
            <Layout>
                <HomeContext.Consumer>
                    {({ isLoggedIn }) => (
                        <>
                            {isLoggedIn ? (
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
        </HomeContextProvider>

    );
}
