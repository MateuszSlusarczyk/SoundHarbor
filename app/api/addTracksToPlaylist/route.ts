import { addItemsToPlaylist, } from '@/lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"

export async function POST(req: Request) {
      const session = await getServerSession(authOptions);
      const requestBody = await req.json(); // Parse the JSON request body
      const { name, playlistId, trackIds } = requestBody;
  
      const response = await addItemsToPlaylist(session?.access_token, playlistId, name, trackIds); // Pass the "name" field
      const items = await response.json();
      return items;
    
}
  