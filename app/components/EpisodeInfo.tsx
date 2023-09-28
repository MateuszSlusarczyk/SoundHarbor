import Image from 'next/image';
import { useState, useEffect } from 'react';
export default function TrackInfo() {
  const [episode, setEpisode] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const getEpisodeData = async () => {
    try {
      const res = await fetch('/api/episodeData');
      const trackData = await res.json();
      setEpisode(trackData);
      setDuration((trackData.duration_ms/60000).toFixed(2) + " minut")
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };
 
  useEffect(() => {
    getEpisodeData();
  }, []);

  if (!episode) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );
  }
  
  
  return (
    <div className='absolute top-10 z-0 h-full p-4 w-5/6'>
      <div className=' w-full h-5/6 p-4 bg-primary overflow-y-scroll rounded-md flex justify-center items-center'>
        <div key={episode.name} className=' h-full w-full flex flex-col items-start bg-senary rounded-md p-2 mb-1 mt-1'>
            <div className='flex flex-row items-start justify-center h-full  w-full'>
            <Image src={episode.images[0]?.url} width="300" height="0" alt="playlista" className='rounded-md m-1 min-h-1/3 max-h-1/3 w-1/5' />
            <div className='flex flex-col min-h-1/2 h-1/2'>
            <p className='font-bold'>Tytuł: {episode.name}</p>
            <p><span className='font-bold'>Opis:</span> {episode.description}</p>
            <p><span className='font-bold'>Czas trwania:</span> {duration}</p>
            <p><span className='font-bold'>Podgląd</span> {episode.audio_preview_url}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );


}
