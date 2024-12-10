import { ChangeEvent, useEffect, useState } from "react";
import Image from 'next/image'
import { useSession } from "next-auth/react";
import NotAvailable from "./NotAvailable";
export default function Zaawansowane(){
    const {data:session, update}=useSession()
    const [genres, setGenres] = useState<any>([]);
    const [showError, setShowError] = useState(false);
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
        genre: ["acoustic"],
       });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>("");
    const [response2, setRes2] = useState<any>();
    const PassTrack = async (e:any) => {
        if(session===null){
          throw new Error("Błąd dostępu do playlisty")
        }
        else
        {  
          await update({trackId:e.currentTarget.getAttribute("data-value")})
          // window.open("/TrackInfo", "_blank");
          setShowError(true);
        }
        
      };
      const getGenres = async () => {

        try {
          const res = await fetch(`/api/genreSeed`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { genres } = await res.json();
          setGenres(genres);
          
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
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
              const abc = await res.json();
              setRes2(abc);
              if(res){
                const playlistId = abc.items.id;
                const trackIds = response.tracks.map((track: any) => "spotify:track:" + track.id);
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
      const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowError(true);
      //   setLoading(true);
      
    
      //   try {
      //     const apiUrl = new URL(`/api/recommendation`, window.location.origin);
      //     apiUrl.searchParams.append("danceability_min", formValues.danceability_min);
      //     apiUrl.searchParams.append("danceability_max", formValues.danceability_max);
      //     apiUrl.searchParams.append("energy_min", formValues.energy_min);
      //     apiUrl.searchParams.append("energy_max", formValues.energy_max);
      //     apiUrl.searchParams.append("loudness_min", formValues.loudness_min);
      //     apiUrl.searchParams.append("loudness_max", formValues.loudness_max);
      //     apiUrl.searchParams.append("speechiness_min", formValues.speechiness_min);
      //     apiUrl.searchParams.append("speechiness_max", formValues.speechiness_max);
      //     apiUrl.searchParams.append("acousticness_min", formValues.acousticness_min);
      //     apiUrl.searchParams.append("acousticness_max", formValues.acousticness_max);
      //     apiUrl.searchParams.append("instrumentalness_min", formValues.instrumentalness_min);
      //     apiUrl.searchParams.append("instrumentalness_max", formValues.instrumentalness_max);
      //     apiUrl.searchParams.append("liveness_min", formValues.liveness_min);
      //     apiUrl.searchParams.append("liveness_max", formValues.liveness_max);
      //     apiUrl.searchParams.append("valence_min", formValues.valence_min);
      //     apiUrl.searchParams.append("valence_max", formValues.valence_max);
      //     apiUrl.searchParams.append("genre", formValues.genre[0]);
      //     console.log(formValues.genre[0])
      //     console.log(apiUrl.searchParams.get('genre'))
      //     const res = await fetch(apiUrl, {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     setResponse(await res.json());
      //     setLoading(false);
      //     if (!res.ok) {
    
      //       return;
      //     }
    
      //   } catch (error: any) {
      //     setLoading(false);
      //   }
      };

       const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
      };
      useEffect(() => {
        getGenres();
      }, []);

      if(!response){
    return(
      <div className="absolute top-10 z-0 p-4 w-full">
      {showError && <NotAvailable setShowError={setShowError}/>}
      <form className=" flex flex-col space-y-6" onSubmit={onSubmit}>
      
  <div className="flex flex-col md:flex-row w-full justify-center flex-wrap h-auto space-y-6 md:space-y-0">
    {/* Taneczność Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Taneczność</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="danceability_min"
          min="0"
          max={formValues.danceability_max}
          step="0.001"
          value={formValues.danceability_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="danceability_max"
          min={formValues.danceability_min}
         
          max="1"
          step="0.001"
          value={formValues.danceability_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="danceability_min"
          value={formValues.danceability_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.danceability_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="danceability_max"
          value={formValues.danceability_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.danceability_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Energiczność Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Energiczność</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="energy_min"
          min="0"
          max={formValues.energy_max}
          step="0.001"
          value={formValues.energy_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="energy_max"
          min={formValues.energy_min}
          max="1"
          step="0.001"
          value={formValues.energy_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="energy_min"
          value={formValues.energy_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.energy_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="energy_max"
          value={formValues.energy_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.energy_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Głośność Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Głośność</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="loudness_min"
          min="-60"
          max={formValues.loudness_max}
          step="1"
          value={formValues.loudness_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="loudness_max"
          min={formValues.loudness_min}
          max="0"
          step="1"
          value={formValues.loudness_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="loudness_min"
          value={formValues.loudness_min}
          onChange={handleChange}
          placeholder="Min"
          min="-60"
          max={formValues.loudness_max}
          step="1"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="loudness_max"
          value={formValues.loudness_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.loudness_min}
          max="0"
          step="1"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Wokalność Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Wokalność</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="speechiness_min"
          min="0"
          max={formValues.speechiness_max}
          step="0.001"
          value={formValues.speechiness_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="speechiness_max"
          min={formValues.speechiness_min}
          max="1"
          step="0.001"
          value={formValues.speechiness_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="speechiness_min"
          value={formValues.speechiness_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.speechiness_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="speechiness_max"
          value={formValues.speechiness_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.speechiness_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Muzyka akustyczna Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Muzyka akustyczna</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="acousticness_min"
          min="0"
          max={formValues.acousticness_max}
          step="0.001"
          value={formValues.acousticness_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="acousticness_max"
          min={formValues.acousticness_min}
          max="1"
          step="0.001"
          value={formValues.acousticness_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="acousticness_min"
          value={formValues.acousticness_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.acousticness_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="acousticness_max"
          value={formValues.acousticness_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.acousticness_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Muzyka instrumentalna Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Muzyka instrumentalna</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="instrumentalness_min"
          min="0"
          max={formValues.instrumentalness_max}
          step="0.001"
          value={formValues.instrumentalness_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="instrumentalness_max"
          min={formValues.instrumentalness_min}
          max="1"
          step="0.001"
          value={formValues.instrumentalness_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="instrumentalness_min"
          value={formValues.instrumentalness_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.instrumentalness_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="instrumentalness_max"
          value={formValues.instrumentalness_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.instrumentalness_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Nagranie na żywo Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Nagranie na żywo</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="liveness_min"
          min="0"
          max={formValues.liveness_max}
          step="0.001"
          value={formValues.liveness_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="liveness_max"
          min={formValues.liveness_min}
          max="1"
          step="0.001"
          value={formValues.liveness_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="liveness_min"
          value={formValues.liveness_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.liveness_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="liveness_max"
          value={formValues.liveness_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.liveness_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>

    {/* Pozytywność Container */}
    <div className="flex flex-col w-full items-center space-y-2 md:w-1/3 md:mr-4">
      <p className="font-bold text-lg md:text-2xl">Pozytywność</p>
      <div className="flex w-full items-center space-x-4">
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="valence_min"
          min="0"
          max={formValues.valence_max}
          step="0.001"
          value={formValues.valence_min}
          onChange={handleChange}
        />
        <input
          type="range"
          className="h-6 appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-6"
          name="valence_max"
          min={formValues.valence_min}
          max="1"
          step="0.001"
          value={formValues.valence_max}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-between space-x-4">
        <input
          type="number"
          name="valence_min"
          value={formValues.valence_min}
          onChange={handleChange}
          placeholder="Min"
          min="0"
          max={formValues.valence_max}
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
        <input
          type="number"
          name="valence_max"
          value={formValues.valence_max}
          onChange={handleChange}
          placeholder="Max"
          min={formValues.valence_min}
          max="1"
          step="0.001"
          className="p-1 w-16 text-center border border-gray-300 rounded-md text-primary"
        />
      </div>
    </div>
  </div>

        <div className="w-full flex justify-center h-full">
        <button
  type="submit"
  className="w-full md:w-1/3 py-4 bg-secondary text-primary font-bold text-lg rounded-md hover:scale-105 transition-transform duration-300"
  disabled={loading}
>
  {loading ? "Rekomendowanie w toku..." : "Zarekomenduj"}
</button>

      </div>
       </form>
       </div>
    )
}
else{
    return(
        <div className='absolute top-10 z-0 h-full p-4 w-full'>
         <div className=' w-full h-full p-1 bg-primary overflow-y-scroll rounded-md'>
        {response.tracks.map((item: any) => (
        <div key={item.id} className=' h-16 w-full flex flex-row  bg-senary rounded-md mb-1 mt-1' data-value={item.id} onClick={PassTrack}>
            <Image src={item.album.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
            <div className="flex flex-col">
            <p className='font-bold'>{item.name}</p>
            <p>{item.artists[0].name}</p>
            </div>
        </div>
         ))}
          {response2 == null
            ? <></>
            : response2.error
              ? <p className="font-bold">Błąd podczas dodawania playlisty</p>
              : <p className="font-bold">Poprawnie dodano playliste</p>
          }
         <button onClick={exportPlaylist}>Zapisz</button>
        
      </div>
        </div>
    )
    }
}