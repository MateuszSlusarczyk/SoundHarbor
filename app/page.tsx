"use client"
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Playlist from './components/Playlist';
import { useSession } from "next-auth/react";
import Image from 'next/image'
import { useState } from 'react';
export default function Home() {
  const {data:session}=useSession()
  const [list, setList] = useState([]);
  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlist');
    const {items} = await res.json();
    setList(items);
  };
  console.log(session)
  return (
    <div className='h-full w-full flex flex-col' >
      <Navbar />
      <Menu />
      <Playlist />
    </div>

  )
  
}
