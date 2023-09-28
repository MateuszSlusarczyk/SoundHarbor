import { ChangeEvent, useState } from "react";
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Zaawansowane(){
  const {data:session, update}=useSession()
    const [formValues, setFormValues] = useState({
        danceability_min: "0",
        danceability_max: "1",
        energy_min: "0",
        energy_max: "1",
        loudness_min: "-60",
        loudness_max: "0",
        speechiness_min: "0",
        speechiness_max: "1",
        acousticness_min: "0",
        acousticness_max: "1",
        instrumentalness_min: "0",
        instrumentalness_max: "1",
        liveness_min: "0",
        liveness_max: "1",
        valence_min: "0",
        valence_max: "1",
       });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>("");
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisible5, setIsVisible5] = useState(false);
    const [isVisible6, setIsVisible6] = useState(false);

   
    const PassTrack = async (e:any) => {
      if(session===null){
        throw new Error("Błąd dostępu do playlisty")
      }
      else
      {  
        await update({trackId:e.currentTarget.getAttribute("data-value")})
        window.location.href = "/TrackInfo";
      }
      
    };
    const exportPlaylist = async (e:any) => {
      if(session===null){
        throw new Error("Błąd dostępu do playlisty")
      }
      else
      {  
          const res = await fetch("/api/exportPlaylist", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(""),
            });
            console.log(res);
            const abc = await res.json();
            if(res){
              
              const playlistId = abc.items.id;
              console.log("plaslist")
              console.log(abc)
              const trackIds = response.map((track: any) => 
              track.track_id ? "spotify:track:" + track.track_id : "spotify:track:" + track.id);
              const res2 = await fetch("/api/addTracksToPlaylist", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "Kozak", playlistId, trackIds }), // Include the "name" field
              });
            }
 
      }
  };
      const Recommend  = async (newFormValues:any) => {
        setLoading(true);
        setFormValues(newFormValues);
        try {
          const res = await fetch("/api/recommendation", {
            method: "POST",
            body: JSON.stringify(newFormValues),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setResponse(await res.json());
          setLoading(false);
          if (!res.ok) {
    
            return;
          }
    
        } catch (error: any) {
          setLoading(false);
        }
      }
    if(response){
      console.log("abc")
      console.log(response)
      return(
        <div className='absolute top-10 z-0 h-full p-4 w-5/6'>
         <div className=' w-full h-4/6 p-1 bg-primary overflow-y-scroll rounded-md'>
         {response.tracks.map((item: any) => (
          <div key={item.name} className=' h-16 w-full flex flex-row items-center bg-senary rounded-md mb-1 mt-1' data-value={item.id} onClick={PassTrack}>
 
              <Image src={item.album.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
              <div className='flex flex-col'>
              <p className='font-bold'>{item.name}</p>
              <p>{item.artists[0].name}</p>
              </div>
        </div>
         ))}
         <button onClick={exportPlaylist}>Zapisz</button>
      </div>
        </div>
    )
    }
    else{
      return(
        <div className='absolute top-10 z-0 h-full p-4 w-5/6 overflow-x-scroll'>
        <div className="flex flex-col justify-center items-center h-1/6 w-full">
          <p className="font-bold text-xl">Witaj, z chęcią polecimy ci jakąś playliste!</p>
          <p className="font-bold text-lg">Na co masz tym razem ochotę?</p>
        </div>
        <div className="h-4/6 w-full flex flex-col ">
            <div className="flex h-1/2 w-full flex-row mb-4">
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            <Image src="/Impreza.jpg" alt="Impreza" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" />
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Chce troche poimprezować!</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible1(true)} onMouseLeave={() => setIsVisible1(false)}>
            <Image src="/Chill.jpg" alt="Chill" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend({danceability_min: "0", danceability_max: "0.4", energy_min: "0", energy_max: "0.35", loudness_min: "-60", loudness_max: "0", speechiness_min: "0", speechiness_max: "0.45", acousticness_min: "0", acousticness_max: "0.7", instrumentalness_min: "0.2", instrumentalness_max: "1", liveness_min: "0", liveness_max: "0.3", valence_min: "0.4", valence_max: "1"})}/>
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible1 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Chce się zrelaksować</p>
          </div>
          <div className="relative h-full w-1/3 flex items-center" onMouseEnter={() => setIsVisible2(true)} onMouseLeave={() => setIsVisible2(false)}>
            <Image src="/Karaoke.jpg" alt="Karaoke" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" />
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible2 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Chce pośpiewać</p>
          </div>
          </div>
          <div className="flex h-1/2 w-full flex-row">
          <div className="relative h-full w-1/3 flex items-center mr-4" onMouseEnter={() => setIsVisible3(true)} onMouseLeave={() => setIsVisible3(false)}>
            <Image src="/Inspiration.jpg" alt="Inspiracja" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" />
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible3 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Potrzebuje inspiracji</p>
          </div>
          <div className="relative h-full w-1/3 flex items-center mr-4" onMouseEnter={() => setIsVisible4(true)} onMouseLeave={() => setIsVisible4(false)}>
            <Image src="/GoodMorning.jpg" alt="Inspiracja" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" />
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible4 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka na dobry poranek</p>
          </div>
          <div className="relative h-full w-1/3 flex items-center" onMouseEnter={() => setIsVisible5(true)} onMouseLeave={() => setIsVisible5(false)}>
            <Image src="/Sentymentalne.jpg" alt="Inspiracja" width="300" height="300" className="object-cover h-full w-full hover:opacity-30 transition-all duration-500" />
            <p className={`text-center absolute top-1/3 left-1/3 bottom-1/3 right-1/3 font-bold text-lg h-fit w-fit ${isVisible5 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Coś sentymentalnego</p>
          </div>
          </div>
          <div className="flex h-full w-full flex-row"></div>
        </div>
      </div>
    );
    }
    }
    
    