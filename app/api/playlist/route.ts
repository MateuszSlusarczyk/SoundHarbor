import {getUsersPlaylists} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get('offset');
  console.log(offset);
  if(offset === null){
    return NextResponse.json({items: []});
  }
  const response = await getUsersPlaylists(session?.access_token, offset);
  const {items} = await response.json();
  

  return NextResponse.json({items});
};

