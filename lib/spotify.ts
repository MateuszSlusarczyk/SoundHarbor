//Access Token
/*
import { getServerSession } from "next-auth/next"
import { authOptions } from '../app/api/auth/[...nextauth]/options'
import { get } from "http";

export const getNewToken = async (Access_token: string) => {
  var session = await getServerSession(authOptions);
  const res = await fetch('https://accounts.spotify.com/api/token', {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: Access_token
    }),
  });
  if (res.status === 200) {
    if(session?.access_token === undefined){
      throw new Error("No access token");
    }
    else{
    const response = await res.json();
    session.access_token = response.access_token;
    return res.json();
    }
  }
};
*/
//User
export const getUsersPlaylists = async (Access_token: string, offset: string) => {
  const res =  await fetch(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
 
  return res;
};
export const getUsersPodcasts = async (Access_token: string) => {
  const res =  await fetch('https://api.spotify.com/v1/me/shows?limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
 
  return res;
};
export const getUserInfo = async (Access_token: string) => {
  const res =  await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

  return res;
  
}
export const getUserTopTracks = async (Access_token: string) => {
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
      },
      });
  return res;
}
export const getUserTopArtists = async (Access_token: string) => {
  const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
      },
      });
  return res;
}
export const getUserFollowedArtists = async (Access_token: string) => {
  const res = await fetch('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
      },
      });
  return res;
}
//Playlist
export const getPlaylistInfo = async (Access_token: string, playlistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

 
  return res;
};

export const getPlaylistTracks = async (Access_token: string, playlistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });


  return res;
};

export const exportPlaylist = async (Access_token: string, userId: string, playlistDetails: any) => {
  const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: "POST", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playlistDetails.playlistName,
      description: playlistDetails.playlistDescription,
      public: false,
    }),
  });

  

  return res;
};

export const addItemsToPlaylist = async (Access_token: string, playlist_id: string, trackIds: any) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "POST", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });
 


  return res;
};

// Track
export const getTrackInfo = async (Access_token: string, trackId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

  
  return res;
};

export const getTracksInfo = async (Access_token: string, trackId: string) => {
  const spotiUrl = new URL(`https://api.spotify.com/v1/tracks`);
  spotiUrl.searchParams.append("ids", trackId);
  const res = await fetch(spotiUrl, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

 

  return res;
};

export const getTrackDetails = async (Access_token: string, trackId: string) => {
  
  const res = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

 

  return res;
};

export const getTracksDetails = async (Access_token: string, trackIds: string) => {
  const spotiURL = new URL(`https://api.spotify.com/v1/tracks`);
  
  // Add the trackIds query parameter to the URL
  spotiURL.searchParams.append("ids", trackIds);

  
  const res = await fetch(spotiURL, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
  });



  return res;
};

// Podcast
export const getPodcastInfo = async (Access_token: string, podcastId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/shows/${podcastId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });



  return res;
};

export const getPodcastEpisodes = async (Access_token: string, podcastId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });



  return res;
};

// Episode
export const getEpisodeDetails = async (Access_token: string, episodeId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });



  return res;
};
//Recommendations
export const getRecommendationsTracks = async (Access_token: string, trackIds: string) => {
  const spotiURL = new URL(`https://api.spotify.com/v1/recommendations`);
  // Add the trackIds query parameter to the URL
  spotiURL.searchParams.append("seed_tracks", trackIds);
  
  const res = await fetch(spotiURL, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
  });


  return res;
};
export const getRecommendationsGenre = async (Access_token: string,genre: any, danceability_min:string, danceability_max:string, energy_min:string, energy_max:string, loudness_min:string, loudness_max:string, speechiness_min:string, speechiness_max:string, acousticness_min:string, acousticness_max:string, instrumentalness_min:string, instrumentalness_max:string, liveness_min:string, liveness_max:string, valence_min:string, valence_max:string) => {
  const spotiURL = new URL(`https://api.spotify.com/v1/recommendations`);
  // Add the trackIds query parameter to the URL
  console.log(genre)
  spotiURL.searchParams.append("seed_genres", genre);
  spotiURL.searchParams.append("min_danceability", danceability_min);
  spotiURL.searchParams.append("max_danceability", danceability_max);
  spotiURL.searchParams.append("min_energy", energy_min);
  spotiURL.searchParams.append("max_energy", energy_max);
  spotiURL.searchParams.append("min_loudness", loudness_min);
  spotiURL.searchParams.append("max_loudness", loudness_max);
  spotiURL.searchParams.append("min_speechiness", speechiness_min);
  spotiURL.searchParams.append("max_speechiness", speechiness_max);
  spotiURL.searchParams.append("min_acousticness", acousticness_min);
  spotiURL.searchParams.append("max_acousticness", acousticness_max);
  spotiURL.searchParams.append("min_instrumentalness", instrumentalness_min);
  spotiURL.searchParams.append("max_instrumentalness", instrumentalness_max);
  spotiURL.searchParams.append("min_liveness", liveness_min);
  spotiURL.searchParams.append("max_liveness", liveness_max);
  spotiURL.searchParams.append("min_valence", valence_min);
  spotiURL.searchParams.append("max_valence", valence_max);
  spotiURL.searchParams.append("limit", "20");
  const res = await fetch(spotiURL, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
  });


  return res;
};
export const getRecommendationsGenreBasic = async (Access_token: string,genre: any) => {
  const spotiURL = new URL(`https://api.spotify.com/v1/recommendations`);
  // Add the trackIds query parameter to the URL
  console.log(genre)
  spotiURL.searchParams.append("seed_genres", genre);
  spotiURL.searchParams.append("limit", "20");
  const res = await fetch(spotiURL, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
  })
  return res;
};
//Genre
export const getGenreSeeds = async (Access_token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });



  return res;
};

//Artist
export const getArtist = async (Access_token: string, artistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
  return res;
};
export const getArtistsAlbums = async (Access_token: string, artistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
  return res;
};
export const getArtistsTopTracks = async (Access_token: string, artistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=PL`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
  return res;
}
export const getArtistsRelatedArtists = async (Access_token: string, artistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
  return res;
}
//Album
export const getAlbumTracks = async (Access_token: string, albumId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });


  return res;
};
export const getAlbumInfo = async (Access_token: string, albumId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });

 
  return res;
};
