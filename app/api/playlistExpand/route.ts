import { getRecommendationsTracks, addItemsToPlaylist } from '@/lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
      const session = await getServerSession(authOptions);
      const requestBody = await req.json(); // Parse the JSON request body
      const trackIds = requestBody.trackIds;
      console.log(trackIds);
      const response = await getRecommendationsTracks(session?.access_token, trackIds); // Pass the "name" field
      const items = await response.json();
      const tracks = items.tracks.map((item:any) => item.uri);
      const reponse2 = await addItemsToPlaylist(session?.access_token, session?.playlistId, tracks); // Pass the "name" field
      const items2 = await reponse2.json();
      
      return NextResponse.json(items2);
    
}
  