//User
export const getUsersPlaylists = async (Access_token: string) => {
  return fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
};
export const getUsersPodcasts = async (Access_token: string) => {
  return fetch('https://api.spotify.com/v1/me/shows?limit=50', {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
};
export const getUserInfo = async (Access_token: string) => {
  return fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
//Playlist
export const getPlaylistInfo = async (Access_token: string, playlistId: string) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
export const getPlaylistTracks = async (Access_token: string, playlistId: string) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
export const exportPlaylist = async (Access_token: string, userId: string, playlistDetails: any) => {
  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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
};
export const addItemsToPlaylist = async (Access_token: string, playlist_id: string, name:string, trackIds: any) => {
  console.log("hej")
  console.log(trackIds)
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "POST", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });
};


//Track
export const getTrackInfo = async (Access_token: string, trackId: string) => {
  return fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
export const getTracksInfo = async (Access_token: string, trackId: string) => {
  return fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
export const getTrackDetails = async (Access_token: string, trackId: string) => {
  return fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}

export const getTracksDetails = async (Access_token: string, trackIds: string) => {
  const spotiURL = new URL(`https://api.spotify.com/v1/tracks`);
    // Add the trackIds query parameter to the URL
    spotiURL.searchParams.append("ids", trackIds);
  return fetch(spotiURL, {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Content-Type": "application/json",
    },
  });
}
//Podcast
export const getPodcastInfo = async (Access_token: string, podcastId: string) => {
  return fetch(`https://api.spotify.com/v1/shows/${podcastId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
export const getPodcastEpisodes = async (Access_token: string, podcastId: string) => {
  return fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}


//Episode
export const getEpisodeDetails = async (Access_token: string, episodeId: string) => {
  return fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`
    },
  });
}
