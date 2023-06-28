import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import RichtText from "@/old-components/Richtext/Richtext";
import TabsFeatured from "@/old-components/TabsFeatured";
import Select from "@/old-components/Select";
import { ButtonInit, SelectInit } from "@/old-components/fixture";
import OutstandingContainer from "@/old-components/OutstandingContainerPortalverse";
import Banner from "@/components/sections/Banner";
import { formatModalityDataSuperior } from "@/utils/programDetail";
import type { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailSuperiorData } from "@/utils/getProgramDetailSuperior";

const ProgramSuperiorPageContent = (props: DynamicProgramDetailData) => {
  const program = props?.program;
  const layout = props?.layout as ProgramDetailSuperiorData;
  const title = program?.attributes?.name;
  const description = program?.attributes?.description;
  const levelProgram = program?.attributes?.level?.data?.attributes?.title;
  const imageProgram = program?.attributes?.image?.data?.attributes?.url;
  const singleTypeAttributes = layout?.attributes;
  const bannerData = singleTypeAttributes?.banner;

  //estado para información
  const [optionsSelect, setOptionsSelect] = useState<Array<SelectItem>>([]);
  const [tabActive, setTabActive] = useState<number>(0);

  const modalities = program?.attributes?.programModalities
  const selectedModality = modalities?.[tabActive]

  const formattedModalityData = formatModalityDataSuperior(selectedModality, layout)
  const campusDetail = formattedModalityData?.curriculumsByCampus
  const hasCampuses = campusDetail?.some((option) => { return !!option?.campusName })

  const selectedOption = optionsSelect?.find((testOption) => { return testOption?.active })

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

  useEffect(() => {
    const options: Array<SelectItem> = campusDetail?.map(campusName => ({ value: campusName?.campusName, text: campusName?.campusName, active: false }));

    setOptionsSelect(options);
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

  const handleSelectOption = ({ detail }: CustomEvent) => {
    const selectedCampusNameValue = detail;
    const selectOptions = optionsSelect?.map(testOption => {
      return { ...testOption, active: testOption?.value === selectedCampusNameValue }
    })
    setOptionsSelect(selectOptions)
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
      <ContentFullLayout classNames="w-d:hidden w-t:hidden mb-10 mt-6">
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
          <p className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">{`Modalidades disponibles en esta ${levelProgram}`}</p>
        </div>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
          <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
          <section className="w-d:hidden">
            <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
          </section>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            <OutstandingContainer items={formattedModalityData?.cards} />
          }
          <div className="w-d:mt-18 mt-6 gap-6 grid w-d:grid-cols-2 grid-cols-1">
            {
              hasCampuses ?
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                  <h1 className="ac-type-h5-bold-solid-poppins-desktop w-t:ac-type-h5-bold-solid-poppins-tabmob w-p:ac-type-h5-bold-solid-poppins-tabmob">Selecciona un campus para descargar tu plan de estudios en esta modalidad</h1>
                  <div className="my-6">
                    <p className="font-Nunito-Sans font-normal text-xs mb-0">Los planes de estudio pueden variar por campus*</p>
                    <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{ ...SelectInit, textDefault: "Elige el campus de tu interés", icon: "apartment" }} options={optionsSelect} flagHeight={true} />
                  </div>
                  <div className="flex justify-center">
                    <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected, icon: "download" }} onClick={downloadFileProgram} />
                  </div>
                </div> :
                <>
                  <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
                    <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", icon: "download" }} onClick={downloadFileProgram} />
                  </div></>
            }
          </div>
        </div>
      </ContentLayout>
      <div className="order-last col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6 w-d:mt-18">
        <Banner type={"ComponentSectionsBanner"} {...bannerData} />
      </div>
    </Fragment>
  );
};

export default ProgramSuperiorPageContent;
