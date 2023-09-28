import { getEpisodeDetails} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  console.log(session?.episodeId)
  const response = await getEpisodeDetails(session?.access_token, session?.episodeId);
  const items = await response.json();
  

  return NextResponse.json(items);
};

