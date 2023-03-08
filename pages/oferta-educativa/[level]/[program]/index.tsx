import { Fragment, useEffect, useState } from "react"
import Head from "next/head"
import cn from "classnames"
import Routes from "@/routes/Routes"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Image from "@/old-components/Image"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import RichtText from "@/old-components/Richtext/Richtext"
import DescriptionSection from "@/old-components/DescriptionSection"
import OpenFormBachillerato from "@/forms/container/OpenFormBachillerato"
import OpenFormSuperior from "@/forms/container/OpenFormSuperior"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Button from "@/old-components/Button/Button"
import Select from "@/old-components/Select"
import { SelectInit } from "@/old-components/fixture"
import OutstandingContainer from "@/old-components/OutstandingContainerPortalverse"
import TabsFeatured from "@/old-components/TabsFeatured"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import Video from "@/old-components/Video"
import BannerPortalverse from "@/old-components/BannerPortalverse"

const EducativeOfferProgram: NextPageWithLayout<any> = ({ level, program, meta, config, sections, form, bannerParche }: any) => {

  const [ tabActive, setTabActive ] = useState<number>(0);
  const [ contentTabs, setContentTabs ] = useState<any>([]);
  const [ modalidades, setModalidades ] = useState<any>({});
  const [ _, setLevelSelected ] = useState<any>({});
  const [ optionsSelect, setOptionsSelect ] = useState<any>({});
  const [ selectData, setSelectData ] = useState<any>([]);
  const [ fileSelected, setFileSelected ] = useState<string>("");

  useEffect(() => {
    const allContents = sections.modalities.tabs.items.reduce((prev: any, curr: any) => { 
      const { content } = curr;
      return  [...prev, content ];
    }, []);
    setContentTabs([...allContents]);
  }, [sections.modalities.tabs]);

  useEffect(() => {
    const modalidades = config.config.modalidad.reduce((prev: any, curr: any, i: number) => ({ ...prev, [curr]: i }), {});
    setModalidades({ ...modalidades });
    const options = Object.entries(config.config.curriculum)
      .reduce((prev: any, [ key, value ]: any) => {
        if (typeof value === "string") {
          return { ...prev, [key]: [{ value, text: key, active: false }]}
        }
        const values = Object.entries(value).map(([k,v]: any) => ({ value: v, text: k, active: false }))
        return { ...prev, [key]: [ ...values ]}
      }, {});
    setOptionsSelect(options);
    const some = Object.entries(modalidades).filter(([key, value]: any) => value === tabActive)[0];
    setSelectData(options[some[0]]);
  }, [config.config.modalidad]);// eslint-disable-line react-hooks/exhaustive-deps

  const handleSetModalidad = (active: number) => {
    const some = Object.entries(modalidades).filter(([key, value]: any) => value === active)[0];
    if (!!some?.length) {
      const [ key ] = some;
      setLevelSelected(key);
    }
  };

  const handleSetActiveTab = (active: number) => {
    setFileSelected("")
    setTabActive(active);
    handleSetModalidad(active);
    const some = Object.entries(modalidades).filter(([ _, value ]: any) => value === active);
    if (!!some.length) {
      const [ key ] = some[0];
      setSelectData(optionsSelect[key]);
    }
  }

  const downloadFileProgram = () => window.open(`https://drive.google.com/uc?export=download&id=${fileSelected}`, "_blank")

  const handleSelectOption = async ({ detail }: CustomEvent) => {
    setFileSelected(detail);
    setSelectData((state: any) => state.map((item: any) => ({ ...item, active: item.value === detail })));
  }

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <h1 className="text-13 font-bold font-Poppins leading-13 w-t:leading-[111%] w-p:leading-[125%] w-t:text-8.5 w-p:text-7.5 mb-6">{sections.head.title}</h1>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-p:hidden mb-10 mt-6">
          <Image
            alt={sections.head.image.alt}
            src={sections.head.image.src}
            classNames="aspect-2/1"
            classNamesImg="aspect-2/1"
          />
        </div>
      </ContentLayout>  
      <ContentFullLayout classNames="w-d:hidden w-t:hidden mb-10 mt-6">
        <Image
          alt={sections.head.image.alt}
          src={sections.head.image.src}
          classNames="aspect-2/1"
          classNamesImg="aspect-2/1"/>
      </ContentFullLayout>  
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
          <p className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">{sections.modalities.title}</p>
        </div>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <TabsFeatured tabs={sections.modalities.tabs.items} onActive={(active: number) => handleSetActiveTab(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <section className="w-d:hidden">
          <TabsFeatured tabs={sections.modalities.tabs.items} onActive={(active: number) => handleSetActiveTab(active)} />
        </section>
      </ContentFullLayout>
      <ContentLayout> 
        <ContentInsideLayout classNames="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
        {
          level === 'bachillerato'
            ? contentTabs.map( ( items: any, i: number ) => {
                return items.map(({ image, title: contentTitle, description: contentDescription }: any, j: number) => <Fragment key={`section-${j}`}>
                  <DescriptionSection
                    title={contentTitle}
                    description={contentDescription}
                    classNames={cn("col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6", { "hidden w-p:hidden": tabActive !== i, "w-d:order-2 w-t:order-1 w-p:order-1": j === 1 })}
                    titleStyles="col-start-2 col-end-7 w-t:col-end-8"
                    descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                  />
                  <Image
                    alt={ image.alt }
                    src={ image.src }
                    classNames={cn("aspect-4/3 col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8", { "hidden": tabActive !== i, "w-d:order-1 w-t:order-2 w-p:order-2": j === 1 })}
                    classNamesImg={cn("aspect-4/3 col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8", { "hidden": tabActive !== i, "w-d:order-1 w-t:order-2 w-p:order-2": j === 1 })}
                  />
                </Fragment>)
              })
            : contentTabs.map( (content: any, i: number) => <div key={`content-outstanding-${i}`} className={cn("col-span-12 w-t:col-span-8 w-p:col-span-4 text-white", { "hidden": i !== tabActive })}><OutstandingContainer items={content.cards} /></div>)
        }
        </ContentInsideLayout>
      </ContentLayout>

      {
        level !== 'bachillerato'
          ? <>
              <ContentLayout>
                <ContentInsideLayout classNames="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
                  <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                    <h1 className="ac-type-h5-bold-solid-poppins-desktop w-t:ac-type-h5-bold-solid-poppins-tabmob w-p:ac-type-h5-bold-solid-poppins-tabmob">Selecciona un campus para descargar tu plan de estudios en esta modalidad</h1>
                    <div className="my-6">
                      <p className="font-Nunito-Sans font-normal text-xs mb-0">Los planes de estudio pueden variar por campus*</p>
                      <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{...SelectInit, textDefault: "Elige el campus de tu interés", icon: "apartment"}} options={selectData} flagHeight={true}/>
                    </div>
                    <div className="flex justify-center">
                      <Button dark data={{...sections.descarga, disabled: !fileSelected}} onClick={downloadFileProgram} />
                    </div>
                  </div>
                </ContentInsideLayout>
              </ContentLayout>
            </>
          : null
      }


      <ContentLayout classNames="mt-6">
        {
          level === 'bachillerato'
            ? <>
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
                  <h4 className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">{ sections.benefits.title }</h4>
                </div>
                <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 leading-[125%] w-d:order-1 w-t:order-1">
                  <RichtText font="light" data={{ content: sections.benefits.description }} />
                  <div className="my-6">
                  <p className="font-Nunito-Sans font-normal text-xs mb-0">Los planes de estudio pueden variar por campus*</p>
                    <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{...SelectInit, textDefault: "Elige el campus de tu interés"}} options={selectData} flagHeight={true}/>
                  </div>
                  <Button dark data={{...sections.benefits.action , disabled: !fileSelected}} onClick={downloadFileProgram} />
                </div>
                <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-d:order-1 w-t:order-2">
                  <Video dimensions={["450px", "400px", "200px"]} data={{ options: { id: sections.benefits.video, type: 'single', controls: true}, dimensions: { height: '330px', width: '100%'} }} />
                </div>
              </>
            : null
        }
        {/* <div className="order-last col-span-12 col-start-3 col-end-11 w-t:col-span-8 w-p:col-span-4">
          {
            level === 'bachillerato'
              ? <OpenFormBachillerato copies={{ ...form.copies }} image={{ src: "https://drive.google.com/uc?export=view&id=1CxZzCcuuptzexZwBWNtktMbIT5Z9dB6B", alt:"image-person" }} pathThankyou={`/thank-you`} controls={{ ...form.config }} />
              : <OpenFormSuperior levelDefault={config.config.nivel[0]} programDefault={config.config.nombre} copies={{ ...form.copies }} image={{ src: "https://drive.google.com/uc?export=view&id=1CxZzCcuuptzexZwBWNtktMbIT5Z9dB6B", alt:"image-person" }} pathThankyou={`/thank-you`} controls={{ ...form.config }} />
          }
        </div> */}
        <div className="order-last col-span-12 w-t:col-span-8 w-p:col-span-4">
          <BannerPortalverse data={bannerParche.sections.bannerParche } onClick={() => {
            window.location.pathname = bannerParche.sections.bannerParche.redirect
          }}/>
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

export async function getStaticPaths(props: any) {
  const allRoutes = Routes["oferta-educativa"].reduce((prev: any, { params: { programs, level } }: any) => {
    const finalRoutes = programs.map(({ params }: any) => {
      return { params: { level, ...params } }
    })
    return [ ...prev, ...finalRoutes ]
  } , []);

  return {
    paths: [...allRoutes],
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { params: { level, program } } = context;
  const { meta, config, sections, form } = await getDataPageFromJSON(`/oferta-educativa/${level}/${program}.json`);
  const bannerParche  = await getDataPageFromJSON("oferta-educativa/oferta-educativa.json")
  return {
    props: {
      level, program, meta, config, sections, form, bannerParche
    },
  }
}

export default EducativeOfferProgram;