import { DefaultSession, DefaultUser } from "next-auth";
// common interface for JWT and Session
interface IUser extends DefaultUser {
    access_token: any
    & DefaultSession["user"];
  }
declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user:User
        access_token: any
        playlistId: any
        trackId: any
        podcastId: any
        episodeId: any
        userId: any
      }
      
    
}