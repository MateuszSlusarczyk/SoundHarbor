import { getPlaylistTracks, getTrackDetails} from '../../../lib/spotify';
import { authOptions } from '../auth/[...nextauth]/options'
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';
import { MongoClient, MongoClientOptions } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
} as MongoClientOptions);
export const GET = async (req:any, res:any) => {
  const session = await getServerSession(authOptions);
  console.log(session?.playlistId)
  const response = await getPlaylistTracks(session?.access_token, session?.playlistId);
  const {items} = await response.json();
  /*
  await mongoClient.connect();
  const db = mongoClient.db('Inżynierka');

  const collection = db.collection('Dane');
  const abc = collection.updateMany({}, {$rename: {"id": "track_id"}})
  console.log((await abc).modifiedCount)
  
  var checkExisting = null;
  for (var i=0; i<items.length; i++) {
      checkExisting = await collection.findOne({
      track_name: items[i].track.name,
      artists: items[i].track.artist});
  }
  console.log("sprawdzanie czy istnieje")
  console.log(checkExisting);
  if(checkExisting == null) {
    for(var i=0; i<items.length; i++){
    const track = await getTrackDetails(session?.access_token, items[i].track.id);
    const trackDetails = await track.json();
    await collection.insertOne({
      track_id: items[i].track.id,
      track_name: items[i].track.name,
      artists: items[i].track.artists,
      key: trackDetails.key,
      explicit: trackDetails.explicit,
      acousticness: trackDetails.acousticness,
      danceability: trackDetails.danceability,
      energy: trackDetails.energy,
      instrumentalness: trackDetails.instrumentalness,
      liveness: trackDetails.liveness,
      loudness: trackDetails.loudness,
      speechiness: trackDetails.speechiness,
      tempo: trackDetails.tempo,
    });
    }
  }
  else{
    console.log("istnieje")
  }
*/
  return NextResponse.json(items);
};

