const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

export const getUsersPlaylists = async (Access_token: string) => {
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${Access_token}`,
    },
  });
};
