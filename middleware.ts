import { getServerSession } from "next-auth/next"
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
export default withAuth(
    function middleware(request: NextRequestWithAuth) {
    if (request.nextauth.token?.access_token){
        console.log("halo")
        return NextResponse.redirect(new URL('/MainPage', request.url))}
})


export const config = {
  matcher: ["/MainPage", "/AlbumInfo", "/EpisodeInfo", "/PlaylistInfo", "/Playlists", "/PodcastInfo", "/Podstawowe", "/TrackInfo", "/UserPage", "/Zaawansowane"],
}
