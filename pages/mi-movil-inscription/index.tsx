import React from "react";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"


const MiMovilInscription: NextPageWithLayout<any> = (props: any) => {

  return (
      <ContentFullLayout>
        <section className="w-full bg-surface-0 z-15 transition-transform shadow-15">
          <div className="p-6 border-0 border-solid border-surface-200 border-r-2">
            <div className="w-36 h-9 bg-logo bg-cover bg-center mobile:mx-auto"> </div>
          </div>
        </section>
        <section>
          FORMULARIO DE INSCRIPCION MI MOVIL
        </section>
      </ContentFullLayout>
  )
}
export default MiMovilInscription