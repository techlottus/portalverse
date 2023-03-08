import dynamic from "next/dynamic"

const Map = dynamic(() => import("./Editor"), {
  ssr: false
})

export default Map