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

    function ExpandMenu1() {
        setIsSubMenu1Open(!isSubMenu1Open);
        
    }
    function LogOut(){
        console.log(session)
        signOut();
        console.log(session)
        session=null;
        console.log(session)

    }
    return(
        <div className='absolute justify-end w-5/6 h-10 right-0'>
        <nav className="bg-primary w-full h-full font-bold">
            <ul className="flex justify-center items-center h-full ">
                <li className='w-3/12 flex h-full rounded-md justify-center items-center hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500 '>  <button>Strona Główna</button></li>
                <li className='w-3/12 flex h-full rounded-md hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500'><Link href="" className='flex w-full justify-center items-center'>Rekomendacje</Link></li>
                <li className='w-3/12 flex h-full rounded-md hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500'><Link href="" className='flex w-full justify-center items-center'>Playlisty</Link></li>
                <li className={`w-3/12 flex flex-col rounded-md justify-end items-center hover:bg-tertiary hover:shadow-lg hover:shadow-tertiary transition duration-500 ${isSubMenu1Open ? 'h-44 bg-tertiary ' : 'h-full'} `}>
                    <div className={`flex justify-center items-center ${isSubMenu1Open ? 'h-8' : 'h-full'}`}>
                    <Link href="" className=''>Konto</Link>
                    <button onClick={ExpandMenu1} className='w-auto'>
                            <Image src={Rozwin} alt="Rozwin" className={` ${isSubMenu1Open ? 'rotate-90' : ''}`} style={{ transition: 'all 1s' }}  />
                    </button>
                    </div>
                    <div className={` ${isSubMenu1Open ? 'flex flex-col' : 'hidden'} rounded-md justify-center items-center w-full relative z-10`} style={{ transition: 'all 0.5s' }}>
                            <button className='w-full  hover:bg-quaternary rounded-md transition-all duration-500' onClick={() => signIn("spotify", {scopes: "playlist-read-private"})}>Zaloguj Sie</button>
                            <button className='w-full   hover:bg-quaternary rounded-md transition-all duration-500' onClick={() => LogOut()}>Wyloguj Sie</button>
                            <button className='w-full   hover:bg-quaternary rounded-md transition-all duration-500'>Moje Dane</button>
                    </div>
                    </li>
            </ul>
        </nav>
        </div>
    )
}