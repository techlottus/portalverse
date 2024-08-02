import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import cn from "classnames"
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import RichtText from "@/old-components/Richtext/Richtext";
import TabsFeatured from "@/old-components/TabsFeatured";
import DescriptionSection from "@/old-components/DescriptionSection";
import Select from "@/old-components/Select/Select";
import Video from "@/old-components/Video";
import Aspect from "@/components/Aspect";
import Alert from "@/components/sections/Alert";
import { ButtonInit, SelectInit } from "@/old-components/fixture";
import Banner from "@/components/sections/Banner";
import { formatModalityDataBachillerato } from "@/utils/programDetail";
import type { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailBachilleratoData } from "@/utils/getProgramDetailBachillerato";

const ProgramBachilleratoPageContent = (props: DynamicProgramDetailData) => {

  const program = props?.program;
  const layout = props?.layout as ProgramDetailBachilleratoData;
  const seo = props?.program?.attributes?.seo
  const title = program?.attributes?.name;
  const description = program?.attributes?.description;
  const imageProgram = program?.attributes?.image?.data?.attributes?.url;
  const singleTypeAttributes = layout?.attributes;
  const bannerData = singleTypeAttributes?.banner;
  const videoId = singleTypeAttributes?.videoId;

  const feedbackData = layout?.attributes?.feedback;

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  let campusLabel = "plantel";

  if (BUSINESS_UNIT === "UANE" || BUSINESS_UNIT === "ULA") {
    campusLabel = "campus";
  }

  //estado para información
  const [optionsSelect, setSelectOptions] = useState<Array<SelectItem>>([]);
  const [tabActive, setTabActive] = useState<number>(0);

  const selectedOption = optionsSelect?.find((option) => { return option?.active })

  const modalities = program?.attributes?.programModalities
  const selectedModality = modalities?.[tabActive]

  const formattedModalityData = formatModalityDataBachillerato(selectedModality, layout)

  const campusDetail = formattedModalityData?.curriculumsByCampus
  const hasCampuses = campusDetail?.some((option) => { return !!option?.campusName })

  const structuredData = JSON.stringify(seo?.structuredData)


  //bandera para habilitar botón de descarga hasta que se seleccione un campus
  const isOptionSelected = !!selectedOption

  //Obtener información para el nivel

  type SelectItem = {
    value: string;
    text: string;
    active: boolean;
  }

  const handleSetActiveTab = (active: number) => {
    setTabActive(active);
  }

  const options: Array<SelectItem> = campusDetail?.map(campusName => ({ value: campusName?.campusName, text: campusName?.campusName, active: false }));

  useEffect(() => {
    setSelectOptions(options);
  }, [tabActive])

  const downloadFileProgram = () => {
    if (hasCampuses) {
      const selectedCampus = campusDetail?.find((element) => { return element?.campusName === selectedOption?.value })
      const curriculum = selectedCampus?.curriculumUrl
      if (!curriculum) return
      window.open(curriculum, "_blank")
    }
    const curriculum = campusDetail?.[0]?.curriculumUrl
    if (!curriculum) return
    window.open(curriculum, "_blank")
  }

  const handleSelectOption = async ({ detail }: CustomEvent) => {
    const selectedCampusNameValue = detail;
    const selectOptions = optionsSelect?.map(option => {
      return { ...option, active: option?.value === selectedCampusNameValue }
    })
    setSelectOptions(selectOptions)
  }

  return (
    <Fragment>
      <Head>
      <title>{title}</title>
        {/* THIS DATA COMES FROM STRAPI SEO */}
        <meta property="title" content={seo?.metaTitle} />{/* metaTitle */}
        <meta name="description" content={seo?.metaDescription} key="desc" />{/* metaDescription */}
        <meta property="image" content={seo?.metaImage?.data?.attributes?.url} />{/* metaImage */}
        {/* metaSocial */}
        {/* ARRAY COULD BRING FACEBOOK OR TWITTER */}
        {
          seo?.metaSocial?.map((metasocial) => {
            if (metasocial?.socialNetwork === "Facebook") {
              return (
                <>
                  <meta property="og:title" content={metasocial?.title} />
                  <meta property="og:description" content={metasocial?.description} />
                  <meta property="og:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            } if (metasocial?.socialNetwork === "Twitter") {
              return (
                <>
                  <meta property="twitter:title" content={metasocial?.title} />
                  <meta property="twitter:description" content={metasocial?.description} />
                  <meta property="twitter:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            }
          })
        }
        {/* keywords */}
        <meta name="keywords" content={seo?.keywords} />
        {/* metaRobots */}
        <meta name="robots" content={seo?.metaRobots} />
        {/* metaViewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        {/* canonicalURL */}
        <link rel="canonical" href={seo?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={seo?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{structuredData}</script>
      </Head>
      <ContentLayout>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:mb-12 flex flex-col desktop:justify-center">
          <h1 className="desktop:text-7xl font-bold font-headings leading-13 tablet:semi-tight mobile:leading-tight tablet:text-8.5 mobile:text-7.5 mb-6">{title}</h1>
          {/* <Heading variant="h1" className="desktop:text-7xl font-bold font-headings leading-13 tablet:semi-tight mobile:leading-tight tablet:text-8.5 mobile:text-7.5 mb-6">{title}</Heading> */}
          <RichtText data={{
            content: description
          }} />
        </div>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:mb-12 mobile:hidden mb-10 mt-6 flex flex-col desktop:justify-center">
          <Aspect ratio={"2/1"}>
            <Image
              alt={title || "Programa de Bachillerato"}
              src={imageProgram}
              classNamesImg="w-full h-full object-cover rounded-lg"
              classNames="w-full h-full"
            />
          </Aspect>
        </div>
      </ContentLayout>
      <ContentLayout classNames="w-d-base:px-0">
        {
          feedbackData ?
            <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 mt-6 mb-18 mobile:mb-6">
              <Alert {...feedbackData} />
            </div>
            : null
        }
      </ContentLayout>
      <ContentFullLayout>
        <div className="desktop:hidden tablet:hidden col-span-4 mb-10 mt-6">
          <Aspect ratio={"4/3"}>
            <Image
              alt={title || "Programa de Bachillerato"}
              src={imageProgram}
              classNamesImg="w-full h-full object-cover rounded-lg"
              classNames="w-full h-full"
            />
          </Aspect>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 mb-6">
          <h2 className="text-6.5 font-headings font-semibold leading-tight tablet:leading-tight mobile:leading-tight tablet:text-6 mobile:text-6">{`Para cursar ${title} necesitas: `} </h2>
          {/* <Heading variant="h4" as="h2">{`Para cursar ${title} necesitas: `}</Heading> */}
        </div>
        <div className="tablet:hidden mobile:hidden col-span-12 tablet:col-span-8 mobile:col-span-4 flex justify-center">
          <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.labelModality || modality?.modality?.data?.attributes?.label || modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 tablet:flex tablet:justify-center">
          <section className="desktop:hidden">
            <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.labelModality || modality?.modality?.data?.attributes?.label || modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
          </section>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <ContentInsideLayout classNames="gap-6 col-span-12 tablet:col-span-8 mobile:col-span-4">
          {
            formattedModalityData?.cards?.map((items, i: number) => {
              return <Fragment key={`section-${i}`}>
                <DescriptionSection
                  mode="light"
                  title=""
                  description={items?.text}
                  classNames={cn("col-span-7 grid grid-cols-7 gap-6 tablet:col-span-8 tablet:grid-cols-8 mobile:col-span-4 py-10 tablet:py-24 mobile:flex mobile:flex-col mobile:p-6", { "desktop:order-2 tablet:order-1 mobile:order-1": i === 1 })}
                  titleStyles="col-start-2 col-end-7 tablet:col-end-8"
                  descriptionStyles="col-start-2 col-end-7 tablet:col-end-8"
                />
                <Image
                  alt={"image"}
                  src={items?.image?.desktop}
                  classNames={cn("w-full h-fit col-span-5 tablet:col-span-8 mobile:col-span-4 tablet:col-start-2 tablet:col-end-8", { "desktop:order-1 tablet:order-2 mobile:order-2": i === 1 })}
                  classNamesImg={cn("w-full !h-auto !relative col-span-5 tablet:col-span-8 mobile:col-span-4 tablet:col-start-2 tablet:col-end-8", { "desktop:order-1 tablet:order-2 mobile:order-2": i === 1 })}
                />
              </Fragment>
            })
          }
        </ContentInsideLayout>
      </ContentLayout>
      <ContentLayout classNames="mt-6">
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 mt-6">
          <h2 className="text-6.5 font-headings font-semibold leading-tight tablet:leading-tight mobile:leading-tight tablet:text-6 mobile:text-6">{"Plan de estudios"}</h2>
          {/* <Heading variant="h4" as="h2">{"Plan de estudios"}</Heading> */}
        </div>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 leading-tight desktop:order-1 tablet:order-1">
          {
            formattedModalityData?.curriculumDescription
              ? <RichtText font="light" data={{ content: formattedModalityData?.curriculumDescription }} />
              : null
          }
          {
            hasCampuses ?
              <>
                <div className="">
                  <div className="flex gap-1">
                    <p className="font-texts font-normal text-xs mb-0">Los planes de estudio pueden variar por</p>
                    <span className="font-texts font-normal text-xs mb-0">{campusLabel}</span>
                    <span className="font-texts font-normal text-xs mb-0">*</span>
                  </div>
                  <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{ ...SelectInit, textDefault: `Elige el ${campusLabel} de tu interés` }} options={optionsSelect} flagHeight={true} />
                </div>
                <div className="my-6">
                  <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected }} onClick={downloadFileProgram} />
                </div>
              </>
              : <div className="my-6">
                <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios" }} onClick={downloadFileProgram} />
              </div>
          }
        </div>
        {
          videoId ?
            <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:mb-12 desktop:order-1 tablet:order-2 h-100">
              <Video data={{ options: { id: videoId, type: 'single', controls: true } }} />
            </div>
            : null
        }
      </ContentLayout>
      {
        bannerData?.desktopImage ?
          <div className="order-last col-span-12 tablet:col-span-8 mobile:col-span-4 mt-6">
            <Banner type={"ComponentSectionsBanner"} {...bannerData} />
          </div>
          : null
      }
    </Fragment>
  );
};

export default ProgramBachilleratoPageContent;