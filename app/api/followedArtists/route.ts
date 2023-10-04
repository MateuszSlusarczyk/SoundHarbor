import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import {  getUserFollowedArtists } from '../../../lib/spotify';

export async function GET(req: any, res: any) {
    try {
        const session = await getServerSession(authOptions);

        const response = await getUserFollowedArtists(session?.access_token);
        console.log(response)
        const result = await response.json();

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in GET API:", error);
        return NextResponse.error;
    }
}
