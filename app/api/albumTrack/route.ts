import { getAlbumTracks} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';
import { MongoClient, MongoClientOptions } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
} as MongoClientOptions);
export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  const response = await getAlbumTracks(session?.access_token, session?.albumId);
  const items = await response.json();
  return NextResponse.json(items);
};

