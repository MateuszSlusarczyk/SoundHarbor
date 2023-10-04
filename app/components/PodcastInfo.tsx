import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
export default function PlaylistInfo() {
  const {data:session, update}=useSession()
  const [Podcast, setPodcast] = useState<any>(null);
  const [Episodes, setEpisodes] = useState([]);
  const getPodcastDetails = async () => {
    try {
      const res = await fetch('/api/podcastInfo');
      const podcastData = await res.json();
      setPodcast(podcastData);
      
    } catch (error) {
      console.error('Error fetching podcast details:', error);
    }
  };
  
  const getPodcastEpisodes = async () => {
    try {
      const res = await fetch('/api/podcastEpisode');
      const episodeData = await res.json();
      console.log("123");
      setEpisodes(episodeData);
      
      console.log(episodeData )
      
    }
    catch (error) {
      console.error('Error fetching episodes details:', error);
    }
  };
  const PassEpisode = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do Odcinka")
    }
    else
    {  
      await update({episodeId:e.currentTarget.getAttribute("data-value")})
      window.location.href = "/EpisodeInfo";
    }
    
  };
  useEffect(() => {
    getPodcastDetails();
    getPodcastEpisodes();
  }, []);

  if (!Podcast) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );
  }

  
  return (
    <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
      <div className='width-full h-1/5 bg-primary rounded-md p-2 mb-4 flex'>
        <Image src={Podcast?.images[0]?.url} width="125" height="125" alt="playlista" className='rounded-md h-36 mr-2 relative z-10' />
        <Image src={Podcast?.images[0]?.url} width="145" height="145" alt="playlista" className='rounded-md h-36 mr-2 absolute z-0 blur-md' />
        <div className="flex flex-col">
        <p className='font-bold'>{Podcast.name}</p>
        <p className='overflow-y-scroll'>{Podcast.description}</p>
        </div>
      </div>
      <div className=' w-full h-4/6 p-1 bg-primary overflow-y-scroll rounded-md'>
      {Episodes.map((item: any) => (
        <div key={item.id} className=' h-16 w-full flex flex-row items-center bg-senary rounded-md mb-1 mt-1' data-value={item.id} onClick={PassEpisode}>
            <Image src={item.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
            <div className='flex flex-col'>
            <p className='font-bold'>{item.name}</p>
            <p>{Podcast.publisher}</p>
            </div>
        </div>
         ))}
      </div>
    </div>
  );


}
