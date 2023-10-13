
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/options';
import { getRecommendationsGenre, getRecommendationsGenreBasic } from '@/lib/spotify';


export async function GET(req: any) { 
  const { searchParams } = new URL(req.url);
  if(!searchParams.get('danceability_min')){
    const genre:any = searchParams.get('genre');
    console.log("gatunek")
    console.log(genre)
    const session = await getServerSession(authOptions);
    const items = await getRecommendationsGenreBasic(session?.access_token, genre, );
    const response = await items.json();
    return NextResponse.json(response);
  }
  const danceability_min:any = searchParams.get('danceability_min')||0;
  const danceability_max:any = searchParams.get('danceability_max')||1;
  const energy_min:any = searchParams.get('energy_min')||0;
  const energy_max:any = searchParams.get('energy_max')||1;
  const loudness_min:any = searchParams.get('loudness_min')||-60;
  const loudness_max:any = searchParams.get('loudness_max')||0;
  const speechiness_min:any = searchParams.get('speechiness_min')||0;
  const speechiness_max:any = searchParams.get('speechiness_max')||1;
  const acousticness_min:any = searchParams.get('acousticness_min')||0;
  const acousticness_max:any = searchParams.get('acousticness_max')||1;
  const instrumentalness_min:any = searchParams.get('instrumentalness_min')||0;
  const instrumentalness_max:any = searchParams.get('instrumentalness_max')||1;
  const liveness_min:any = searchParams.get('liveness_min')||0;
  const liveness_max:any = searchParams.get('liveness_max')||1;
  const valence_min:any = searchParams.get('valence_min')||0;
  const valence_max:any = searchParams.get('valence_max')||1;
  const genre:any = searchParams.get('genre');

    const session = await getServerSession(authOptions);

    /*await mongoClient.connect()
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
    return NextResponse.json(response);*/
    const items = await getRecommendationsGenre(session?.access_token, genre, danceability_min, danceability_max, energy_min, energy_max, loudness_min, loudness_max, speechiness_min, speechiness_max, acousticness_min, acousticness_max, instrumentalness_min, instrumentalness_max, liveness_min, liveness_max, valence_min, valence_max);
    const response = await items.json();
    console.log(response)
    return NextResponse.json(response);
}
