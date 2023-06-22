import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import cn from "classnames";
import ContentLayout from "@/layouts/Content.layout";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import RichtText from "@/old-components/Richtext/Richtext";
import TabsFeatured from "@/old-components/TabsFeatured";
import DescriptionSection from "@/old-components/DescriptionSection";
import Select from "@/old-components/Select";
import Video from "@/old-components/Video";
import { ButtonInit, SelectInit } from "@/old-components/fixture";
import parseEditorRawData from "@/utils/parseEditorRawData";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import Banner from "@/components/sections/Banner";
import { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailBachilleratoData } from "@/utils/getProgramDetailBachillerato";


const ProgramBachilleratoPageContent = (props: DynamicProgramDetailData) => {
  const program = props?.program;
  const layout = props?.layout as ProgramDetailBachilleratoData;

  const dataProgram = program?.attributes;
  const level = dataProgram?.level?.data?.attributes?.title;
  const title = dataProgram?.name;
  const description = dataProgram?.description;
  const imageProgram = dataProgram?.image?.data?.attributes?.url;
  const programModalities = dataProgram?.programModalities;
  const singleTypeAttributes = layout?.attributes;
  const admissionProfileImage =
    singleTypeAttributes.admissionProfileImage?.data?.attributes?.url;
  const graduateProfileImage =
    singleTypeAttributes.graduateProfileImage?.data?.attributes?.url;
  const videoId = singleTypeAttributes?.videoId;
  const bannerData = singleTypeAttributes.banner;

  //estado para información
  const [optionsSelect, setSelectOptions] = useState<Array<SelectItem>>([]);
  const [tabActive, setTabActive] = useState<number>(0);

  const selectedOption = optionsSelect?.find((testOption) => {
    return testOption?.active;
  });

  //bandera para habilitar botón de descarga hasta que se seleccione un campus
  const isOptionSelected = !!selectedOption;

  const getInfoModality = () => {
    const programDetailModality: {
      modality: string;
      descriptionData: { description: any; image: { src: string } }[];
      curriculumByCampus: { campusName: string; curriculumUrl: string }[];
      curriculumDescription: string;
      video: string;
    }[] = [];
    programModalities?.forEach((programModality) => {
      const modality = programModality?.modality?.data?.attributes?.name;
      const admissionProfile = parseEditorRawData(
        programModality?.admissionProfile
      );
      const graduateProfile = parseEditorRawData(
        programModality?.graduateProfile
      );
      const descriptionData = [
        {
          description: admissionProfile,
          image: { src: admissionProfileImage },
        },
        {
          description: graduateProfile,
          image: { src: graduateProfileImage },
        },
      ];
      const curriculumByModality = programModality?.curriculums;
      const curriculumByCampus: {
        campusName: string;
        curriculumUrl: string;
      }[] = [];
      curriculumByModality.map((campus) => {
        const campusName = campus?.campus?.data?.attributes?.name;
        const curriculumUrl = campus?.curriculum?.data?.attributes?.url;
        curriculumByCampus.push({ campusName, curriculumUrl });
      });
      const curriculumDescription = parseEditorRawData(
        programModality?.curriculumDescription
      );
      const video = videoId;
      programDetailModality.push({
        modality,
        descriptionData,
        curriculumByCampus,
        curriculumDescription,
        video,
      });
    });
    return programDetailModality;
  };
  const informationModality = getInfoModality();

  type SelectItem = {
    value: string;
    text: string;
    active: boolean;
  };

  const selectedItem = informationModality[tabActive];
  const dataCardsDescription = Object?.values(selectedItem?.descriptionData);

  const campusDetail = selectedItem?.curriculumByCampus;
  const hasCampuses = campusDetail?.some((option) => {
    return !!option?.campusName;
  });

  //obtener arreglo para la data de las cards
  const dataTabs = [];
  dataTabs.push(dataCardsDescription);

  const handleSetActiveTab = (active: number) => {
    setTabActive(active);
  };

  const options: Array<SelectItem> = campusDetail?.map((campusName) => ({
    value: campusName?.campusName,
    text: campusName?.campusName,
    active: false,
  }));

  useEffect(() => {
    setSelectOptions(options);
  }, [tabActive]);

  const downloadFileProgram = () => {
    if (hasCampuses) {
      const selectedCampus = campusDetail?.find((element) => {
        return element?.campusName === selectedOption?.value;
      });
      const curriculum = selectedCampus?.curriculumUrl;
      if (!curriculum) return;
      window.open(curriculum, "_blank");
    }
    const curriculum = campusDetail?.[0]?.curriculumUrl;
    if (!curriculum) return;
    window.open(curriculum, "_blank");
  };

  const handleSelectOption = async ({ detail }: CustomEvent) => {
    const selectedCampusNameValue = detail;
    const selectOptions = optionsSelect?.map((testOption) => {
      return {
        ...testOption,
        active: testOption?.value === selectedCampusNameValue,
      };
    });
    setSelectOptions(selectOptions);
  };

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <h1 className="text-13 font-bold font-Poppins leading-13 w-t:leading-[111%] w-p:leading-[125%] w-t:text-8.5 w-p:text-7.5 mb-6">
            {title}
          </h1>
          <RichtText
            data={{
              content: description,
            }}
          />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-p:hidden mb-10 mt-6">
          <Image
            alt={imageProgram}
            src={imageProgram}
            classNamesImg="w-full !h-auto !relative"
            classNames="w-full h-fit"
          />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden w-t:hidden mb-10 mt-6">
        <Image
          alt={imageProgram}
          src={imageProgram}
          classNames="aspect-2/1"
          classNamesImg="aspect-2/1"/>
      </ContentFullLayout>  
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
          <p className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">
            {`Para cursar ${title} necesitas: `}{" "}
          </p>
        </div>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <TabsFeatured
            tabs={informationModality?.map((modality) => ({
              label: modality?.modality,
            }))}
            onActive={(active: number) => handleSetActiveTab(active)}
          />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <section className="w-d:hidden">
            <TabsFeatured
              tabs={informationModality?.map((modality) => ({
                label: modality?.modality,
              }))}
              onActive={(active: number) => handleSetActiveTab(active)}
            />
          </section>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <ContentInsideLayout classNames="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
          {dataTabs?.map((items: any, i: number) => {
            return items?.map(
              (
                {
                  image,
                  title: contentTitle,
                  description: contentDescription,
                }: any,
                j: number
              ) => (
                <Fragment key={`section-${j}`}>
                  <DescriptionSection
                    title={contentTitle}
                    description={contentDescription}
                    classNames={cn(
                      "col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6",
                      { "w-d:order-2 w-t:order-1 w-p:order-1": j === 1 }
                    )}
                    titleStyles="col-start-2 col-end-7 w-t:col-end-8"
                    descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                  />
                  <Image
                    alt={image?.alt || "image"}
                    src={image?.src}
                    classNames={cn(
                      "w-full h-fit col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8",
                      { "w-d:order-1 w-t:order-2 w-p:order-2": j === 1 }
                    )}
                    classNamesImg={cn(
                      "w-full !h-auto !relative col-span-5 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8",
                      { "w-d:order-1 w-t:order-2 w-p:order-2": j === 1 }
                    )}
                  />
                </Fragment>
              )
            );
          })}
        </ContentInsideLayout>
      </ContentLayout>
      <ContentLayout classNames="mt-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
          <h4 className="text-6.5 font-Poppins font-semibold leading-[125%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-6 w-p:text-6">
            {"Plan de estudios"}
          </h4>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 leading-[125%] w-d:order-1 w-t:order-1">
          <RichtText
            font="light"
            data={{ content: selectedItem?.curriculumDescription }}
          />
          {hasCampuses ? (
            <>
              <div className="my-6">
                <p className="font-Nunito-Sans font-normal text-xs mb-0">
                  Los planes de estudio pueden variar por campus*
                </p>
                <Select
                  onClick={(option: CustomEvent) => handleSelectOption(option)}
                  data={{
                    ...SelectInit,
                    textDefault: "Elige el campus de tu interés",
                  }}
                  options={optionsSelect}
                  flagHeight={true}
                />
              </div>
              <Button
                dark
                data={{
                  ...ButtonInit,
                  title: "Descarga el plan de estudios",
                  disabled: !isOptionSelected,
                  icon: "download",
                }}
                onClick={downloadFileProgram}
              />
            </>
          ) : (
            <div className="my-6">
              <Button
                dark
                data={{
                  ...ButtonInit,
                  title: "Descarga el plan de estudios",
                  icon: "download",
                }}
                onClick={downloadFileProgram}
              />
            </div>
          )}
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-d:order-1 w-t:order-2">
          <Video
            dimensions={["450px", "400px", "200px"]}
            data={{
              options: {
                id: selectedItem?.video,
                type: "single",
                controls: true,
              },
              dimensions: { height: "330px", width: "100%" },
            }}
          />
        </div>
      </ContentLayout>
      <div className="order-last col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
        <Banner type={"ComponentSectionsBanner"} {...bannerData} />
      </div>
    </Fragment>
  );
};

export default ProgramBachilleratoPageContent;
