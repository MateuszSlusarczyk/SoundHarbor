import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
export default function PodcastInfo() {
  const {data:session, update}=useSession()
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState([]);
  const getPlaylistDetails = async () => {
    try {
      const res = await fetch('/api/playlistInfo');
      const playlistData = await res.json();
      setPlaylist(playlistData);
      
    } catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };
  
  const getPlaylistTracks = async () => {
    try {
      const res = await fetch('/api/playlistTrack');
      const trackData = await res.json();
      console.log("123");
      setTracks(trackData);
      
      console.log(trackData )
      
    }
    catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };
  const PassTrack = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      await update({trackId:e.currentTarget.getAttribute("data-value")})
      window.location.href = "/TrackInfo";
    }
    
  };
  useEffect(() => {
    getPlaylistDetails();
    getPlaylistTracks();
  }, []);

  if (!playlist || !tracks ) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );}


  
  return (
    <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
      <div className='width-full h-1/5 bg-primary rounded-md p-2 mb-4 flex'>
      <Image src={playlist?.images[0]?.url} width="125" height="125" alt="playlista" className='rounded-md h-36 mr-2' />
        <div className="flex flex-col">
        <p className='font-bold'>{playlist.name}</p>
        <p>{playlist.description}</p>
        </div>
      </div>
      <div className=' w-full h-4/6 p-1 bg-primary overflow-y-scroll rounded-md'>
      {tracks.map((item: any) => (
        <div key={item.track.name} className=' h-16 w-full flex flex-row items-center bg-senary rounded-md mb-1 mt-1' data-value={item.track.id} onClick={PassTrack}>
            <Image src={item.track.album.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
            <div className='flex flex-col'>
            <p className='font-bold'>{item.track.name}</p>
            <p>{item.track.artists[0].name}</p>
            </div>
        </div>
         ))}
      </div>
    </div>
  );


}
