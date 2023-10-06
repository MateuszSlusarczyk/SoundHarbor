"use client"
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Rozwin from '../../public/Rozwin1.png'

export default function Menu() {
    const [isSubMenu1Open, setIsSubMenu1Open] = useState(false);

    function ExpandMenu1() {
        setIsSubMenu1Open(!isSubMenu1Open);
        
    }

    const [isSubMenu2Open, setIsSubMenu2Open] = useState(false);

    function ExpandMenu2() {
        setIsSubMenu2Open(!isSubMenu2Open);
    }
    return (
        <div className=' w-full h-screen bg-primary p-5' >
            <div className='h-5' />
            <nav className="w-full h-full font-bold ">
                <ul className='text-lg w-full h-full flex flex-col justify-evenly bg-senary rounded-md p-2 '>
                <li className='flex flex-col transition-all duration-500 rounded-md'>
                    <p className='flex flex-row items-center rounded-md hover:bg-tertiary transition-all duration-500'>
                        Znajdź coś nowego
                        <button onClick={ExpandMenu1} >
                            <Image src={Rozwin} alt="Rozwin" className={` ${isSubMenu1Open ? 'rotate-90' : ''}`} style={{ transition: 'transform 0.5s' }} />
                        </button>
                    </p>
                    
                    <ul className={`text-md w-full p-1 break-words  ${isSubMenu1Open ? 'h-auto' : 'h-0'} ${isSubMenu1Open ? 'opacity-100' : 'opacity-0'} pl-2 p-0 overflow-hidden`} style={{ transition: 'all 1s'}}>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Moje rekomendacje</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md' >Ślepy Traf</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Podstawowe Filtry</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Zaawansowane Filtry</li>
                    </ul>
                </li>
                <li className='flex flex-col transition-all duration-500 rounded-md'>
                    <p className='flex flex-row items-center rounded-md hover:bg-tertiary transition-all duration-500'>
                        Znajdź coś nowego
                        <button onClick={ExpandMenu2} >
                            <Image src={Rozwin} alt="Rozwin" className={`${isSubMenu2Open ? 'rotate-90' : ''}`} style={{ transition: 'transform 0.5s' }} />
                        </button>
                    </p>
                    
                    <ul className={`text-md w-full p-1 break-words  ${isSubMenu2Open ? 'h-auto' : 'h-0'} ${isSubMenu2Open ? 'opacity-100' : 'opacity-0'} pl-2 p-0 overflow-hidden`}style={{ transition: 'all 1s'}}>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Moje rekomendacje</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md' >Ślepy Traf</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Podstawowe Filtry</li>
                            <li className='hover:bg-tertiary transition-all duration-500 rounded-md'>Zaawansowane Filtry</li>
                    </ul>
                </li>
                </ul>
            </nav>
        </div>
    )
}
