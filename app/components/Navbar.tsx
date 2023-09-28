'use client';
import { useState } from 'react';
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import Rozwin from '../../public/Rozwin1.png'
import { useSession } from "next-auth/react";
export default function Navbar(){
    var {data:session}=useSession()
    const [isSubMenu1Open, setIsSubMenu1Open] = useState(false);
    const [isSubMenu2Open, setIsSubMenu2Open] = useState(false);
    function ExpandMenu1() {
        setIsSubMenu1Open(!isSubMenu1Open);
        
    }
    function ExpandMenu2() {
        setIsSubMenu2Open(!isSubMenu2Open);
        
    }
    function LogOut(){
        signOut();

    }
    return(
        <div className='flex w-full h-full justify-end right-0'>
        <nav className="bg-primary w-full h-full font-bold">
            <ul className="flex justify-center items-center h-full ">
                <li className='w-3/12 flex h-full rounded-md justify-center items-center hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500 '>  <Link href="/MainPage" className='flex w-full justify-center items-center'>Strona Główna</Link></li>
                <li className={`w-3/12 flex flex-col rounded-md justify-end items-center hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500 ${isSubMenu2Open ? 'h-44 bg-tertiary ' : 'h-full'} `}>
                <div className={`flex justify-center items-center ${isSubMenu2Open ? 'h-8' : 'h-full'}`}>
                    <Link href="/Rekomendacje" className='flex w-full justify-center items-center'>Rekomendacje</Link>
                    <button onClick={ExpandMenu2} className='w-auto'>
                            <Image src={Rozwin} alt="Rozwin" className={` ${isSubMenu2Open ? 'rotate-90' : ''}`} style={{ transition: 'all 1s' }}  />
                    </button>
                </div>
                <div className={` ${isSubMenu2Open ? 'flex flex-col' : 'hidden'} rounded-md justify-center items-center w-full relative z-10`} style={{ transition: 'all 0.5s' }}>
                            <Link href="/Podstawowe" className='w-full flex justify-center  hover:bg-quaternary rounded-md transition-all duration-500'>Podstawowe</Link>
                            <Link href="" className='w-full flex justify-center   hover:bg-quaternary rounded-md transition-all duration-500'>Średnio Zaawansowane</Link>
                            <Link href="/Zaawansowane" className='w-full flex justify-center  hover:bg-quaternary rounded-md transition-all duration-500'>Zaawansowane</Link>
                </div>
                </li>
                <li className='w-3/12 flex h-full rounded-md hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500'><Link href="" className='flex w-full justify-center items-center'>Playlisty</Link></li>
                <li className={`w-3/12 flex flex-col rounded-md justify-end items-center hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500 ${isSubMenu1Open ? 'h-44 bg-tertiary ' : 'h-full'} `}>
                    <div className={`flex justify-center items-center ${isSubMenu1Open ? 'h-8' : 'h-full'}`}>
                    <Link href="" className=''>Konto</Link>
                    <button onClick={ExpandMenu1} className='w-auto'>
                            <Image src={Rozwin} alt="Rozwin" className={` ${isSubMenu1Open ? 'rotate-90' : ''}`} style={{ transition: 'all 1s' }}  />
                    </button>
                    </div>
                    <div className={` ${isSubMenu1Open ? 'flex flex-col' : 'hidden'} rounded-md justify-center items-center w-full relative z-10`} style={{ transition: 'all 0.5s' }}>
                            <Link href="" className='w-full flex justify-center  hover:bg-quaternary rounded-md transition-all duration-500' onClick={() => signIn("spotify", {scopes: "playlist-read-private"})}>Zaloguj Sie</Link>
                            <Link href="" className='w-full flex justify-center   hover:bg-quaternary rounded-md transition-all duration-500' onClick={() => LogOut()}>Wyloguj Sie</Link>
                            <Link href="/UserPage" className='w-full flex justify-center  hover:bg-quaternary rounded-md transition-all duration-500'>Moje Dane</Link>
                    </div>
                    </li>
            </ul>
        </nav>
        </div>
    )
}