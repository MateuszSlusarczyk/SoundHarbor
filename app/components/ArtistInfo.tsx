import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function ArtistInfo() {
  const { data: session, update } = useSession();
  const [artist, setArtist] = useState<any>(null);
  const [albums, setAlbums] = useState<any>([]);
  const [tracks, setTracks] = useState<any>([]);
  const [relArtists, setRelArtists] = useState<any>(null);
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
  const PassArtist = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      await update({artistId:e.currentTarget.getAttribute("data-value")})
      window.location.href = "/ArtistInfo";
      
    }
    
  };
  const PassAlbum = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      await update({albumId:e.currentTarget.getAttribute("data-value")})
      window.location.href = "/AlbumInfo";
    }
    
  };
  const getArtistInfo = async () => {
    try {
      const res = await fetch('/api/artistInfo');
      const artistData = await res.json();
      setArtist(artistData);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  const getArtistAlbums = async () => {
    try {
      const res = await fetch('/api/artistAlbums');
      const albumList = await res.json();
      setAlbums(albumList.items);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  const getArtistTracks = async () => {
    try {
      const res = await fetch('/api/artistTracks');
      const trackList = await res.json();
      setTracks(trackList.tracks);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  const getRelatedArtists = async () => {
    try {
      const res = await fetch('/api/relatedArtists');
      const relArtists = await res.json();
      setRelArtists(relArtists.artists);
      console.log(relArtists.artists)
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  useEffect(() => {
    getArtistInfo();
    getArtistAlbums();
    getArtistTracks();
    getRelatedArtists();
  }, []);

  if (!artist || !albums || !tracks || !relArtists) {
    return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='absolute top-8 z-0 h-full p-4 w-full'>
      <div className='w-full h-full p-4 bg-primary rounded-md flex justify-center items-center'>
        <div key={artist.name} className='h-full w-full flex flex-col justify-center items-center bg-senary rounded-md p-2 mb-1 mt-1'>
          <div className='h-full w-full flex flex-col items-start justify-start'>
            <div className='flex flex-row items-start justify-start h-1/3 w-full '>
              <Image src={artist.images[0]?.url} width="300" height="300" alt="playlista" className='rounded-md m-1 h-full w-1/4 relative z-10' />
              <div className='flex flex-col min-h-1/2 h-full w-full'>
                <p className='font-bold'>Nazwa: {artist.name}</p>
                <p className=''>Liczba obserwujących: {artist.followers.total}</p>
                <p className='w-full flex justify-center font-semibold'>Najpopularniejsze utwory</p>
                <div className='flex flex-row h-4/5 w-full overflow-x-scroll '>
                {tracks.map((item: any) => (
                  <div className='overflow-x-scroll h-full min-w-1/6  flex flex-col items-center justify-start  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassTrack}>
                  <div className='h-3/4 w-full flex flex-row justify-center items-start'>
                    <Image src={item.album.images[0]?.url} width="500" height="500" alt="playlista" className='rounded-md h-full w-5/6' />
                  </div>
                  <div className='h-1/4 items-center justify-start'>
                    <p className='font-bold text-md'>{item.name}</p>
                  </div>
                </div>
                ))}
                </div>
              </div>
            </div>
            <div className='w-full h-1/3'>
              <p className='w-full flex justify-center font-semibold'>Albumy </p>
              <div className='flex flex-row h-5/6 w-full overflow-x-scroll '>
                {albums.map((item: any) => (
                  <div className='overflow-scroll h-full min-w-1/6  flex flex-col items-center justify-start  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassAlbum}>
                    <div className='h-3/4 w-full flex flex-row justify-center items-start'>
                      <Image src={item.images[0]?.url} width="500" height="500" alt="playlista" className='rounded-md h-full w-5/6' />
                    </div>
                    <div className='h-1/4 items-center justify-start'>
                      <p className='font-bold text-md'>{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
      <p className='w-full flex justify-center font-semibold m-0'>Podobni artyści</p>
                <div className='flex flex-row h-1/3 w-full overflow-x-scroll '>
                {relArtists.map((item: any) => (
                  <div className='overflow-x-scroll h-full min-w-1/6  flex flex-col items-center justify-start  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassArtist}>
                  <div className='h-3/4 w-full flex flex-row justify-center items-start'>
                    <Image src={item.images[0]?.url} width="500" height="500" alt="playlista" className='rounded-md h-full w-5/6' />
                  </div>
                  <div className='h-1/4 items-center justify-start'>
                    <p className='font-bold text-md'>{item.name}</p>
                  </div>
                </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
  );
}
