"use client"
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { signIn} from "next-auth/react"
import { useEffect, useState } from 'react';
function MainPage() {
  const [isPageActive, setIsPageActive] = useState(false);
  useEffect(() => {
    setIsPageActive(true);
  }, []);
  return (
    <div className='h-full w-full flex font-sans' >
    <div className='relative h-full w-full flex flex-col'>
      <div className = "relative w-full h-10 right-0">
      <Navbar />
      </div>
      <div className='flex flex-row h-full w-full'>
      <div className='h-full w-full p-4 flex flex-col md:flex-row items-center justify-start md:justify-center'>
      <Image src="/Logo2.png" alt="Logo SoundHarbor" width="600" height="600" className='md:h-full md:w-1/4 sm:h-full sm:w-1/2'/>
      <div className='flex flex-col md:w-1/5 sm:w-1/2 items-center text-lg'>
      <p className='md:text-4xl sm:text-xl '><span className=''>Sound</span><span className='text-secondary'>Harbor</span></p>
      <p className=''><span className=''>Sound</span><span className='text-secondary'>Harbor</span> to platforma, która dostarcza spersonalizowane rekomendacje podcastów i utworów muzycznych, idealnie dostosowanych do Twojego gustu. 
      <br/>
      Odkrywaj nowe dźwięki i ciesz się fascynującym światem treści audio z <span className=''>Sound</span><span className='text-secondary'>Harbor</span> już teraz!</p>
      <button className='w-1/3 bg-secondary rounded-md' onClick={() => signIn("spotify")} >Wypróbuj</button>
      </div>
      
      </div>
      </div>
      <div className='flex flex-col md:flex-row md:h-1/2 p-4 w-full items-start justify-center'>
      <div className='h-full w-full flex'>
      <div className={`h-3/4 w-1/2 md:p-4 flex flex-col items-center justify-start text-center mr-4 ${isPageActive ? 'translate-x-1/5 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000`}>
        <p className='text-2xl font-semibold text-secondary '>Znajdź nowe utwory</p>
        <p className='text-lg'>SoundHarbor to platforma która nie rekomenduje ci jedynie utworów na bazie twoich ogólnych upodobań - sam masz wpływ na rekomendację którą otrzymasz. Od gatunku po emocje jakie wywołuje piosenka, masz pełną kontrolę nad tym, czego szukasz.</p>
      </div>
      <div className={`h-3/4 w-1/2  md:p-4 flex flex-col items-center justify-start text-center mr-4 ${isPageActive ? 'translate-x-2/5 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000 delay-500`}>
        <p className='text-2xl font-semibold text-secondary'>Poznaj swoje preferencje</p>
        <p className='text-lg'>Dzięki SoundHarbor poznasz więcej informacji na temat swoich ulubionych artystów, piosenek i podcastów. Dzięki nim będziesz w stanie poznać swoje upodobania od podszewki, co pomoże ci łatwiej dobrać rekomendacje na teraz</p>
      </div>
      </div>

      <div className='h-full w-full flex'>
      <div className={`h-3/4 w-1/2 md:p-4 flex flex-col items-center justify-start text-center mr-4 ${isPageActive ? 'translate-x-3/5 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000 delay-1000`}>
        <p className='text-2xl font-semibold text-secondary'>Rozszerz playlisty</p>
        <p className='text-lg'>Soundharbor pozwala nie tylko na tworzenie nowych rekomendacji i playlist, a również na rozszerzenie tych, które już polubiłeś. Wybierz playliste, naciśnij odpowiedni przycisk a my zrobimy wszystko za ciebie. </p>
      
      </div>
      <div className={`h-3/4 w-1/2 md:p-4 flex flex-col items-center justify-start text-center mr-4 ${isPageActive ? 'translate-x-4/5 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000 delay-[1500ms]`}>
        <p className='text-2xl font-semibold text-secondary'>Stworzone przy użyciu Spotify</p>
        <p className='text-lg'>Soundharbor wykorzystuje twoje konto Spotify by rekomendować piosenki i podcasty, dzięki czemu nie musisz wypełniać żadnych formularzy z preferencjami. Wszystko co zobaczysz u nas znajduje się na Spotify, więc nie martw się o szukanie utworów na własną rękę. </p>
      </div>
      </div>
      </div>
    </div>
    </div>

  )
  
}
export default MainPage;