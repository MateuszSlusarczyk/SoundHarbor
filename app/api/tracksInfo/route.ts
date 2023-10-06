import { getTracksInfo} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const trackIds:any = searchParams.get('trackIds');
  const trackIdWithoutLastMark = trackIds.slice(0, -1);
  const response = await getTracksInfo(session?.access_token, trackIdWithoutLastMark);
  const items = await response.json();
  console.log(items)
  return NextResponse.json(items);
};

