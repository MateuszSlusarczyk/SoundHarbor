"use client"
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useState } from 'react';
export default function Playlist() {
  const {data:session}=useSession()
  const [list, setList] = useState([]);
  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlist');
    const {items} = await res.json();
    setList(items);
  };
  console.log(session)
  return (
      <div className='absolute top-10 z-0 h-screen p-4 w-5/6 right-0 '>
        <div className='h-1/4 w-full'>
      <button onClick={getMyPlaylists}>Pobierz playlisty</button>
      <p className='font-bold w-full flex justify-center'>Twoje Playlisty</p>
      <div className='flex flex-row h-full'> 
      {list.slice(0, 6).map((item: any) => (
        <div key={item.id} className='h-full w-1/6 flex flex-col items-center p-2 bg-primary rounded-md mr-2'>
          <div className='h-3/4 flex justify-center items-center'>
            <Image src={item.images[0]?.url} width="125" height="125" alt="playlista" className='rounded-md'/>
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold'>{item.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
  )
  
}
