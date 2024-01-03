import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
export default function PodcastInfo() {
  const {data:session, update}=useSession()
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [error, setError] = useState<any>(false);
  const [correct, setCorrect] = useState<any>(false);
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
  const ExpandPlaylist = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      var trackIds = ""
      var rand = 0
      for(var i:number = 0; i < 5; i++){
         rand = Math.floor(Math.random() * tracks.length)
         trackIds = trackIds + tracks[rand].track.id + ","
      }
      if(trackIds.length > 0){
        try{
        const res = await fetch('/api/playlistExpand', {
          method: "POST",
          body: JSON.stringify({
            trackIds: trackIds,
          }),
        });

        
        console.log(res)
        if(res.status === 500){
          setError(true);
          setCorrect(false);
        }
        else{
          setError(false);
          setCorrect(true);
        }
      }
      catch (error) {
        console.error('Error fetching playlist details:', error);
      }
      }
      
 
    }
    
  }
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
    <div className='absolute top-10 z-0 h-screen p-4 w-full'>
      <div className='w-full h-1/5 bg-primary rounded-md p-2 mb-4 flex'>
      <Image src={playlist?.images[0]?.url} width="125" height="125" alt="playlista" className='rounded-md h-36 mr-6 relative z-10' />
      <Image src={playlist?.images[0]?.url} width="145" height="145" alt="playlista" className='rounded-md h-36 mr-6 absolute z-0 blur-md' />
        <div className="flex flex-col items-start w-1/3 ">
        <p className='font-bold text-center '>{playlist.name}</p>
        <p>{playlist.description}</p>
        <button className='w-1/3 h-1/4 bg-secondary rounded-md font-bold text-sm hover:bg-tertiary hover:h-1/3 hover:mt-2 hover:text-base hover:w-1/2 transition-all duration-500' onClick={ExpandPlaylist}>Rozszerz playliste</button>
        {error !=false 
        ? <p className='font-bold'>Nie możesz rozszerzyć playlisty, której nie jesteś właścicielem.</p>
          : correct !=false 
          ? <p className='font-bold'>Poprawnie rozszerzono playliste</p>
          : <></>}  
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
