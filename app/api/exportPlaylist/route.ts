import { exportPlaylist } from '@/lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const requestBody = {
        playlistName:"Kozak",
        playlistDescription:"test",
    }; 
    const response = await exportPlaylist(session?.access_token, session?.userId, requestBody);
    const items = await response.json();
    return NextResponse.json({items});
  
}
