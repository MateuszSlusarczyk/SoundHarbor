"use client"
import Navbar from '../components/Navbar'
import Playlists from '../components/PlaylistsUser';
import UserDetails from '../components/UserDetails';
import Podcast from '../components/Podcasts';
import NotAvailable from '../components/NotAvailable';
import { useState } from 'react';


function MainPage() {
  const [showError, setShowError] = useState(false);

  return (
    <div className='h-full w-full flex font-sans' >
    <div className='relative h-full w-full flex flex-col'>
      <div className = "relative w-full h-10 right-0">
      <Navbar />
      </div>
      <div className='h-1/3 w-full'>
      <UserDetails/>
      </div>
      <div className='h-2/3 w-full'>
      <Playlists/>
      <Podcast/>
      </div>
    </div>
    </div>

  )
  
}
export default MainPage;