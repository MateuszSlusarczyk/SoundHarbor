"use client"
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useState } from 'react'; 
import { useEffect } from 'react';
export default function Playlist() {
  const { data: session, update } = useSession();
  const [tracks, setTracks] = useState<any>([]); 

  const getMyPlaylists = async (offset = "1") => {
    const apiUrl = new URL(`/api/playlist?offset=${offset}`, window.location.origin);

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { items } = await res.json();

      const filteredItems = items.filter((item: any) => item !== null);

      console.log(filteredItems);
      // items.forEach((item: any) => {
      //   if (item.id) {
      //     item.images.push({ url: "/no-image.png" });
      //   }
      // });
      if (!tracks) {
        setTracks(filteredItems);
      } else {
        setTracks([...tracks, ...filteredItems]);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const PassPlaylist = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      var playlistID = e.currentTarget.getAttribute("data-value")
      await update({playlistId:playlistID})
      window.location.href = "/PlaylistInfo";
  

    }
     
  }
  const scrollEffect = (e: React.UIEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    var scrollLeft = div.scrollLeft;
    var scrollWidth = div.scrollWidth;
    const clientWidth = div.clientWidth;
    
    const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
  
    if (scrollPercentage === 100) {
      getMyPlaylists((tracks.length + 1).toString());
      

    }
  };
  
  useEffect(() => {
    getMyPlaylists();
    

    
  }, []);
  return (
    
      <div className='z-0 h-1/3 p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoje Playlisty</p>
      <div onScroll={scrollEffect}className='flex flex-row h-full overflow-x-scroll '> 
      {tracks ? 
  (tracks.length !== 0 ?  (
    <>
      {tracks.map((item: any, index:number  ) => (
        <div
        className='overflow-scroll h-full min-w-1/3 md:min-w-1/6 flex flex-col items-center bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0% to-primary to-30% transition-all duration-500'
        data-value={item?.id || `playlist-${index}`} // Fallback if id is missing
        onClick={PassPlaylist}
        key={item?.id || `playlist-${index}`} // Fallback for key
      >
          <div className='h-3/4 flex justify-center items-center'>
            {item?.images && item?.images[0] ? (
              <Image src={item.images[0].url} width="100" height="100" alt="playlista" className='rounded-md' />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-300 rounded-md flex items-center justify-center">
                <p>Brak Okładki</p>
              </div>
            )}
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item?.name}</p>
          </div>
        </div>
      ))}
    </>
  ) : (
    <p>Ładowanie...</p>
  )) : (
    <p>Brak playlist</p>
  )}

      </div>
      </div>
      </div>
  )
  
}
