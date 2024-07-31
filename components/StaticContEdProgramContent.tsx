import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment } from "react"
import ContentLayout from "@/layouts/Content.layout"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"

const DetalleCursoEducacionContinua = ({ sections, meta }: any) => {

  const router = useRouter()
  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <Fragment>
      <ContentLayout classNames="gap-6">
        <div className="col-span-6 tablet:col-span-4 mobile:col-span-4">
          <p className="font-headings font-bold text-13 tablet:text-8.5 mobile:text-7.5 leading-13 tablet:semi-tight mobile:leading-tight mb-6">{sections.head.title}</p>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 tablet:col-span-4 mobile:col-span-4">
          <Image
              alt={ sections.head.image.alt }
              src={ sections.head.image.src }
              classNames="aspect-2/1 tablet:aspect-2/1 mobile:aspect-2/1 mb-6"
            />
          <div className="flex flex-col p-2 border border-solid border-surface-300 rounded-lg mb-6">
            <p className="font-texts font-normal text-base leading-5 text-surface-500">Precio:</p>
            <h2 className="font-headings font-semibold text-6.5 leading-10" dangerouslySetInnerHTML={{__html: sections.head.price}}/>
            <p className="font-texts font-normal text-sm leading-5 text-surface-950">Solicita información en el siguiente correo:</p>
            <div className="flex">
              <a href={`mailto:${sections.head.email}`} target="__blank" className="font-texts font-bold text-sm leading-5 text-surface-950">{sections.head.email}</a>
            </div>
          </div>
          {/* Form is currently hidden, as UTEG has yet to upload program data to Salesforce */}
          {/* <EducacionContinuaForm pathThankyou="/thank-you" image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} copies={{...OpenFormInit.steponecontinuos, subtitle: OpenFormInit.steponecontinuos.subtitle + meta.title}} defaultProgram={sections.head.title} /> */}
        </div>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:hidden tablet:hidden hidden">
          <p className="font-headings font-bold text-10 pt-6 tablet:text-8.5 mobile:text-7.5 leading-tight">{sections.relatedCourses.title}</p>
        </div>
        {/* <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:grid-cols-4 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 mb-12 desktop:hidden tablet:hidden hidden">
          {
           sections.relatedCourses.courses.map((item:any, i:number) => <section key={`section-educativeProgram-${i}`}>
            <CardProgram image={item.image.desk} title={item.title} link={item.link} onClick={()=> router.push(`/${item.redirect}`)}/>
           </section>)
          }
        </section> */}
      </ContentLayout>
      {/* <ContentFullLayout classNames="bg-surface-100 mobile:hidden hidden">
        <ContentLayout>
          <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
            <p className="font-headings font-bold text-10 pt-6">{sections.relatedCourses.title}</p>
          </div>
          <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 grid desktop:grid-cols-4 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 mb-12">
            {
             sections.relatedCourses.courses.map((item:any, i:number) => <section key={`section-educativeProgram-${i}`}>
              <CardProgram image={item.image.desk} title={item.title} link={item.link} onClick={()=> router.push(`/${item.redirect}`)}/>
             </section>)
            }
          </section>
        </ContentLayout>
      </ContentFullLayout> */}
    </Fragment>
  </>
}

export default DetalleCursoEducacionContinua;