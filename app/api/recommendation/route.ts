import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/options';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
} as MongoClientOptions)

export async function POST(req: any) { // Use 'any' type for req if it's a serverless function
    const { danceability_min, danceability_max, energy_min, energy_max, loudness_min, loudness_max, speechiness_min, speechiness_max, acousticness_min, acousticness_max, instrumentalness_min, instrumentalness_max, liveness_min, liveness_max, valence_min, valence_max } = await req.json()
    
    await mongoClient.connect()
    const db = mongoClient.db('Inżynierka')
    const collection = db.collection('Dane')
    
    const items = await collection.find({
        danceability: { $gte: parseFloat(danceability_min), $lte: parseFloat(danceability_max) },
        energy: { $gte: parseFloat(energy_min), $lte: parseFloat(energy_max) },
        loudness: { $gte: parseFloat(loudness_min), $lte: parseFloat(loudness_max) },
        speechiness: { $gte: parseFloat(speechiness_min), $lte: parseFloat(speechiness_max) },
        acousticness: { $gte: parseFloat(acousticness_min), $lte: parseFloat(acousticness_max) },
        instrumentalness: { $gte: parseFloat(instrumentalness_min), $lte: parseFloat(instrumentalness_max) },
        liveness: { $gte: parseFloat(liveness_min), $lte: parseFloat(liveness_max) },
        valence: { $gte: parseFloat(valence_min), $lte: parseFloat(valence_max) },
        $expr: { $lt: [0.8, { $rand: {} }] }
    }).limit(20).toArray()

    mongoClient.close()
    const IDs = items.map((item: any) => item.id ? item.id : item.track_id)
    const session = await getServerSession(authOptions);
    console.log(session)
    // Construct the URL based on your deployment environment
    const apiUrl = new URL(`${process.env.NEXTAUTH_URL}/api/recommendationDetails`);
    // Add the trackIds query parameter to the URL
    apiUrl.searchParams.append("ids", IDs.join(","));
    apiUrl.searchParams.append("access_token", session?.access_token);
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      }
    });
    const response = await res.json();
    return NextResponse.json(response);
}
