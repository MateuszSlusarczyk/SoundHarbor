import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NotAvailable from "./NotAvailable";

export default function Zaawansowane() {
  const { data: session, update } = useSession();
  const [isVisible, setIsVisible] = useState(Array(20).fill(false)); // Array to handle visibility for 20 items
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [response2, setRes2] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  const Recommend = async (genre: string) => {
    setLoading(true);
    setShowError(true);
    // try {
    //   const apiUrl = new URL("/api/recommendation", window.location.origin);
    //   apiUrl.searchParams.append("genre", genre);
    //   const res = await fetch(apiUrl, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await res.json();
    //   setResponse(data);
    //   setLoading(false);
    // } catch (error) {
    //   console.error("Error fetching recommendations:", error);
    //   setLoading(false);
    // }
  };

  const PassTrack = async (e: any) => {
    if (session === null) {
      throw new Error("Access to the playlist is not available");
    } else {
      const trackId = e.currentTarget.getAttribute("data-value");
      await update({ trackId });
      window.location.href = "/TrackInfo";
    }
  };

  const exportPlaylist = async () => {
    if (session === null) {
      throw new Error("Access to the playlist is not available");
    } else {
      try {
        const res = await fetch("/api/exportPlaylist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(""),
        });
        const abc = await res.json();
        console.log(abc);
        setRes2(abc);

        if (res.ok) {
          const playlistId = abc.items.id;
          const trackIds = response.tracks.map((track: any) =>
            track.track_id ? `spotify:track:${track.track_id}` : `spotify:track:${track.id}`
          );

          await fetch("/api/addTracksToPlaylist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Plejka", playlistId, trackIds }),
          });
        }
      } catch (error) {
        console.error("Error exporting playlist:", error);
      }
    }
  };

  const handleMouseEnter = (index: number) => {
    const updatedVisibility = [...isVisible];
    updatedVisibility[index] = true;
    setIsVisible(updatedVisibility);
  };

  const handleMouseLeave = (index: number) => {
    const updatedVisibility = [...isVisible];
    updatedVisibility[index] = false;
    setIsVisible(updatedVisibility);
  };

  const genres = [
    { src: "/Anime.jpg", alt: "Anime", genre: "anime", text: "Muzyka z Anime" },
    { src: "/Classical.jpg", alt: "Klasyczna", genre: "classical", text: "Muzyka klasyczna" },
    { src: "/Club.jpg", alt: "Klubowa", genre: "club", text: "Muzyka klubowa" },
    { src: "/Dance.jpg", alt: "Taneczna", genre: "dance", text: "Muzyka do tańca" },
    { src: "/Country.jpg", alt: "Country", genre: "country", text: "Muzyka country" },
    { src: "/Chill.jpg", alt: "Relaksacyjna", genre: "chill", text: "Muzyka relaksacyjna" },
    { src: "/folk.jpg", alt: "Folk", genre: "folk", text: "Folk" },
    { src: "/Dubstep.jpg", alt: "Dubstep", genre: "dubstep", text: "Dubstep" },
    { src: "/blues.jpg", alt: "Blues", genre: "blues", text: "Blues" },
    { src: "/funk.jpg", alt: "Funk", genre: "funk", text: "Funk" },
    { src: "/hip_hop.jpg", alt: "Hip hop", genre: "hip-hop", text: "Hip-hop" },
    { src: "/groove.jpg", alt: "Groove", genre: "groove", text: "Groove" },
    { src: "/indie.jpg", alt: "Indie", genre: "indie", text: "Indie" },
    { src: "/workout.jpg", alt: "Muzyka do ćwiczenia", genre: "work-out", text: "Muzyka do ćwiczenia" },
    { src: "/rock.jpg", alt: "Rock", genre: "rock", text: "Muzyka rockowa" },
    { src: "/romance.jpg", alt: "Romansowa", genre: "romance", text: "Muzyka romansowa" },
    { src: "/soundtrack.jpg", alt: "Soundtrack", genre: "soundtracks", text: "Soundtrack" },
    { src: "/sleep.jpg", alt: "Do snu", genre: "sleep", text: "Muzyka do snu" },
    { src: "/study.jpg", alt: "Do Nauki", genre: "study", text: "Muzyka do nauki" },
    { src: "/synthpop.jpg", alt: "Synthpop", genre: "synth-pop", text: "Synthpop" },
  ];

  if (response) {
    // Render Recommendations
    return (
      <div className="h-full p-4 w-full">
        <div className="w-full h-full p-1 bg-primary overflow-y-scroll rounded-md flex flex-col items-start">
          {response.tracks.map((item: any) => (
            <div
              key={item.name}
              className="h-16 w-full flex flex-row items-center  bg-senary rounded-md mb-1 mt-1"
              data-value={item.id}
              onClick={PassTrack}
            >
              <Image
                src={item.album.images[0]?.url}
                width="60"
                height="60"
                alt="playlista"
                className="rounded-md m-1"
              />
              <div className="flex flex-col ">
                <p className="font-bold">{item.name}</p>
                <p>{item.artists[0]?.name}</p>
              </div>
            </div>
          ))}
          {response2 == null ? (
            <></>
          ) : response2.error ? (
            <p className="font-bold">Błąd podczas dodawania playlisty</p>
          ) : (
            <p className="font-bold">Poprawnie dodano playliste</p>
          )}
          <button onClick={exportPlaylist} className="font-semibold mt-4 ml-2 text-lg">
            Zapisz Playlistę
          </button>
          <button
            onClick={() => setResponse(null)} // Reset the response to go back to the genre selection
            className="font-semibold mt-4 ml-2 text-lg"
          >
            Wróć
          </button>
        </div>
      </div>
    );
  }

  // Render Genre Selection
  return (
    <div className="bg-senary h-full p-4 w-full">
      {showError && <NotAvailable setShowError={setShowError}/>}
      <div className="w-full h-full rounded-md bg-primary p-2">
        <div className="flex flex-col justify-center items-center h-1/6 w-full">
          <p className="font-bold text-xl">Witaj, z chęcią polecimy ci jakąś playliste!</p>
          <p className="font-bold text-lg">Na co masz tym razem ochotę?</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre, index) => (
            <div
              key={genre.alt}
              className="relative h-72 w-full flex items-center"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Image */}
              <Image
                src={genre.src}
                alt={genre.alt}
                width={300}
                height={300}
                className="object-cover rounded-md h-full w-full hover:opacity-30 transition-all duration-500"
                onClick={() => Recommend(genre.genre)}
              />

              {/* Overlay Text */}
              <p
                className={`absolute inset-0 flex items-center justify-center font-bold text-lg text-white transition-opacity duration-500 pointer-events-none ${
                  isVisible[index] ? "opacity-100" : "opacity-0"
                }`}
                style={{ textShadow: "0.1rem 0.1rem 1rem black" }}
              >
                {genre.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
