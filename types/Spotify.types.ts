export type SpotifyConfig = {
  type: 'track' | 'album' | 'playlist' | 'episode' | 'artist';
  id: string;
  format?: 'compact' | 'normal';
}

type SpotifyComponentData = {
  data: {
    config: SpotifyConfig;
  }
}

export default SpotifyComponentData