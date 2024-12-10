"use client"
import Image from 'next/image'
import { useState } from 'react'; 
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
export default function Podcast() {
const {data:session, update}=useSession()
  const [list, setList] = useState([]);
  const getmyPodcasts = async () => {
    const res = await fetch('/api/podcast');
    const {items} = await res.json();
    setList(items);
  };
  useEffect(() => {
    getmyPodcasts();
  }, []);
  const PassPodcast = async (e:any) => {
    if(session===null){
      throw new Error("Błąd dostępu do playlisty")
    }
    else
    {  
      await update({podcastId:e.currentTarget.getAttribute("data-value")})
      window.location.href = "/PodcastInfo";
    }
    
  }
  return (
      <div className='z-0 h-1/3 p-4  right-0 '>
      <div className='h-full w-full'>
      <p className='font-bold w-full flex justify-center'>Twoje Podcasty</p>
      <div className='flex flex-row h-full overflow-x-scroll '> 
      {list.map((item: any) => (
        <div key={item.show.id} className='overflow-scroll h-full min-w-1/3 md:min-w-1/6 flex flex-col items-center  bg-primary no-scrollbar p-1 pb-2 rounded-md mr-2 hover:bg-gradient-to-t from-quaternary from-0%  to-primary to-30% transition-all duration-500'data-value={item.show.id} onClick={PassPodcast}>
          <div className='h-3/4 flex justify-center items-center'>
            <Image src={item.show.images[0].url} width="100" height="100" alt="Podcast Okładka" className='rounded-md' />
          </div>
          <div className='h-1/4 items-center justify-center'>
            <p className='font-bold text-md'>{item.show.name}</p>
          </div>
        </div>
        ))}
      </div>
      </div>
      </div>
  )
  
}
