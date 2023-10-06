import { ChangeEvent, useEffect, useState } from "react";
import Image from 'next/image'
import { useSession } from "next-auth/react";
export default function Zaawansowane(){
    const {data:session, update}=useSession()
    const [genres, setGenres] = useState<any>([]);
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
    const PassTrack = async (e:any) => {
        if(session===null){
          throw new Error("Błąd dostępu do playlisty")
        }
        else
        {  
          await update({trackId:e.currentTarget.getAttribute("data-value")})
          window.open("/TrackInfo", "_blank");
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
              console.log(res);
              const abc = await res.json();
              if(res){
                
                const playlistId = abc.items.id;
                console.log("plaslist")
                console.log(abc)
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
        setLoading(true);
       
    
        try {
          const apiUrl = new URL(`/api/recommendation`, window.location.origin);
          apiUrl.searchParams.append("danceability_min", formValues.danceability_min);
          apiUrl.searchParams.append("danceability_max", formValues.danceability_max);
          apiUrl.searchParams.append("energy_min", formValues.energy_min);
          apiUrl.searchParams.append("energy_max", formValues.energy_max);
          apiUrl.searchParams.append("loudness_min", formValues.loudness_min);
          apiUrl.searchParams.append("loudness_max", formValues.loudness_max);
          apiUrl.searchParams.append("speechiness_min", formValues.speechiness_min);
          apiUrl.searchParams.append("speechiness_max", formValues.speechiness_max);
          apiUrl.searchParams.append("acousticness_min", formValues.acousticness_min);
          apiUrl.searchParams.append("acousticness_max", formValues.acousticness_max);
          apiUrl.searchParams.append("instrumentalness_min", formValues.instrumentalness_min);
          apiUrl.searchParams.append("instrumentalness_max", formValues.instrumentalness_max);
          apiUrl.searchParams.append("liveness_min", formValues.liveness_min);
          apiUrl.searchParams.append("liveness_max", formValues.liveness_max);
          apiUrl.searchParams.append("valence_min", formValues.valence_min);
          apiUrl.searchParams.append("valence_max", formValues.valence_max);
          apiUrl.searchParams.append("genre", formValues.genre[0]);
          console.log(formValues.genre[0])
          console.log(apiUrl.searchParams.get('genre'))
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
        <div className='absolute top-10 z-0 h-5/6 p-4 w-full'>
       <form className=" flex flex-col h-full" onSubmit={onSubmit}>
            <div className="flex flex-row w-full justify-center h-1/6">
                <div className="flex flex-col w-1/3 mr-4   items-center">
                <p className="font-bold text-2xl">Danceability</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="danceability_min"
                    min="0"
                    max={formValues.danceability_max}
                    step="0.001"
                    value={formValues.danceability_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full appearance-none w-full  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="danceability_max"
                    min={formValues.danceability_min}
                    max="1"
                    step="0.001"
                    value={formValues.danceability_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="danceability_min"
                    id="danceability_min"
                    value={formValues.danceability_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.danceability_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="danceability_max"
                    id="danceability_max"
                    value={formValues.danceability_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.danceability_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
                
                <div className="flex flex-col w-1/3 mr-4 items-center">
                <p className="font-bold text-2xl">Energy</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="energy_min"
                    min="0"
                    max={formValues.energy_max}
                    step="0.001"
                    value={formValues.energy_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="energy_max"
                    min={formValues.energy_min}
                    max="1"
                    step="0.001"
                    value={formValues.energy_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="energy_min"
                    id="energy_min"
                    value={formValues.energy_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.energy_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="energy_max"
                    id="energy_max"
                    value={formValues.energy_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.energy_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
                <div className="flex flex-col w-1/3 items-center">
                <p className="font-bold text-2xl">Loudness</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="loudness_min"
                    min="-60"
                    max={formValues.loudness_max}
                    step="1"
                    value={formValues.loudness_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="loudness_max"
                    min={formValues.loudness_min}
                    max="0"
                    step="1"
                    value={formValues.loudness_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="loudness_min"
                    id="loudness_min"
                    value={formValues.loudness_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="-60"
                    max={formValues.loudness_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="loudness_max"
                    id="loudness_max"
                    value={formValues.loudness_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.loudness_min}
                    max="0"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center h-1/6">
                <div className="flex flex-col w-1/3 mr-4 items-center">
                <p className="font-bold text-2xl">Speechiness</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="speechiness_min"
                    min="0"
                    max={formValues.speechiness_max}
                    step="0.001"
                    value={formValues.speechiness_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full appearance-none w-full bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="speechiness_max"
                    min={formValues.speechiness_min}
                    max="1"
                    step="0.001"
                    value={formValues.speechiness_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="speechiness_min"
                    id="speechiness_min"
                    value={formValues.speechiness_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.speechiness_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="speechiness_max"
                    id="speechiness_max"
                    value={formValues.speechiness_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.speechiness_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>

               
                <div className="flex flex-col w-1/3 mr-4 items-center">
                <p className="font-bold text-2xl">Acousticness</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="acousticness_min"
                    min="0"
                    max={formValues.acousticness_max}
                    step="0.001"
                    value={formValues.acousticness_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="acousticness_max"
                    min={formValues.acousticness_min}
                    max="1"
                    step="0.001"
                    value={formValues.acousticness_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="acousticness_min"
                    id="acousticness_min"
                    value={formValues.acousticness_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.acousticness_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="acousticness_max"
                    id="acousticness_max"
                    value={formValues.acousticness_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.acousticness_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
                <div className="flex flex-col w-1/3 items-center">
                <p className="font-bold text-2xl">Instrumentalness</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="instrumentalness_min"
                    min="0"
                    max={formValues.instrumentalness_max}
                    step="0.001"
                    value={formValues.instrumentalness_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="instrumentalness_max"
                    min={formValues.instrumentalness_min}
                    max="1"
                    step="0.001"
                    value={formValues.instrumentalness_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="instrumentalness_min"
                    id="instrumentalness_min"
                    value={formValues.instrumentalness_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.instrumentalness_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="instrumentalness_max"
                    id="instrumentalness_max"
                    value={formValues.instrumentalness_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.instrumentalness_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center h-1/6">
                <div className="flex flex-col w-1/3 mr-4 items-center">
                <p className="font-bold text-2xl">Liveness</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="liveness_min"
                    min="0"
                    max={formValues.liveness_max}
                    step="0.001"
                    value={formValues.liveness_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full  w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="liveness_max"
                    min={formValues.liveness_min}
                    max="1"
                    step="0.001"
                    value={formValues.liveness_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="liveness_min"
                    id="liveness_min"
                    value={formValues.liveness_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.liveness_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="liveness_max"
                    id="liveness_max"
                    value={formValues.liveness_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.liveness_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
                <div className="flex flex-col w-1/3 mr-4 items-center">
                <p className="font-bold text-2xl">Valence</p>
                <div className="flex flex-row w-full h-1/3 justify-center">
                <div className="w-1/3 bg-primary h-full rounded-full mr-4">
                    <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4 "
                    name="valence_min"
                    min="0"
                    max={formValues.valence_max}
                    step="0.001"
                    value={formValues.valence_min}
                    onChange={handleChange}/>
                </div>
                <div className="w-1/3 bg-primary h-full rounded-full">
                <input type="range"
                     className=" h-full w-full appearance-none  bg-primary rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1/4  "
                    name="valence_max"
                    min={formValues.valence_min}
                    max="1"
                    step="0.001"
                    value={formValues.valence_max}
                    onChange={handleChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="number"
                    name="valence_min"
                    id="valence_min"
                    value={formValues.valence_min}
                    onChange={handleChange}
                    placeholder="Min"
                    min="0"
                    max={formValues.valence_max}
                    step="0.001"
                    className="mr-4 text-primary w-1/3"
                />
                <input
                    type="number"
                    name="valence_max"
                    id="valence_max"
                    value={formValues.valence_max}
                    onChange={handleChange}
                    placeholder="Max"
                    min={formValues.valence_min}
                    max="1"
                    step="0.001"
                    className="text-primary w-1/3"
                />
                </div>
                </div>
                <div className="w-1/3 flex flex-col items-center m-0">
                <p className="font-bold text-2xl">Genre</p>
                <select name="genre" className="appearance-none  bg-primary h-1/2 rounded-full text-xl" value={formValues.genre[0]}  onChange={(e) => setFormValues({ ...formValues, genre: [e.target.value] })}>
                {genres.map((item: any) => (
                        <option value={item} className="bg-primary text-center ">{item}</option>
                ))}
               </select>
               </div>
            </div>
        <div className="w-full flex justify-center h-1/3">
            <button
        type="submit"
        className="bg-secondary text-primary w-1/3 h-1/3   rounded-md"
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
   console.log("res")
   console.log(response);
    return(
        <div className='absolute top-10 z-0 h-full p-4 w-5/6'>
         <div className=' w-full h-4/6 p-1 bg-primary overflow-y-scroll rounded-md'>
        {response.tracks.map((item: any) => (
        <div key={item.id} className=' h-16 w-full flex flex-row  bg-senary rounded-md mb-1 mt-1' data-value={item.id} onClick={PassTrack}>
            <Image src={item.album.images[0]?.url} width="60" height="60" alt="playlista" className='rounded-md m-1' />
            <div className="flex flex-col">
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
}