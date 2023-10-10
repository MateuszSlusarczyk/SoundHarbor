"use client"
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useState } from 'react'; 
import { useEffect } from 'react';
export default function Playlist() {
  const { data: session, update } = useSession();
  const [tracks, setTracks] = useState<any>([]); 
  const [artists, setArtists] = useState<any>([]);
  const [followedArtists, setFollowedArtists] = useState<any>([]);

  const getMyTopTracks = async (offset = "1") => {
    const apiUrl = new URL(`/api/topTracks?offset=${offset}`, window.location.origin);

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { items } = await res.json();
      if (!tracks) {
        setTracks(items);
      } else {
        setTracks([...tracks, ...items]); // Append new items to the existing 'tracks' array
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getMyTopArists = async (offset = "1") => {
    const apiUrl = new URL(`/api/topArtists?offset=${offset}`, window.location.origin);

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { items } = await res.json();     
      if (!artists) {
        setArtists(items);
      } else {
        setArtists([...artists, ...items]); // Append new items to the existing 'tracks' array
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const getMyFollowedArtists = async (offset = "1") => {
    const apiUrl = new URL(`/api/followedArtists?offset=${offset}`, window.location.origin);

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);
      
      const items = await res.json();
      if(!followedArtists){
        setFollowedArtists(items.artists.items);
      }
      else{
        setFollowedArtists([...followedArtists, ...items.artists.items]); // Append new items to the existing 'tracks' array
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  const PassTrack = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      var trackId = e.currentTarget.getAttribute("data-value")
      await update({trackId:trackId})
      window.location.href = "/TrackInfo";
  

    }
     
  }
 
  const PassArtist = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      var artistID = e.currentTarget.getAttribute("data-value")
      await update({artistId:artistID})
      window.location.href = "/ArtistInfo";
  

    }
     
  }
  const scrollEffect = (e: React.UIEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    var scrollLeft = div.scrollLeft;
    var scrollWidth = div.scrollWidth;
    const clientWidth = div.clientWidth;
    
    const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
  
    if (scrollPercentage === 100) {
     console.log("scroll")
    console.log(tracks.length)
      getMyTopTracks((tracks.length + 1).toString());
    }
  };
  
  useEffect(() => {
    getMyFollowedArtists();
    getMyTopTracks();
    getMyTopArists();
 

    
  }, []);
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <div className='z-0 h-1/3 w-full p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoje ulubione piosenki</p>
      <div className='flex flex-row h-full overflow-x-scroll '> 
      {tracks.map((item: any) => (
        <div className='overflow-scroll h-full min-w-1/6 flex flex-col items-center  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassTrack}>
          <div className='h-3/4 md:w-1/2 sm:w-full flex justify-center items-center'>
            <Image src={item.album.images[0]?.url} width="100" height="100" alt="playlista" className='rounded-md h-3/4 w-full' />
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
      <div className='z-0 h-1/3 w-full p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoi ulubieni artyści</p>
      <div className='flex flex-row h-full overflow-x-scroll '> 
      {artists.map((item: any) => (
        <div className='overflow-scroll h-full min-w-1/6 flex flex-col items-center  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassArtist}>
          <div className='h-3/4 md:w-1/2 sm:w-full flex justify-center items-center'>
            <Image src={item.images[0]?.url} width="100" height="100" alt="playlista" className='rounded-md h-3/4 w-full' />
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
      <div className='z-0 h-1/3 w-full p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoi obserwowani artyści</p>
      <div className='flex flex-row h-full overflow-x-scroll '> 
      {followedArtists.map((item: any) => (
        <div className='overflow-scroll h-full min-w-1/6 flex flex-col items-center  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassArtist}>
          <div className='h-3/4 md:w-1/2 sm:w-full flex justify-center items-center'>
            <Image src={item.images[0]?.url} width="100" height="100" alt="playlista" className='rounded-md h-3/4 w-full' />
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
      </div>
  )
  
}
