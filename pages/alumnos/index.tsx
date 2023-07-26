import Head from "next/head";
import ContentLayout from "@/layouts/Content.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import NextPageWithLayout from "@/types/Layout.types";
import { ContactData, SectionData } from "@/types/Directorio.types";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import ContactTarget from "@/old-components/ContactTarget";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import RichtText from "@/old-components/Richtext/Richtext";
import BannerPortalverse from "@/old-components/BannerPortalverse";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import PromoLink from "@/old-components/PromoLink";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import { useRouter } from "next/router";

const Alumnos: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();
  const downloadFile = () => {
    const file = document.createElement('a');
    file.target = '__blank';
    file.href = sections.calendario.banner.file;
    file.click();
  }

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <div className="col-span-6 w-p:col-span-4 mb-12 w-t:mb-6 w-p:mb-6">
          <p className="font-headings font-bold text-[52px] w-t:text-8.5 w-p:text-7.5 leading-13 w-t:leading-[111%] w-p:leading-[125%] mb-6">{sections.head.title}</p>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-6 w-p:mb-6">
          {
            sections.accesos.map((item: any, i: number) => <section key={`section-blog-${i}`}>
              <CardWebsitePortalverse data={item} onClick={() => window.open(item.redirect, "_blank")} />
            </section>)
          }
        </section>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            sections.directorio.map(({ name: title, description, contacts }: SectionData, i: number) => <section key={`section-directory-${i}`} className="mb-9">
              <ContentInsideLayout>
                <p className="font-headings font-bold text-10 leading-12.5 col-span-12 mb-6">{title}</p>
                <p className="font-texts font-normal text-base w-t:text-3.5 w-p:text-base col-span-7 leading-[125%]">{description}</p>
              </ContentInsideLayout>
              <ContentInsideLayout classNames="mt-6 gap-6">
                {
                  contacts?.map(({ name, email, phone, link = '', image = '' }: ContactData, j: number) =>
                    <ContactTarget
                      key={`card-item-${j}`}
                      image={image}
                      name={name}
                      email={email}
                      phone={phone}
                      link={link}
                    />
                  )
                }
              </ContentInsideLayout>
            </section>
            )
          }
        </div>
        {
          sections.calendario.banner.visible ?
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 pb-18">
              <div className="w-p:hidden">
                <BannerPortalverse
                  data={sections.calendario.banner}
                  onClick={downloadFile}
                />
              </div>
              <div className="w-d:hidden w-t:hidden">
                <BannerPortalverse
                  data={{
                    ...sections.calendario.banner,
                    font: "light"
                  }}
                  onClick={downloadFile}
                />
              </div>
            </div>
            : null
        }      
      </ContentLayout>
      <ContentFullLayout classNames="col-span-12 w-t:col-span-8 w-p:col-span-4 bg-[#F4F4F4] py-18 px-2">
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <p className="font-headings font-bold text-10 leading-12.5 col-span-12 mb-6 text-[#282828]">{sections?.servicio?.title}</p>
          </div>
          <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 pt-6">
          {
            sections?.servicio?.niveles?.map((item: any, i: number) => 
              <section key={`section-schoolarships-${i}`}>
                <PromoLink data={item} onClick={() => { router?.push(item?.redirect) }} shadowColor={item?.shadowColor}/>  
              </section>
            )
          }
          </div>
        </ContentLayout>         
      </ContentFullLayout>
      <ContentFullLayout classNames="col-span-12 w-t:col-span-8 w-p:col-span-4 pt-18 w-t:pt-12 w-p:pt-12">
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <p className="font-headings font-bold text-10 leading-12.5 col-span-12 mb-6 text-[#282828]">{sections?.titulacion?.title}</p>
          </div>
          <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            sections?.titulacion?.niveles?.map((item: any, i: number) => 
              <section key={`section-schoolarships-${i}`}>
                <PromoLink data={item} onClick={() => { router?.push(item?.redirect) }}/>  
              </section>
            )
          }
          </div>
        </ContentLayout>       
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>
};

export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('alumnos.json');

  return {
    props: { sections, meta }
  };
};

export default Alumnos;
