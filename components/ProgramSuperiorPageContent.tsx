import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import cn from 'classnames';
import Link from "next/link";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Container from "@/layouts/Container.layout";
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
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Modal from "@/old-components/Modal/Modal";
import RichTextImage from "@/components/sections/RichTextImage";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import routesConfig from 'routesConfig.json';
import { formatModalityDataSuperior } from "@/utils/programDetail";
import type { DynamicProgramDetailData } from "@/utils/pages";
import type { ProgramDetailSuperiorData } from "@/utils/getProgramDetailSuperior";
import ContainerForm from "./sections/ContainerForm";
import PaymentCardContainer from "./sections/PaymentCardContainer";

type SelectItem = {
  value: string;
  text: string;
  active: boolean;
};

const ProgramSuperiorPageContent = (props: DynamicProgramDetailData) => {

  const program = props?.program;
  const SFprogram = program.attributes.nombreProgramaSalesforce
  const layout = props?.layout as ProgramDetailSuperiorData;
  const seo = props?.program?.attributes?.seo
  const structuredData = JSON.stringify(seo?.structuredData)
  const title = program?.attributes?.name;
  const description = program?.attributes?.description;
  const levelProgram = program?.attributes?.level?.data?.attributes?.title;
  const imageProgram = program?.attributes?.image?.data?.attributes?.url;
  const singleTypeAttributes = layout?.attributes;
  const bannerData = singleTypeAttributes?.banner;
  const price_list = program?.attributes?.price_list;
  const program_rvoes = program?.attributes?.program_rvoes;
  const hasRvoe = program?.attributes?.HasRvoe;

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  let campusLabel = "plantel";

  if (BUSINESS_UNIT === "UANE" || BUSINESS_UNIT === "ULA") {
    campusLabel = "campus";
  }

  const titleTabs = levelProgram === "Doctorado" ? "Modalidades disponibles en este" : "Modalidades disponibles en esta"

  const titleLearn = levelProgram === "Doctorado" ? "¿Que aprenderé en este" : "¿Que aprenderé en esta"
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

  //General Data program
  const gralAdmissionProfile = program?.attributes?.admissionProfile;
  const gralGraduateProfile = program?.attributes?.graduateProfile;
  const gralLaborField = program?.attributes?.laborField;
  const gralAdmissionRequirements = program?.attributes?.admissionRequirements

  //ModalityCharacteristics
  const characteristicsdesktopBgImage = selectedModality?.modality?.data?.attributes?.desktopImage?.data?.attributes?.url;
  const characteristicsTabletBgImage = selectedModality?.modality?.data?.attributes?.tabletImage?.data?.attributes?.url
  const characteristicsMobileBgImage = selectedModality?.modality?.data?.attributes?.mobileImage?.data?.attributes?.url
  const characteristicsTitle = selectedModality?.modality?.data?.attributes?.Characteristics?.title;
  const characteristicsSubtitle = parseEditorRawData(selectedModality?.modality?.data?.attributes?.Characteristics?.subtitle);
  const characteristicsInformativeIcons = selectedModality?.modality?.data?.attributes?.Characteristics?.InformativeIcons;
  const summaries = selectedModality?.summaries;
  const characteristicsModalityTitle = selectedModality?.modality?.data?.attributes?.label ? selectedModality?.modality?.data?.attributes?.label : selectedModality?.modality?.data?.attributes?.name;

  //testimonials
  const testimonials = {
    title: program?.attributes?.testimonials?.title,
    description: program?.attributes?.testimonials?.description,
    bgImageDesktop: program?.attributes?.testimonials?.bgImageDesktop,
    bgImageTablet: program?.attributes?.testimonials?.bgImageTablet,
    bgImageMobile: program?.attributes?.testimonials?.bgImageMobile,
    testimonialsCards: program?.attributes?.testimonials?.testimonialCards
  }

  //RVOE Section
  const rvoeTitle = layout?.attributes?.rvoeTitle;
  const rvoeDescription = layout?.attributes?.rvoeDescription;
  const rvoeImages = layout?.attributes?.rvoeImages;
  //section RichTextImage 
  const RichtTextImageData = layout?.attributes?.richTextImage;
  //section laborfield
  const academicTitleName = program?.attributes?.academicTitleName;
  const laborfieldTitle = academicTitleName ? `¿Cuál es el campo laboral de un ${academicTitleName}?` : "Campo Laboral";

  //section certifications
  const certifications = program?.attributes?.certifications;
  const certificationsTitle = program?.attributes?.certificationsTitle;
  const certificationsDescription = parseEditorRawData(program?.attributes?.certificationsDescription);

  //section richTextImageCertifications
  const generalCertifications = layout?.attributes?.richTextImageCertifications;

  // Modal functionality begin
  const [isShow, setIsShow] = useState(false);
  const handleVisibilityModal = (action = 'open') => {
    setIsShow(!isShow);
  };

  const checkoutUrl = program?.attributes?.checkoutUrl && (programModality === "online" || programModality === "a tu ritmo") ? program?.attributes?.checkoutUrl : "";
  const checkoutUrlText = program?.attributes?.checkoutUrlText && (programModality === "online" || programModality === "a tu ritmo") ? program?.attributes?.checkoutUrlText : "";

  const programPerks = program?.attributes?.programPerks;

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

  // }, [SFdata])
  const downloadFileProgram = () => {

    // if (hasCampuses) {
    //   const selectedCampus = campusDetail?.find((element) => { return element?.campusName === selectedOption?.value })
    //   const curriculum = selectedCampus?.curriculumUrl
    // console.log('curriculum: ', curriculum);
    //   if (!curriculum) return
    //   window.open(curriculum, "_blank")
    // }
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
  // console.log('modalities: ', modalities);
  // console.log('campuses: ', campuses);
  // console.log('program.attributes: ', program.attributes);

  return (
    <Fragment>
      <Head>
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
        <meta name="viewport" content={seo?.metaViewport} />
        {/* canonicalURL */}
        <link rel="canonical" href={seo?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={seo?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{structuredData}</script>
      </Head>
      <Modal isShow={isShow} onClose={() => handleVisibilityModal('close')} data={{ icon: 'close', title: "", tagOnClose: 'testOnClose', wrapper: true, }}>
        <div className="mt-16">
          {
            !!SFprogram && <ContainerForm
              type="ComponentSectionsFormContainer"
              title={`Obtén más información sobre el programa de ${program.attributes.name}`}
              description=""
              form="Detalle_de_programa"
              progress={0}
              position="center"
              width="w_12_12"
              extraText=""
              privacyPolicy={{
                text: 'Al llenar tus datos aceptas nuestro ',
                linkText: 'Aviso de privacidad',
                file: null,
                href: '/aviso-privacidad'
              }}
              errors={[{
                type: 'ComponentSectionsWebError',
                title: '',
                message: '',
                errorCode: '',
                button: {
                  text: 'string;',
                  size: '',
                  isBold: false,
                  disabled: false,
                  href: `/oferta-academica/licenciatura/${program.attributes.slug}`,
                }
              }]}
              prefilledData={{
                program: SFprogram,
                levels: program.attributes.level.data.attributes.SFlevels
              }}
              button={{
                label: 'Solicitar información',
                size: '',
                variant: 'primary',
                CTA: 'submit',
                iconName: 'send',
                action: () => {
                  return () =>
                    downloadFileProgram()

                }
              }}
              options={{
                modalities: modalities.map(mod => ({
                  value: mod.modality.data.attributes.name,
                  active: false,
                  text: mod.modality.data.attributes.name
                }))
              }}
            />
          }
        </div>
      </Modal>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            selectedModalityName === "online" || selectedModalityName === "a tu ritmo" ?
              <IntroductionProgram
                title={title}
                brands={brands?.data}
                checkoutUrlText={checkoutUrlText}
                label={programSubtitle}
                description={description}
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
                brands={brands?.data}
                checkoutUrlText={checkoutUrlText}
                checkoutUrl={checkoutUrl}
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
        {
          selectedModalityName !== "a tu ritmo" && brands ?
            <>
              <div className="col-span-7 w-t:col-span-8 w-p:col-span-4 w-d:mb-18">
                {
                  brands?.data?.length > 0 ?
                    brands?.data?.map((item, index) => <section className="mb-6" key={`section-aboutBrand-${index}`}>
                      {
                        item?.attributes?.name ?
                          <div className="flex font-headings font-semibold text-[18px] mb-4">
                            <p className="mr-1">Acerca de</p>
                            <p>{item?.attributes?.name}</p>
                          </div>
                          : null
                      }
                      {
                        item?.attributes?.about ?
                          <RichtText data={{
                            content: parseEditorRawData(item?.attributes?.about)
                          }} />
                          : null
                      }
                      {
                        item?.attributes?.website ?
                          <Link target="_blank" className="underline text-primary-500" href={item?.attributes?.website}>Conocer más sobre {item?.attributes?.name}</Link>
                          : null
                      }
                    </section>)
                    : null
                }
                {hasRvoe
                  ? <div>
                    {
                      rvoeTitle ?
                        <p className="font-headings font-semibold text-[18px] mb-4">{rvoeTitle}</p>
                        : null
                    }
                    {
                      rvoeDescription ?
                        <div>
                          <RichtText data={{
                            content: parseEditorRawData(rvoeDescription)
                          }} />
                        </div>
                        : null
                    }
                    {
                      rvoeImages && rvoeImages?.length > 0 ?
                        <section className="w-full grid w-d:grid-cols-2 w-d:gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
                          {
                            rvoeImages?.map((item, i: number) => <section key={`section-rvoeImages-${i}`}>
                              <img src={item?.image?.data?.attributes?.url}></img>
                            </section>)
                          }
                        </section>
                        : null
                    }
                  </div>
                  : null
                }
                {
                  certifications?.data?.length > 0 ?
                    <div className="mt-6">
                      {
                        certificationsTitle ?
                          <p className="font-headings font-semibold text-[18px] mb-4">{certificationsTitle}</p>
                          : null
                      }
                      {
                        certificationsDescription ?
                          <RichtText data={{
                            content: certificationsDescription
                          }} />
                          : null
                      }
                      {
                        certifications?.data?.length > 0 ?
                          <section className="w-full grid w-d:grid-cols-8 gap-6 w-t:grid-cols-8 w-p:grid-cols-4">
                            {
                              certifications?.data?.map((item, i) => <div key={`section-informativeIcons-${i}`}>
                                <Aspect ratio={"1/1"}>
                                  <Image
                                    alt={""}
                                    src={item?.attributes?.imgCertification?.data?.attributes?.url}
                                    classNamesImg="w-full h-full object-cover rounded-full"
                                    classNames="w-full h-full"
                                  />
                                </Aspect>
                              </div>)
                            }
                          </section>
                          : null
                      }
                    </div>
                    : null
                }
                {
                  <div className="mt-5">
                    {/* { Uncomment when have expected learnings
                        titleLearn ?
                          <div className="font-headings font-semibold text-[18px] mb-4">
                            <p className="mr-1">{titleLearn}<span className="ml-1">{levelProgram}</span><span>?</span></p>
                          </div>
                          : null
                      } */}
                    {
                      gralAdmissionProfile ?
                        <div className="font-headings font-semibold text-[18px] mb-4">
                          <p className="mr-1 mb-4">Perfil de Ingreso</p>
                          <RichtText data={{
                            content: parseEditorRawData(gralAdmissionProfile)
                          }} />
                        </div>
                        : null
                    }
                    {
                      gralGraduateProfile ?
                        <div className="font-headings font-semibold text-[18px] mb-4">
                          <p className="mr-1 mb-4">Perfil de Egreso</p>
                          <RichtText data={{
                            content: parseEditorRawData(gralGraduateProfile)
                          }} />
                        </div>
                        : null
                    }
                    {
                      gralAdmissionRequirements ?
                        <div className="font-headings font-semibold text-[18px] mb-4">
                          <p className="mr-1 mb-4">Requisitos de Admisión</p>
                          <RichtText data={{
                            content: parseEditorRawData(gralAdmissionRequirements)
                          }} />
                        </div>
                        : null
                    }
                  </div>
                }
                {
                  gralLaborField ?
                    <div>
                      {
                        laborfieldTitle ?
                          <div className="font-headings font-semibold text-[18px] mb-4">
                            <p>{laborfieldTitle}</p>
                          </div>
                          : null
                      }
                      {
                        gralLaborField ?
                          <RichtText data={{
                            content: parseEditorRawData(gralLaborField)
                          }} />
                          : null
                      }
                    </div>
                    : null
                }
              </div>
            </>
            : null
        }
        {
          selectedModalityName !== "a tu ritmo" ?
            <div className="col-span-5 mb-6 w-p:col-span-2 w-p:order-1 w-t:hidden w-p:hidden">
              <div className="w-p:-mt-56 -mt-20 sticky top-10">
                <div className="mt-16 mb-8">
                  {
                    !!SFprogram && <ContainerForm
                      type="ComponentSectionsFormContainer"
                      title={`Obtén más información sobre el programa de ${program.attributes.name}`}
                      description=""
                      form="Detalle_de_programa"
                      progress={0}
                      position="center"
                      width="w_12_12"
                      extraText=""
                      privacyPolicy={{
                        text: 'Al llenar tus datos aceptas nuestro ',
                        linkText: 'Aviso de privacidad',
                        file: null,
                        href: '/aviso-privacidad'
                      }}
                      errors={[{
                        type: 'ComponentSectionsWebError',
                        title: '',
                        message: '',
                        errorCode: '',
                        button: {
                          text: 'string;',
                          size: '',
                          isBold: false,
                          disabled: false,
                          href: `/oferta-academica/licenciatura/${program.attributes.slug}`,
                        }
                      }]}
                      prefilledData={{
                        program: SFprogram,
                        levels: program.attributes.level.data.attributes.SFlevels
                      }}
                      button={{
                        label: 'Solicitar información',
                        size: '',
                        variant: 'primary',
                        CTA: 'submit',
                        iconName: 'send',
                      }}
                      options={{
                        modalities: modalities.map(mod => ({
                          value: mod.modality.data.attributes.name,
                          active: false,
                          text: mod.modality.data.attributes.name
                        }))
                      }}
                    />
                  }
                </div>
                {/* <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected }} onClick={downloadFileProgram} /> */}
              </div>
            </div>
            : null
        }
      </ContentLayout>
      {/* <ProgramDetailForm></ProgramDetailForm> */}
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
              {
                modalities?.length > 0 && titleTabs ?
                  <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
                    <p className="text-6.5 font-headings font-semibold leading-tight w-t:leading-tight w-p:leading-tight w-t:text-6 w-p:text-6">{`${titleTabs} ${levelProgram}`}</p>
                  </div>
                  : null
              }
              {
                modalities?.length > 1 ?
                  <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
                    <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality.modality.data.attributes.label ? modality.modality.data.attributes.label : modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
                  </div>
                  : null
              }
            </ContentLayout>
            {
              modalities?.length > 1 ?
                <ContentFullLayout>
                  <div className="col-span-12 w-t:col-span-8' w-p:col-span-4 flex justify-center">
                    <section className="w-d:hidden">
                      <TabsFeatured tabs={modalities?.map((modality) => ({ label: modality.modality.data.attributes.label ? modality.modality.data.attributes.label : modality?.modality?.data?.attributes?.name }))} onActive={(active: number) => handleSetActiveTab(active)} />
                    </section>
                  </div>
                </ContentFullLayout>
                : null
            }
          </>
          : null
      }
      <ContentLayout>
        <div className="gap-6 col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            selectedModalityName === "a tu ritmo" ?
              <>
                <OutstandingContainer items={formattedModalityData?.cards} reverse={selectedModalityName === "a tu ritmo"} />
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
                        {/* <div className="flex justify-center">
                          <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected }} onClick={downloadFileProgram} />
                        </div> */}
                      </div> :
                      <>
                        {/* <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
                          <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios" }} onClick={downloadFileProgram} />
                        </div> */}
                      </>
                  }
                </div>
              </>

              : null
          }
          {
            selectedModalityName !== "a tu ritmo" ?
              <div>
                {
                  characteristicsInformativeIcons?.length > 0 || summaries?.length > 0 ?
                    <div className="border-2 border-secondary-500">
                      {
                        selectedModality?.modality?.data?.attributes?.Characteristics ?
                          <section
                            //@ts-ignore
                            style={{ "--image-desk-url": `url(${characteristicsdesktopBgImage})`, "--image-tablet-url": `url(${characteristicsTabletBgImage})`, "--image-mobile-url": `url(${characteristicsMobileBgImage})` }}
                            className={cn("col-span-12 w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover py-16", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]")}
                          >
                            <Container classNames="p-6">
                              <div className="flex flex-col w-d:gap-8 items-center justify-center">
                                <div className="text-center flex flex-col items-center">
                                  <h3 className="font-headings font-semibold text-7 w-p:text-6 w-p:w-2/3 leading-9">{characteristicsTitle}<span className="font-headings font-semibold text-7 w-p:text-6 text-secondary-500 mr-2 leading-9">{characteristicsModalityTitle}?</span></h3>
                                  <div className="flex justify-center">
                                    <div className="w-2/3">
                                      <RichtText classNames="text-red-500!" data={{
                                        content: characteristicsSubtitle
                                      }} />
                                    </div>
                                  </div>
                                </div>
                                {characteristicsInformativeIcons && characteristicsInformativeIcons?.length > 0 ?
                                  <section className="w-full grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
                                    {
                                      characteristicsInformativeIcons?.map((item: any, i: number) => <section className="text-center flex flex-col w-p:flex-row" key={`section-informativeIcons-${i}`}>
                                        <span className="material-symbols-outlined select-none text-surface-500 !text-16 w-p:!text-7 w-d:mb-2">{item?.iconName}</span>
                                        <div className="flex flex-col w-p:text-left w-p:ml-4">
                                          <span className="font-headings font-semibold text-5 text-secondary-500 w-p:mb-2 mb-4">{item?.title}</span>
                                          <RichtText data={{
                                            content: parseEditorRawData(item?.description)
                                          }} />
                                        </div>
                                      </section>)
                                    }
                                  </section>
                                  : null
                                }
                              </div>
                            </Container>
                          </section>
                          : null
                      }
                      {
                        summaries ?
                          <>
                            {
                              summaries?.length > 0 ?
                                <div className="my-6 text-center">
                                  <p className="font-semibold font-headings text-6">Plan de estudios</p>
                                </div>
                                : null
                            }
                            {
                              summaries?.length > 0 ?
                                <div className="grid w-d:grid-cols-3 gap-6 w-t:grid-cols-1 w-p:grid-cols-1 px-6 relative">
                                  <div className="w-p:hidden w-t:hidden absolute w-full h-full bg-gradient-to-t from-surface-0 from-15% z-10"></div>
                                  {
                                    summaries.map((item: any, i: number) => <section className="pb-5 px-6" key={`section-summarieTitle-${i}`}>
                                      <div className="mb-6 w-t:mb-6">
                                        <p className="font-headings font-semibold text-5 text-secondary-500">{item?.title}</p>
                                      </div>
                                      {
                                        item?.subjects?.slice(0, 4).map((subject: { title: string }, i: number) => <section key={`section-summarie-${i}`}>
                                          <div className="mb-3 relative before:absolute before:w-[1px] before:h-[150%] w-p:before:h-[120%] before:bg-secondary-500 before:left-[-16px] before:top-2 after:absolute after:w-2 after:h-2 after:rounded-[50%] after:bg-secondary-500 after:left-[-19px] after:top-[5px]">
                                            <p>{subject?.title}</p>
                                          </div>
                                        </section>)
                                      }
                                    </section>)
                                  }
                                </div>
                                : null
                            }
                            {
                              summaries?.length > 0 ?
                                <div className="flex justify-center pb-6">
                                  <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios" }} onClick={() => handleVisibilityModal()} />
                                </div>
                                : null
                            }
                          </>
                          : null
                      }
                    </div>
                    : null
                }
              </div>
              : null
          }
          {/* <div className="w-d:mt-18 mt-6 gap-6 grid w-d:grid-cols-2 grid-cols-1">
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
                    <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios", disabled: !isOptionSelected }} onClick={downloadFileProgram} />
                  </div>
                </div> :
                <>
                  <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
                    <Button dark data={{ ...ButtonInit, title: "Descarga el plan de estudios" }} onClick={downloadFileProgram} />
                  </div></>
            }
          </div> */}
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
        selectedModalityName !== "a tu ritmo" ?
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-18 w-p:mt-6 w-t:mt-12">
            {
              RichtTextImageData ?
                <RichTextImage type={"ComponentSectionsRichTextImage"} title={RichtTextImageData?.title} image={{
                  data: {
                    attributes: {
                      url: RichtTextImageData?.image?.data?.attributes?.url,
                      alternativeText: ""
                    }
                  }
                }} text={RichtTextImageData?.text} imagePosition={RichtTextImageData?.imagePosition} backgroundColor={RichtTextImageData?.backgroundColor} richTextImageContentVariant={RichtTextImageData?.richTextImageContentVariant} />
                : null
            }
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
                  const levelRoute = (routesConfig as any)?.educationalLevels?.find((educationalLevel: any) => educationalLevel?.name === programLevelName)?.path;

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
                      <div className="border-2">
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
        selectedModalityName === "a tu ritmo" && price_list?.price?.length > 0
          ? <PaymentCardContainer
            title={"Nuestros planes"}
            accent_title={""}
            subtitle={"Empieza a estudiar hoy mismo"}
            price_list={{
              ...price_list
            }}
            text={`Nota importante: Al adquirir uno de nuestros planes, te suscribirás automáticamente a través de tu método de pago seleccionado. \n\n La suscripción se renovará de acuerdo con el plan elegido (mensual o anual). Puedes cancelar en cualquier momento antes de la renovación.`}
          />
          : null
      }
      {
        selectedModalityName === "a tu ritmo" ?
          <div className="mt-20">
            <AtrProgramInfo checkoutUrl={checkoutUrl} level={levelProgram} modality={selectedModalityName} hideCards={!!price_list} />
          </div>
          : null
      }
      {
        selectedModalityName !== "a tu ritmo" ?
          <div className="w-d:mt-18 mt-12">
            <RichTextImage {...generalCertifications} />
          </div>
          : null
      }
      {
        selectedModalityName !== "a tu ritmo" && testimonials?.testimonialsCards ?
          <ContentFullLayout>
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-18 mt-12">
              {
                testimonials?.testimonialsCards?.length > 0 ?
                  <TestimonialSlider {...testimonials} />
                  : null
              }
            </div>
          </ContentFullLayout>
          : null
      }
    </Fragment >
  );
};

export default ProgramSuperiorPageContent;