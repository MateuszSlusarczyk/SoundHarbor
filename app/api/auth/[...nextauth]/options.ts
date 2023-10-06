import { NextAuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";


export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private, user-follow-read, user-read-recently-played, user-library-read, user-library-modify, user-read-private, playlist-modify-public, playlist-modify-private, user-top-read, user-follow-read',
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        }),
    ],
    session: {
      maxAge:60*59
    },
    secret: process.env.SECRET!,
    callbacks: {
        async jwt({ token, account, user, trigger, session  }) {
          if(trigger=== "update" && session.playlistId){
            console.log("serwer playlist")
            token.playlistId = session.playlistId
            return token
          }
          else if(trigger=== "update" && session.trackId){
            console.log("serwer track")
            token.trackId = session.trackId
            return token
          }
          else if(trigger=== "update" && session.podcastId){
            console.log("serwer podcast")

            token.podcastId = session.podcastId
            return token
          }
          else if(trigger=== "update" && session.episodeId){
            console.log("serwer episode")
            token.episodeId = session.episodeId
            return token
          }
          else if(trigger=== "update" && session.userId ){

            token.userId = session.userId
            console.log("serwer user")
            return token
          }
          else if (trigger ==="update" && session.artistId){
            token.artistId = session.artistId
            console.log("serwer artist")
            return token
          }
          else if (trigger ==="update" && session.albumId){
            token.albumId = session.albumId
            console.log("serwer album")
            return token
          }
          if (account) {
            console.log("serwer account")
            token.accessToken = account.access_token
            token.userId = user.id
          }
          return token
        },
        async session({session, token, user}) {
          session.user = user;
          session.access_token = token.accessToken
          session.playlistId = token.playlistId
          session.trackId = token.trackId
          session.podcastId = token.podcastId
          session.episodeId = token.episodeId
          session.userId = token.userId
          session.artistId = token.artistId
          session.albumId = token.albumId
          return session;
        },
      },
};