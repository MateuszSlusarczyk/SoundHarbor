"use client"
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Playlists from '../components/PlaylistsUser';
import UserDetails from '../components/UserDetails';
import Podcast from '../components/Podcasts';


function MainPage() {

  return (
    <div className='h-full w-full flex font-sans' >
    <div className='relative h-full w-full flex flex-col'>
      <div className = "relative w-full h-10 right-0">
      <Navbar />
      </div>
      <div className='h-2/3 w-full'>
      <p>Witaj Na głównej stronie! Kiedyś coś tu będzie</p>
      <p>Obiecuje.</p>
      </div>
    </div>
    </div>

  )
  
}
export default MainPage;