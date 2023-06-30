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
import Select from "@/old-components/Select";
import Video from "@/old-components/Video";
import { ButtonInit, SelectInit } from "@/old-components/fixture";
import Banner from "@/components/sections/Banner";
import { formatModalityDataBachillerato } from "@/utils/programDetail";
import type { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailBachilleratoData } from "@/utils/getProgramDetailBachillerato";

const ProgramBachilleratoPageContent = (props: DynamicProgramDetailData) => {

  const program = props?.program;
  const layout = props?.layout as ProgramDetailBachilleratoData;
  const title = program?.attributes?.name;
  const description = program?.attributes?.description;
  const imageProgram = program?.attributes?.image?.data?.attributes?.url;
  const singleTypeAttributes = layout?.attributes;
  const bannerData = singleTypeAttributes?.banner;
  const videoId = singleTypeAttributes?.videoId;

  //estado para información
  const [optionsSelect, setSelectOptions] = useState<Array<SelectItem>>([]);
  const [tabActive, setTabActive] = useState<number>(0);

  const selectedOption = optionsSelect?.find((option) => { return option?.active })

  const modalities = program?.attributes?.programModalities
  const selectedModality = modalities?.[tabActive]

  const formattedModalityData = formatModalityDataBachillerato(selectedModality, layout)

  const campusDetail = formattedModalityData?.curriculumsByCampus
  const hasCampuses = campusDetail?.some((option) => { return !!option?.campusName })

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
      </Head>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <h1 className="text-13 font-bold font-Poppins leading-13 w-t:leading-[111%] w-p:leading-[125%] w-t:text-8.5 w-p:text-7.5 mb-6">{title}</h1>
          <RichtText data={{
            content: description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-p:hidden mb-10 mt-6">
          <Image
            alt={"image"}
            src={imageProgram}
            classNamesImg="w-full !h-auto !relative"
            classNames="w-full h-fit"
          />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="w-d:hidden w-t:hidden col-span-4 mb-10 mt-6">
          <Image
            alt={"image"}
            src={imageProgram}
            classNamesImg="w-full !h-auto !relative"
            classNames="w-full h-fit" />
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
          <p className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">{`Para cursar ${title} necesitas: `} </p>
        </div>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:flex w-t:justify-center">
          <section className="w-d:hidden">
            <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
          </section>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <ContentInsideLayout classNames="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            formattedModalityData?.cards?.map((items, i: number) => {
              return <Fragment key={`section-${i}`}>
                <DescriptionSection
                  title=""
                  description={items?.text}
                  classNames={cn("col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6", { "w-d:order-2 w-t:order-1 w-p:order-1": i === 1 })}
                  titleStyles="col-start-2 col-end-7 w-t:col-end-8"
                  descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                />
                <Image
                  alt={"image"}
                  src={items?.image?.desktop}
                  classNames={cn("w-full h-fit col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8", { "w-d:order-1 w-t:order-2 w-p:order-2": i === 1 })}
                  classNamesImg={cn("w-full !h-auto !relative col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8", { "w-d:order-1 w-t:order-2 w-p:order-2": i === 1 })}
                />
              </Fragment>
            })
          }
        </ContentInsideLayout>
      </ContentLayout>
      <ContentLayout classNames="mt-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
          <h4 className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">{"Plan de estudios"}</h4>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 leading-[125%] w-d:order-1 w-t:order-1">
          {
            formattedModalityData?.curriculumDescription
            ? <RichtText font="light" data={{ content: formattedModalityData?.curriculumDescription }} />
            : null
          }
          {
            hasCampuses ?
              <>
                <div className="my-6">
                  <p className="font-Nunito-Sans font-normal text-xs mb-0">Los planes de estudio pueden variar por campus*</p>
                  <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{ ...SelectInit, textDefault: "Elige el campus de tu interés" }} options={optionsSelect} flagHeight={true} />
                </div>
                <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected, icon: "download" }} onClick={downloadFileProgram} />
              </>
              : <div className="my-6">
                <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", icon: "download" }} onClick={downloadFileProgram} />
              </div>
          }
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-d:order-1 w-t:order-2">
          <Video dimensions={["450px", "400px", "200px"]} data={{ options: { id: videoId, type: 'single', controls: true }, dimensions: { height: '330px', width: '100%' } }} />
        </div>
      </ContentLayout>
      <div className="order-last col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
        <Banner type={"ComponentSectionsBanner"} {...bannerData} />
      </div>
    </Fragment>
  );
};

export default ProgramBachilleratoPageContent;
