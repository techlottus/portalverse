import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import Image from "@/old-components/Image";

const DetalleCursoEducacionContinua = ({ sections, meta }: any) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <Fragment>
        <ContentLayout classNames="gap-6">
          <div className="col-span-6 w-t:col-span-4 w-p:col-span-4">
            <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-7.5 leading-13 w-t:leading-[111%] w-p:leading-[125%] mb-6">
              {sections.head.title}
            </p>
            <RichtText
              data={{
                content: sections.head.description,
              }}
            />
          </div>
          <div className="col-span-6 w-t:col-span-4 w-p:col-span-4">
            <Image
              alt={sections.head.image.alt}
              src={sections.head.image.src}
              classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1 mb-6"
            />
            <div className="flex flex-col p-2 border rounded-lg mb-6">
              <p className="font-Nunito-Sans font-normal text-base leading-5 text-[#818181]">
                Precio:
              </p>
              <h1
                className="font-Poppins font-semibold text-[32px] leading-10"
                dangerouslySetInnerHTML={{ __html: sections.head.price }}
              />
              <p className="font-Nunito-Sans font-normal text-sm leading-5 text-black">
                {sections?.head?.textLink?.description}
              </p>
              <div className="flex">
                <a
                  href={sections.head?.textLink?.href}
                  target={sections.head.textLink?.target}
                  className="font-Nunito-Sans font-bold text-sm leading-5 text-black"
                >
                  {sections.head.textLink?.text}
                </a>
              </div>
            </div>
            {/* Form is currently hidden, as UTEG has yet to upload program data to Salesforce */}
            {/* <EducacionContinuaForm pathThankyou="/thank-you" image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} copies={{...OpenFormInit.steponecontinuos, subtitle: OpenFormInit.steponecontinuos.subtitle + meta.title}} defaultProgram={sections.head.title} /> */}
          </div>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-t:hidden hidden">
            <p className="font-Poppins font-bold text-10 pt-6 w-t:text-8.5 w-p:text-7.5 leading-[125%]">
              {sections.relatedCourses.title}
            </p>
          </div>
          {/* <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-d:hidden w-t:hidden hidden">
          {
           sections.relatedCourses.courses.map((item:any, i:number) => <section key={`section-educativeProgram-${i}`}>
            <CardProgram image={item.image.desk} title={item.title} link={item.link} onClick={()=> router.push(`/${item.redirect}`)}/>
           </section>)
          }
        </section> */}
        </ContentLayout>
        {/* <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY w-p:hidden hidden">
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <p className="font-Poppins font-bold text-10 pt-6">{sections.relatedCourses.title}</p>
          </div>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12">
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
  );
};

export default DetalleCursoEducacionContinua;
