import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
export default function AlbumInfo() {
  const {data:session, update}=useSession()
  const [album, setAlbum] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [tracksDetails, setTracksDetails] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const getAlbumDetails = async () => {
    try {
      const res = await fetch('/api/albumInfo');
      const playlistData = await res.json();
      setAlbum(playlistData);
      
    } catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };
  
  const getAlbumTracks = async () => {
    try {
      const res = await fetch('/api/albumTrack');
      const trackData = await res.json();
      var trackIds = ""
        for(var i:number = 0; i < trackData.items.length; i++){
            trackIds = trackIds + trackData.items[i].id + ","
        }
        if(trackIds.length > 0){
          try{
          await update ({trackId:trackIds})
          const apiUrl = new URL(`/api/tracksInfo?trackIds=${trackIds}`, window.location.origin);
          const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const trackDetails = await res.json();
          console.log("abc")
          console.log(trackDetails)
          setTracksDetails(trackDetails.tracks);
          
          }
          catch (error) {
            console.error('Error fetching playlist details:', error);
          }
        }
      console.log(trackData.items )
      
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
}
  useEffect(() => {
    getAlbumDetails();
    getAlbumTracks();
  }, []);

  if (!album || !tracks ) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );}
  
  return (
    <div className='absolute top-10 z-0 h-screen p-4 w-full'>
      <div className='width-full h-1/5 bg-primary rounded-md p-2 mb-4 flex'>
      <Image src={album?.images[0]?.url} width="125" height="125" alt="playlista" className='rounded-md h-36 mr-6 relative z-10' />
      <Image src={album?.images[0]?.url} width="145" height="145" alt="playlista" className='rounded-md h-36 mr-6 absolute z-0 blur-md' />
        <div className="flex flex-col items-start w-1/3 ">
        <p className='font-bold text-center'>Tytuł: {album.name}</p>
        <p>Artysta: {album.artists[0].name}</p>
        <p>Typ: {album.album_type}</p>
        <p>{album.description}</p>
        </div>
      </div>
      <div className=' w-full h-4/6 p-1 bg-primary overflow-y-scroll rounded-md'>
        {tracksDetails.map((item: any) => (
        <div key={item.name} className=' h-16 w-full flex flex-row items-center bg-senary rounded-md mb-1 mt-1' data-value={item.id} onClick={PassTrack}>
        <Image src={item.album.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
            <div className='flex flex-col'>
            <p className='font-bold'>{item.name}</p>
            <p>{item.artists[0].name}</p>
            </div>
        </div>
            ))}
      </div>
    </div>
  );
}
