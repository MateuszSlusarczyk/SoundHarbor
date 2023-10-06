import { getTrackInfo} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  const response = await getTrackInfo(session?.access_token, session?.trackId);
  const items = await response.json();
  return NextResponse.json(items);
};

