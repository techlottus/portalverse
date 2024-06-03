import Head from "next/head"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useMemo, useState } from "react"

const CheckoutPage: NextPageWithLayout = () => {

  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState()
  useEffect(() => {
    const postData = async () => {
      if (flywireAPI && flywireAPIKEY) {
        const response = await fetch("/api/generateFwLink", {
          method: 'POST'
        });
        const res = await response.json()
        setFlywireLink(await res)
      }
    }
    postData()
  }, [])
  useEffect(() => {
    console.log('flywireLink: ', flywireLink)
  }, [flywireLink])


  return <>
    <Head>
      title
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <ContentInsideLayout>
          <div className="flex w-full">
          <div className="w-1/2 h-full mx-auto text-center align-middle">checkout</div>
          <div className="w-1/2 h-full">
          <iframe  width="600px" height="500px" src={flywireLink} title="Flywire form"></iframe></div>
          </div>
        </ContentInsideLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}


export default CheckoutPage