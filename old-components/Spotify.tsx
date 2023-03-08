import { createRef, FC, memo, useEffect } from "react"
import SpotifyComponentData from "@/types/Spotify.types"

const Spotify: FC<SpotifyComponentData> = memo(({ data }: SpotifyComponentData) => {
  const spotifyRef = createRef();

  useEffect(() => {
    const { config } = data;
    (spotifyRef.current as any).data = { ...config };
  }, [data, spotifyRef]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-spotify ref={spotifyRef}></lottus-spotify>
});

export default Spotify