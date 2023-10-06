import { ChangeEvent, useState } from "react";
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Zaawansowane(){
  const {data:session, update}=useSession()
    const [formValues, setFormValues] = useState({
      genre: ["acoustic"],
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
    const [isVisible7, setIsVisible7] = useState(false);
    const [isVisible8, setIsVisible8] = useState(false);
    const [isVisible9, setIsVisible9] = useState(false);
    const [isVisible10, setIsVisible10] = useState(false);
    const [isVisible11, setIsVisible11] = useState(false);
    const [isVisible12, setIsVisible12] = useState(false);
    const [isVisible13, setIsVisible13] = useState(false);
    const [isVisible14, setIsVisible14] = useState(false);
    const [isVisible15, setIsVisible15] = useState(false);
    const [isVisible16, setIsVisible16] = useState(false);
    const [isVisible17, setIsVisible17] = useState(false);
    const [isVisible18, setIsVisible18] = useState(false);
    const [isVisible19, setIsVisible19] = useState(false);
    const [isVisible20, setIsVisible20] = useState(false);

    

   
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
              const trackIds = response.tracks.map((track: any) => 
              track.track_id ? "spotify:track:" + track.track_id : "spotify:track:" + track.id);
              const res2 = await fetch("/api/addTracksToPlaylist", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "Plejka", playlistId, trackIds }), // Include the "name" field
              });
            }
 
      }
  };
      const Recommend  = async (genre: string) => {
        setLoading(true);
        try {
          const apiUrl = new URL(`/api/recommendation`, window.location.origin);
          apiUrl.searchParams.append("genre", genre);
          const res = await fetch(apiUrl, {
            method: "GET",
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
        <div className=' h-full p-4 w-full'>
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
        <div className=' bg-senary h-full p-4 w-full  '>
          <div className="w-full h-full rounded-md bg-primary overflow-y-scroll no-scrollbar p-2">
        <div className="flex flex-col justify-center items-center h-1/6 w-full">
          <p className="font-bold text-xl">Witaj, z chęcią polecimy ci jakąś playliste!</p>
          <p className="font-bold text-lg">Na co masz tym razem ochotę?</p>
        </div>
        <div className="h-4/6 w-full flex flex-col ">
          <div className="flex h-1/2 w-full flex-row mb-4">
            <div className="relative h-full ml-4 w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            <Image src="/Anime.jpg" alt="Anime" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("anime")}/>
            <p className={`text-center absolute top-1/3 left-1/3  font-bold text-lg h-fit w-fit ${isVisible ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka z Anime</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible1(true)} onMouseLeave={() => setIsVisible1(false)}>
            <Image src="/Classical.jpg" alt="Klasyczna" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() =>Recommend("classical")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible1 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka klasyczna</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible2(true)} onMouseLeave={() => setIsVisible2(false)}>
            <Image src="/Club.jpg" alt="Klubowa" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("club")}/>
            <p className={`text-center absolute right-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible2 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka klubowa</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible3(true)} onMouseLeave={() => setIsVisible3(false)}>
            <Image src="/Dance.jpg" alt="Taneczna" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() =>Recommend("dance")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible3 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka do tańca</p>
          </div>
          </div>
          <div className="flex h-1/2 w-full flex-row mb-4">
            <div className="relative h-full w-1/3 ml-4 mr-4 flex items-center" onMouseEnter={() => setIsVisible4(true)} onMouseLeave={() => setIsVisible4(false)}>
            <Image src="/Country.jpg" alt="Country" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("country")}/>
            <p className={`text-center absolute top-1/3 left-1/3  font-bold text-lg h-fit w-fit ${isVisible4 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka country</p>
          </div>
          <div className="relative h-full w-1/3 flex mr-4 items-center" onMouseEnter={() => setIsVisible5(true)} onMouseLeave={() => setIsVisible5(false)}>
            <Image src="/Chill.jpg" alt="Relaksacyjna" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("chill")}/>
            <p className={`text-center absolute right-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible5 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka relaksacyjna</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible6(true)} onMouseLeave={() => setIsVisible6(false)}>
            <Image src="/folk.jpg" alt="Folk" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() =>Recommend("folk")}/>
            <p className={`text-center absolute left-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible6 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Folk </p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible7(true)} onMouseLeave={() => setIsVisible7(false)}>
            <Image src="/Dubstep.jpg" alt="Dubstep" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("dubstep")}/>
            <p className={`text-center absolute right-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible7? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Dubstep</p>
          </div>
          </div>
          <div className="flex h-1/2 w-full flex-row mb-4">
          <div className="relative h-full w-1/3 mr-4 ml-4 flex items-center" onMouseEnter={() => setIsVisible8(true)} onMouseLeave={() => setIsVisible8(false)}>
            <Image src="/blues.jpg" alt="Blues" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("blues")}/>
            <p className={`text-center absolute left-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible8 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Blues</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible9(true)} onMouseLeave={() => setIsVisible9(false)}>
            <Image src="/funk.jpg" alt="Funk" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("funk")}/>
            <p className={`text-center absolute left-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible9? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Funk</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible10(true)} onMouseLeave={() => setIsVisible10(false)}>
            <Image src="/hip_hop.jpg" alt="Hip hop" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() =>Recommend("hip-hop")}/>
            <p className={`text-center absolute left-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible10 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Hip-hop</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible11(true)} onMouseLeave={() => setIsVisible11(false)}>
            <Image src="/groove.jpg" alt="Groove" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("groove")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible11 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Groove</p>
          </div>
          </div>
          <div className="flex h-1/2 w-full flex-row mb-4">
            <div className="relative h-full w-1/3 mr-4 ml-4 flex items-center" onMouseEnter={() => setIsVisible12(true)} onMouseLeave={() => setIsVisible12(false)}>
            <Image src="/indie.jpg" alt="Indie" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("indie")}/>
            <p className={`text-center absolute top-1/3 left-1/2  font-bold text-lg h-fit w-fit ${isVisible12? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Indie</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible20(true)} onMouseLeave={() => setIsVisible20(false)}>
            <Image src="/workout.jpg" alt="Muzyka do ćwiczenia" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("work-out")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible20 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka do ćwiczenia</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible14(true)} onMouseLeave={() => setIsVisible14(false)}>
            <Image src="/rock.jpg" alt="Rock" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("rock")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible14 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka rockowa</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible15(true)} onMouseLeave={() => setIsVisible15(false)}>
            <Image src="/romance.jpg" alt="Romansowa" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("romance")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible15 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka romansowa</p>
          </div>
          </div>
          <div className="flex h-1/2 w-full flex-row mb-4">
            <div className="relative h-full w-1/3 mr-4 flex ml-4 items-center" onMouseEnter={() => setIsVisible16(true)} onMouseLeave={() => setIsVisible16(false)}>
            <Image src="/soundtrack.jpg" alt="Soundtrack" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500" onClick={() => Recommend("soundtracks")}/>
            <p className={`text-center absolute top-1/3 left-1/3  font-bold text-lg h-fit w-fit ${isVisible16? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Soundtrack</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible17(true)} onMouseLeave={() => setIsVisible17(false)}>
            <Image src="/sleep.jpg" alt="Do snu" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() =>Recommend("sleep")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible17 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka do snu</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible18(true)} onMouseLeave={() => setIsVisible18(false)}>
            <Image src="/study.jpg" alt="Do Nauki" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("study")}/>
            <p className={`text-center absolute left-1/3 top-1/3  font-bold text-lg h-fit w-fit ${isVisible18 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Muzyka do nauki</p>
          </div>
          <div className="relative h-full w-1/3 mr-4 flex items-center" onMouseEnter={() => setIsVisible19(true)} onMouseLeave={() => setIsVisible19(false)}>
            <Image src="/synthpop.jpg" alt="Synthpop" width="300" height="300" className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"  onClick={() => Recommend("synth-pop")}/>
            <p className={`text-center absolute left-1/2 top-1/3  font-bold text-lg h-fit w-fit ${isVisible19 ? '' : 'opacity-0'}`}
              style={{ textShadow: "0.1rem 0.1rem 1rem" }}>Synthpop</p>
          </div>
          
          </div>
        </div>
      </div>
      </div>
    );
    }
    }
    
    