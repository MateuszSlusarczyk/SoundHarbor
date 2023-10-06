import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import { getTracksDetails } from '../../../lib/spotify';

export async function GET(req: any, res: any) {
    try {
        // Access the trackIds query parameter from the URL
        const { searchParams } = new URL(req.url);
        const ids = searchParams.get('ids');
        const accessToken = searchParams.get('access_token');
        // Use the session to fetch track details

        console.log(accessToken)

        const response = await getTracksDetails(accessToken||'', ids || '');
        console.log(response)
        const result = await response.json();

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in GET API:", error);
        return NextResponse.error;
    }
}
