import React from "react";
import { useState } from "react";
import cn from "classnames"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { CarouselData } from "@/utils/strapi/sections/Carousel";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Container from "@/layouts/Container.layout";
import Aspect from "../Aspect";
import Image from "@/old-components/Image";
import Button from "@/old-components/Button/Button";

const Carousel = (props: CarouselData) => {
  const {
    title,
    description,
    backgroundColor,
    origin,
    typeCarousel,
    cards,
    images,
    videos,
    button
  } = props;

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRefDesk] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    loop: true,
    breakpoints: {
      '(max-width: 599px)': {
        slides: { origin: origin, perView: 1.2, spacing: 25 }
      },
      '(min-width: 600px': {
        slides: { origin: origin, perView: 2.2, spacing: 25 }
      },
      '(min-width: 1024px)': {
        slides: { origin: origin, perView: 3, spacing: 25 }
      },
    },
    mode: "free",
    slides: { origin: origin, perView: 3, spacing: 25 }
  })

  const formattedCards = cards?.map((item, i) => {
    const card = {
      image: item?.image?.data?.attributes?.url,
      title: item?.title,
      subtitle: item?.subtitle,
      text: parseEditorRawData(item?.content),
      type: item?.type,
      link: {
        text: item?.linkText,
        size: "small",
        isUnderline: false,
        isBold: false,
        disabled: false,
        id: undefined,
        iconFirst: "",
        iconSecond: ""
      },
      border: true,
      aspect: item?.imageAspectRatio,
      background: true,
      isLink: true
    }
    return card
  })

  return (
    <>
      <div style={{ backgroundColor }}
        className={cn({
          "w-p:py-10 w-t:py-6 w-d:py-10": !!backgroundColor
        })}>
        <Container>
          <div className="">
            <div className="navigation-wrapper">
              <div>
                {
                  title ? <p className="font-headings font-bold text-10 w-p:text-6 w-d:mb-6 mb-3">{title}</p> : null
                }
                {
                  description ? <div className="mb-6">
                    <RichtText data={{
                      content: description
                    }} />
                  </div> : null
                }
                {
                  typeCarousel === "card" ?
                    <>
                      <div className="w-d:px-18">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            cards && cards?.length > 0 ?
                              formattedCards?.map((card, i) => <div key={`carouselCardDesk-${i}`} className="keen-slider__slide">
                                <CardWebsitePortalverse data={card} />
                              </div>)
                              : null
                          }
                        </div>
                      </div>
                    </>
                    : null
                }
                {
                  typeCarousel === "image" ?
                    <>
                      <div className="w-d:px-18 w-t:hidden w-p:hidden">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            images && images?.length > 0 ?
                              images?.map((image, i) => <div key={`carouselImagesDesk-${i}`} className="keen-slider__slide">
                                <Aspect ratio={image?.desktopRatio}>
                                  <Image
                                    alt={image?.desktopImage?.data?.attributes?.url || ""}
                                    src={image?.desktopImage?.data?.attributes?.url}
                                    classNames="w-full h-full"
                                    classNamesImg="w-full h-full object-cover"
                                  />
                                </Aspect>
                              </div>)
                              : null
                          }
                        </div>
                      </div>
                      <div className="w-d:hidden w-p:hidden">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            images && images?.length > 0 ?
                              images?.map((image, i) => <div key={`carouselImagesTablet-${i}`} className="keen-slider__slide">
                                <Aspect ratio={image?.tabletRatio}>
                                  <Image
                                    alt={image?.tabletImage?.data?.attributes?.url || ""}
                                    src={image?.tabletImage?.data?.attributes?.url}
                                    classNames="w-full h-full"
                                    classNamesImg="w-full h-full object-cover"
                                  />
                                </Aspect>

                              </div>)
                              : null
                          }
                        </div>
                      </div>
                      <div className="w-d:hidden w-t:hidden">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            images && images?.length > 0 ?
                              images?.map((image, i) => <div key={`carouselImagesMobile-${i}`} className="keen-slider__slide">
                                <Aspect ratio={image?.mobileRatio}>
                                  <Image
                                    alt={image?.mobileImage?.data?.attributes?.url || ""}
                                    src={image?.mobileImage?.data?.attributes?.url}
                                    classNames="w-full h-full"
                                    classNamesImg="w-full h-full object-cover"
                                  />
                                </Aspect>
                              </div>)
                              : null
                          }
                        </div>
                      </div>
                    </>
                    : null
                }
                {
                  typeCarousel === "video" ?
                    <>
                      <div className="w-d:px-18">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            videos && videos?.length > 0 ?
                              videos?.map((video, i) => <div key={`carouselVideoDesk-${i}`} className="keen-slider__slide">
                                <Aspect ratio="2/1">
                                  <iframe
                                    className="w-full h-full"
                                    src={video?.provider === 'youtube' ? `https://www.youtube.com/embed/${video?.providerId}` : video?.provider === 'vimeo' ? `https://player.vimeo.com/video/${video?.providerId}` : ''}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                                  </iframe></Aspect>
                              </div>)
                              : null
                          }
                        </div>
                      </div>
                    </>
                    : null
                }
              </div>
            </div>
            {loaded && instanceRefDesk.current && (cards && cards?.length > 0 || images && images?.length > 0 || videos && videos?.length > 0) && (
              <div className="dots text-center pt-6">
                {[
                  //@ts-ignore
                  ...Array(instanceRefDesk?.current?.track?.details?.slides?.length).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRefDesk.current?.moveToIdx(idx)
                      }}
                      className={cn("w-4 h-4 bg-primary-500 rounded-full m-2", {
                        "w-7 transition-all": currentSlide === idx
                      }
                      )}
                    ></button>
                  )
                })}
              </div>
            )}
            {
              button?.CTA ?
                <div>
                  <div className="flex justify-center w-p:hidden mt-6">
                    <Button dark data={{
                      id: button?.id,
                      type: button?.variant,
                      title: button?.label,
                      size: button?.size,
                      icon: button?.iconName,
                      lyIcon: false,
                      disabled: false,
                      isExpand: false,
                    }} />
                  </div>
                  <div className="w-d:hidden w-t:hidden mt-6">
                    <Button dark data={{
                      id: button?.id,
                      type: button?.variant,
                      title: button?.label,
                      size: button?.size,
                      icon: button?.iconName,
                      lyIcon: false,
                      disabled: false,
                      isExpand: true,
                    }} />
                  </div>
                </div>
                : null
            }
          </div>
        </Container>
      </div>
    </>
  )
};

export default Carousel;