import {getGenreSeeds, getPlaylistInfo} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const response = await getGenreSeeds(session?.access_token);
  const items = await response.json();

  return NextResponse.json(items);
};

