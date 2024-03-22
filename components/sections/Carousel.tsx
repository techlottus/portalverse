import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import RichtText from "@/old-components/Richtext/Richtext";
import Aspect from "@/components/Aspect";
import Image from "@/old-components/Image";
import Button from "@/old-components/Button/Button";
import type { CarouselSection } from "@/utils/strapi/sections/Carousel";

const Carousel = (props: CarouselSection) => {
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

  const router = useRouter();

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
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
        iconSecond: "",
        linkUrl: item?.linkUrl
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
                              formattedCards?.map((card, i) => <div key={`carouselCard-${i}`} className="keen-slider__slide">
                                <CardWebsitePortalverse data={card} onClick={card?.link?.linkUrl ? () => {
                                  if (!!card?.link?.linkUrl) {
                                    return window?.open(card?.link?.linkUrl, card?.link?.linkUrl?.includes("https") ? "_blank" : "_self")
                                  }
                                  return null
                                } : undefined} />
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
                      <div className="w-d:px-18">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            images && images?.length > 0 ?
                              images?.map((image, i) => <div key={`carouselImage-${i}`} className="keen-slider__slide">
                                <div className="w-t:hidden w-p:hidden">
                                  <Aspect ratio={image?.desktopRatio}>
                                    <Image
                                      alt={image?.desktopImage?.data?.attributes?.url || ""}
                                      src={image?.desktopImage?.data?.attributes?.url}
                                      classNames="w-full h-full"
                                      classNamesImg="w-full h-full object-cover"
                                    />
                                  </Aspect>
                                </div>
                                <div className="w-d:hidden w-p:hidden">
                                  <Aspect ratio={image?.tabletRatio}>
                                    <Image
                                      alt={image?.tabletImage?.data?.attributes?.url || ""}
                                      src={image?.tabletImage?.data?.attributes?.url}
                                      classNames="w-full h-full"
                                      classNamesImg="w-full h-full object-cover"
                                    />
                                  </Aspect>
                                </div>
                                <div className="w-d:hidden w-t:hidden">
                                  <Aspect ratio={image?.mobileRatio}>
                                    <Image
                                      alt={image?.mobileImage?.data?.attributes?.url || ""}
                                      src={image?.mobileImage?.data?.attributes?.url}
                                      classNames="w-full h-full"
                                      classNamesImg="w-full h-full object-cover"
                                    />
                                  </Aspect>
                                </div>
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
                      <div className="">
                        <div ref={sliderRef} className="keen-slider">
                          {
                            videos && videos?.length > 0 ?
                              videos?.map((video, i) => <div key={`carouselVideo-${i}`} className="keen-slider__slide">
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
            {loaded && instanceRef.current && ((typeCarousel === "card" && cards && cards?.length > 0) || (typeCarousel === "image" && images && images?.length > 0) || (typeCarousel === "video" && videos && videos?.length > 0)) && (
              <div className="dots text-center pt-6">
                {[
                  //@ts-ignore
                  ...Array(instanceRef?.current?.track?.details?.slides?.length).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx)
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
                      size: "small",
                      icon: button?.iconName,
                      lyIcon: false,
                      disabled: false,
                      isExpand: false,
                    }} onClick={button?.CTA ? () => {
                      if (!!button?.CTA) {
                        return window?.open(button?.CTA, button?.CTA?.includes("https") ? "_blank" : "_self")
                      }
                      return null
                    } : undefined} />
                  </div>
                  <div className="w-d:hidden w-t:hidden mt-6">
                    <Button dark data={{
                      id: button?.id,
                      type: button?.variant,
                      title: button?.label,
                      size: "small",
                      icon: button?.iconName,
                      lyIcon: false,
                      disabled: false,
                      isExpand: true,
                    }} onClick={button?.CTA ? () => {
                      if (!!button?.CTA) {
                        return window?.open(button?.CTA, button?.CTA?.includes("https") ? "_blank" : "_self")
                      }
                      return null
                    } : undefined} />
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