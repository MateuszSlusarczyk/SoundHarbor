"use client"
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useState } from 'react'; 
import { useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';
export default function Playlist() {
  const {data:session, update}=useSession()
  const [list, setList] = useState([]);
  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlist');
    const {items} = await res.json();
    setList(items);
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
  useEffect(() => {
    getMyPlaylists();
  }, []);
  return (
      <div className='z-0 h-1/3 p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoje Playlisty</p>
      <div className='flex flex-row h-full overflow-x-scroll '> 
      {list.map((item: any) => (
        <div key={item.id} className='overflow-scroll h-full min-w-1/6 flex flex-col items-center  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500' data-value={item.id} onClick={PassPlaylist}>
          <div className='h-3/4 flex justify-center items-center'>
            <Image src={item.images[0]?.url} width="100" height="100" alt="playlista" className='rounded-md' />
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
  )
  
}
