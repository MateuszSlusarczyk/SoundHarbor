import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { get } from 'http';
export default function TrackInfo() {
  const {data:session, update}=useSession()
  const [Track, setTrack] = useState<any>(null);
  const [Details, setDetails] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const getTrackInfo = async () => {
    try {
      const res = await fetch('/api/trackInfo');
      const trackData = await res.json();
      setTrack(trackData);
      
      setDuration((trackData.duration_ms/60000).toFixed(2) + " minuty")
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };
  const getTrackDetails = async () => {
    try {
      const res = await fetch('/api/trackDetails');
      const trackDetails = await res.json();
      setDetails(trackDetails);
      
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };
  useEffect(() => {
    getTrackInfo();
    getTrackDetails();
  }, []);

  if (!Track || !Details) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    
    <div className='absolute top-10 z-0 h-screen p-4 w-full'>
      <div className=' w-full h-4/6 p-4 bg-primary overflow-y-scroll rounded-md flex justify-center items-center'>
        <div key={Track.name} className=' h-full w-full flex flex-col justify-center items-center bg-senary rounded-md p-2 mb-1 mt-1'>
          <div className='h-full w-full flex flex-row items-center justify-center'>
            <div className='flex flex-row items-center justify-center h-full w-1/2 '>
            <Image src={Track.album.images[0]?.url} width="300" height="0" alt="playlista" className='rounded-md m-1 h-1/2 w-1/3 relative z-10' />
            <div className='flex flex-col min-h-1/2 h-1/2'>
            <p className='font-bold'>Tytuł: {Track.name}</p>
            <p>Autor: {Track.artists[0].name}</p>
            <p>Album: {Track.album.name}</p>
            <p>Data wydania: {Track.album.release_date}</p>
            <p>Czas trwania: {duration}</p>
            <p><span className='font-bold'>Link do Spotify:</span> <a href={Track.external_urls.spotify}>{Track.name}</a></p>
            </div>
            </div>
            </div>
            <div className='w-full h-1/4 flex flex-row'>
            <div className='h-full w-1/4 flex flex-col items-center justify-center'>
                <p className="font-bold">Akustyczność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.acousticness*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.acousticness}</p>
            </div>
            <div className='h-full w-1/4 flex flex-col items-center justify-center'>
                <p className="font-bold">Taneczność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.danceability*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.danceability}</p>
            </div>
            <div className='h-full w-1/4 flex flex-col items-center justify-center'>
                <p className="font-bold">Energiczność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.energy*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.energy}</p>
            </div>
            <div className='h-full w-1/4 flex flex-col items-center justify-center'>
                <p className="font-bold">Instrumentalność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.instrumentalness*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.instrumentalness}</p>
            </div>
            </div>
            <div className='w-full h-1/4 flex flex-row'>
            <div className='h-full w-1/3 flex flex-col items-center justify-center'>
                <p className="font-bold">Żywotność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.liveness*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.liveness}</p>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center justify-center'>
                <p className="font-bold">Wokalność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.speechiness*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.speechiness}</p>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center justify-center'>
                <p className="font-bold">Pozytywność</p>
                <div className='bg-primary  w-1/2 h-1/6 rounded-full'>
                    <div style={{width: Details.valence*100 + "%"}} className='bg-secondary h-full rounded-full' ></div>
                </div>
                <p>{Details.valence}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );


}
