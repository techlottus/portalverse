import dynamic from "next/dynamic"

const Youtube = dynamic(() => import("./Youtube"), {
  ssr: false
})

export default Youtube