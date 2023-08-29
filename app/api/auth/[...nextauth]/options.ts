import { NextAuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";


export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private, user-follow-read, user-read-recently-played, user-library-read, user-library-modify, user-read-private',
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,

        }),
    ],
    secret: process.env.SECRET!,
    callbacks: {
        async jwt({ token, account, user }) {
          if (account) {
            token.accessToken = account.access_token
            token.id = user.id
          }
          return token
        },
        async session({session, token, user}) {
          session.user = user;
          session.access_token = token.accessToken
          return session;
        },
      },
};