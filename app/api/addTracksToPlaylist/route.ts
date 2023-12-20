import { addItemsToPlaylist, } from '@/lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"

export async function POST(req: Request) {
      const session = await getServerSession(authOptions);
      const requestBody = await req.json(); 
      const {playlistId, trackIds } = requestBody;
  
      const response = await addItemsToPlaylist(session?.access_token, playlistId, trackIds); 
      const items = await response.json();
      console.log(items);
      return items;
    
}
  