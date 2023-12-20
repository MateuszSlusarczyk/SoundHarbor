import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
export default function UserDetails() {
    const {data:session, update}=useSession()
    const [User, setUser] = useState<any>(null);
    const getUserInfo = async () => {
        try {
            const res = await fetch('/api/userInfo');
            const userData = await res.json();
            setUser(userData);
            if(userData){
            await update({userId:User.id})
            console.log(session)
            console.log(session?.userId)
            }
            else{
                console.log("brak usera")
            }
        }
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    if (!User) {
        return(
            <div className=" top-10 h-full w-full ">
                <p>Loading...</p>
            </div>
        )
    }
    else{
        console.log(session?.userId)
    return (
        
        <div className=" top-10 h-full w-full ">
            <div className="flex flex-row items-start justify-start h-full w-full p-2"> 
            <Image src={User.images[1]?.url} width="300" height="0" alt="playlista" className='rounded-md m-1 min-h-full min-w-1/6' />
            <div className='flex flex-col'>
            <p><span className='font-bold'>Login:</span> {User.display_name}</p>
            <p><span className='font-bold'>Kraj:</span> {User.country}</p>
            <p><span className='font-bold'>Obserwujący:</span> {User.followers.total}</p>
            <p><span className='font-bold'>Plan:</span> {User.product}</p>
            </div>
            </div>
        </div>
    )
}}