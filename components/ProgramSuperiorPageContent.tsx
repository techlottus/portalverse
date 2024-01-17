import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import TabsFeatured from "@/old-components/TabsFeatured";
import Select from "@/old-components/Select/Select";
import { ButtonInit, SelectInit } from "@/old-components/fixture";
import OutstandingContainer from "@/old-components/OutstandingContainerPortalverse";
import Banner from "@/components/sections/Banner";
import IntroductionProgram from "@/old-components/IntroducctionProgram";
import Aspect from "@/components/Aspect";
import AtrProgramInfo from "@/components/sections/AtrProgramInfo";
import { formatModalityDataSuperior } from "@/utils/programDetail";
import cn from 'classnames';
import Link from "next/link";
import routesConfig from 'routesConfig.json';
import Container from "@/layouts/Container.layout";
import type { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailSuperiorData } from "@/utils/getProgramDetailSuperior";

type SelectItem = {
  value: string;
  text: string;
  active: boolean;
};

const ProgramSuperiorPageContent = (props: DynamicProgramDetailData) => {
  const program = props?.program;
  const layout = props?.layout as ProgramDetailSuperiorData;
  const title = program?.attributes?.name;
  const description = program?.attributes?.description;
  const levelProgram = program?.attributes?.level?.data?.attributes?.title;
  const imageProgram = program?.attributes?.image?.data?.attributes?.url;
  const singleTypeAttributes = layout?.attributes;
  const bannerData = singleTypeAttributes?.banner;

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  let campusLabel = "plantel";

  if (BUSINESS_UNIT === "UANE" || BUSINESS_UNIT === "ULA") {
    campusLabel = "campus";
  }

  const titleTabs = levelProgram === "Doctorado" ? "Modalidades disponibles en este" : "Modalidades disponibles en esta"
  //estado para información
  const [optionsSelect, setOptionsSelect] = useState<Array<SelectItem>>([]);
  const [tabActive, setTabActive] = useState<number>(0);

  const modalities = program?.attributes?.programModalities

  const selectedModality = modalities?.[tabActive]
  const selectedModalityName = selectedModality?.modality?.data?.attributes?.name?.toLowerCase();;
  const programSubtitle = selectedModalityName === "a tu ritmo" ? selectedModality?.modality?.data?.attributes?.name : levelProgram === "Bachillerato" ? levelProgram : program?.attributes?.knowledgeAreas?.data?.[0]?.attributes?.name;

  const certificationMessage = program?.attributes?.certificationMessage;
  const offerPrice = program?.attributes?.offerPrice;
  const price = program?.attributes?.price;
  const discount = program?.attributes?.discount;
  const discountPercentageText = program?.attributes?.discountPercentageText;
  const periodicity = program?.attributes?.periodicity;

  const programModality = modalities?.[tabActive]?.modality?.data?.attributes?.name?.toLowerCase();

  const checkoutUrl = program?.attributes?.checkoutUrl && (programModality === "online" || programModality === "a tu ritmo") ? program?.attributes?.checkoutUrl : "";
  const checkoutUrlText = program?.attributes?.checkoutUrlText && (programModality === "online" || programModality === "a tu ritmo") ? program?.attributes?.checkoutUrlText : "";

  const programPerks = modalities?.[tabActive]?.programPerks;

  const brands = program?.attributes?.brands

  const programModalityDescription = modalities?.[tabActive]?.modalityDescription ? modalities?.[tabActive]?.modalityDescription : description

  const formattedModalityData = formatModalityDataSuperior(selectedModality, layout)
  const campusDetail = formattedModalityData?.curriculumsByCampus
  const hasCampuses = campusDetail?.some((option) => { return !!option?.campusName })

  const selectedOption = optionsSelect?.find((testOption) => { return testOption?.active })

  //bandera para habilitar botón de descarga hasta que se seleccione un campus
  const isOptionSelected = !!selectedOption

  //Obtener información para el nivel
  const handleSetActiveTab = (active: number) => {
    setTabActive(active);
  };

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

  const relatedPrograms = program?.attributes?.relatedPrograms?.data;

  /**
   * This is a flag that toggles between mosaic and list view. Since list view is yet to be implemented/polished,
   * mosaicActive is set to true. 
   */
  const mosaicActive = true;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          {
            selectedModalityName === "online" || selectedModalityName === "a tu ritmo" ?
              <IntroductionProgram
                title={title}
                brands={brands?.data}
                checkoutUrlText={checkoutUrlText}
                label={programSubtitle}
                description={programModalityDescription}
                periodicity={periodicity}
                certificationMessage={certificationMessage}
                price={price}
                offerPrice={offerPrice}
                discount={discount}
                checkoutUrl={checkoutUrl}
                discountPercentajeText={discountPercentageText}
                image={{
                  alt: title,
                  src: imageProgram
                }}
                programPerks={programPerks?.data}
              />
              :
              <IntroductionProgram
                title={title}
                label={programSubtitle}
                description={programModalityDescription}
                periodicity={periodicity}
                certificationMessage={certificationMessage}
                image={{
                  alt: title,
                  src: imageProgram
                }}
                programPerks={programPerks?.data}
              />
          }
        </div>
      </ContentLayout>
      {/* <ContentFullLayout classNames="w-d:hidden w-t:hidden mb-10 mt-6">
        <div className="w-d:hidden w-t:hidden col-span-4 mb-10 mt-6">
          <Aspect ratio={"4/3"}>
            <Image
              alt={title || "Programa de Nivel Superior"}
              src={imageProgram}
              classNamesImg="w-full h-full object-cover"
              classNames="w-full h-full"
            />
          </Aspect>
        </div>
      </ContentFullLayout> */}
      {
        selectedModalityName !== "a tu ritmo" ?
          <>
            <ContentLayout>
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
                <p className="text-6.5 font-headings font-semibold leading-tight w-t:leading-tight w-p:leading-tight w-t:text-6 w-p:text-6">{`${titleTabs} ${levelProgram}`}</p>
              </div>
              <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
                <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.labelModality || modality?.modality?.data?.attributes?.label || modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
              </div>
            </ContentLayout>
            <ContentFullLayout>
              <div className="col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
                <section className="w-d:hidden">
                  <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality?.labelModality || modality?.modality?.data?.attributes?.label || modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
                </section>
              </div>
            </ContentFullLayout>
          </>
          : null
      }
      <ContentLayout>
        <div className="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            <OutstandingContainer items={formattedModalityData?.cards} reverse={selectedModalityName === "a tu ritmo"} />
          }
          <div className="w-d:mt-18 mt-6 gap-6 grid w-d:grid-cols-2 grid-cols-1">
            {
              hasCampuses ?
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                  <div className="flex gap-1">
                    <span className="font-headings">Selecciona un</span>
                    <span className="font-headings">{campusLabel}</span>
                    <span className="font-headings">para descargar tu plan de estudios en esta modalidad</span>
                  </div>
                  <div className="my-6">
                    <div className="flex gap-1">
                      <p className="font-texts font-normal text-xs mb-0">Los planes de estudio pueden variar por</p>
                      <span className="font-texts font-normal text-xs mb-0">{campusLabel}</span>
                      <span className="font-texts font-normal text-xs mb-0">*</span>
                    </div>
                    <Select onClick={(option: CustomEvent) => handleSelectOption(option)} data={{ ...SelectInit, textDefault: `Elige el ${campusLabel} de tu interés`, icon: "apartment" }} options={optionsSelect} flagHeight={true} />
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
      {
        bannerData?.desktopImage ?
          <div className="order-last col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6 w-d:mt-18">
            <Banner type={"ComponentSectionsBanner"} {...bannerData} />
          </div>
          : null
      }
      {
        selectedModalityName === "a tu ritmo" && relatedPrograms?.length > 0 ?
          <Container classNames="mt-20">
            <h3 className="font-headings font-bold text-8 leading-10 md:text-10 md:leading-12">Programas académicos</h3>
            <div className="grid grid-cols-12 w-t:grid-cols-8 w-p:grid-cols-4 gap-6 mt-12">
              {
                relatedPrograms?.map((relatedProgram, index) => {
                  const programAttributes = relatedProgram?.attributes;
                  const image = relatedProgram?.attributes?.image;
                  const programLevelName = relatedProgram?.attributes?.level?.data?.attributes?.title;
                  const levelRoute = routesConfig?.educationalLevels?.find(educationalLevel => educationalLevel?.name === programLevelName)?.path;

                  return (
                    <div
                      key={`program-${index}`}
                      className={cn("flex hover:shadow-30 rounded-lg h-full border border-solid border-surface-200 overflow-hidden", {
                        "flex-col w-d:col-span-3 w-t:col-span-4 w-p:col-span-4":
                          mosaicActive,
                        "w-d:col-span-12 w-t:col-span-8 w-p:col-span-4":
                          !mosaicActive,
                      })}
                    >
                      <div>
                        {/* TODO: Handle mosaic view dimensions */}
                        <Aspect ratio="4/3">
                          <Image
                            classNames="w-full h-full"
                            classNamesImg="w-full h-full object-cover"
                            src={image?.data?.attributes?.url}
                            alt={image?.data?.attributes?.alternativeText || programAttributes?.name || ""}
                          />
                        </Aspect>
                      </div>
                      <div className="flex flex-col h-full">
                        <p className="font-texts font-normal text-4.5 mt-3 mx-3">
                          {programAttributes?.name}
                        </p>
                        <div className="w-full h-full flex justify-end pb-3 pr-1 font-texts font-bold items-end">
                          <Link
                            href={`${levelRoute}/${programAttributes?.slug}`}
                            className="flex items-center justify-end font-texts font-bold"
                          >
                            <span className="mr-1 select-none">Ver más</span>
                            <span className="material-symbols-outlined icon select-none">chevron_right</span>
                          </Link>
                        </div>
                      </div>
                      {/* S */}
                    </div>
                  );
                })
              }
            </div>
          </Container>
          : null
      }
      {
        selectedModalityName === "a tu ritmo" ?
          <div className="mt-20">
            <AtrProgramInfo checkoutUrl={checkoutUrl} />
          </div>
          : null
      }
    </Fragment>
  );
};

export default ProgramSuperiorPageContent;
