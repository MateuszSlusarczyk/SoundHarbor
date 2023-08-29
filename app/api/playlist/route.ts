import {getUsersPlaylists} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';

export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);

  console.log("123");
  console.log(session?.access_token);
  const response = await getUsersPlaylists(session?.access_token);
  const {items} = await response.json();

  return NextResponse.json({items});
};

