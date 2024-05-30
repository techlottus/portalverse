import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import { InscriptionForm } from "@/forms/container/InscriptionForm"

const Inscripcion = () => {

  return <>
    <Head>
      <title>Inscripcion</title>
    </Head>
    <ContentFullLayout>
      <InscriptionForm />
    </ContentFullLayout>
  </>

}

export default Inscripcion