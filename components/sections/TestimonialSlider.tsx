import { memo, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import TestimonialCard from "../../old-components/TestimonialCard";
import cn from 'classnames';
import { TestimonialSliderData } from "@/utils/strapi/sections/TestimonialSlider";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Container from "@/layouts/Container.layout";

const TestimonialSlider: React.FC<TestimonialSliderData> = memo((props: TestimonialSliderData) => {

  const {
    title,
    description,
    bgImageDesktop,
    bgImageTablet,
    bgImageMobile,
    testimonialsCards
  } = props

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     //@ts-ignore
  //     instanceRef?.current.next()
  //   }, 7000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [instanceRef])


  return (
    <>
      <section
        //@ts-ignore
        style={{ "--image-desk-url": `url(${bgImageDesktop?.data?.attributes?.url})`, "--image-tablet-url": `url(${bgImageTablet?.data?.attributes?.url})`, "--image-mobile-url": `url(${bgImageMobile?.data?.attributes?.url})` }}
        className={cn("col-span-12 w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover w-d:py-16 py-12 w-d:px-32 px-6", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]")}
      >
        {
          title ?
            <div className={cn("title font-headings font-bold w-d:text-7 leading-9 w-t:text-6 text-center",{
              "mb-6": !description,
              "mb-4": description
            })}>
              <p className="">{title}</p>
            </div>
            : null
        }
        {
          description ?
            <div className="text-center mb-6">
              <RichtText data={{
                content: parseEditorRawData(description)
              }} />
            </div>
            : null
        }
        {
          testimonialsCards ?
            <Container >
              <div ref={sliderRef} className="keen-slider">
              {
                testimonialsCards?.length > 0 ?
                  testimonialsCards?.map((item, i) => <div key={`section-testimonial-${i}`}>
                    <div className="keen-slider__slide number-slide1">
                      <TestimonialCard title={item?.title} subtitle={item?.subtitle} testimonialText={item?.testimonialText} testimonialImage={{
                        data: {
                          attributes: {
                            url: item?.testimonialImage?.data?.attributes?.url,
                            alternativeText: undefined
                          }
                        }
                      }} />
                    </div>
                  </div>)
                  : null
              }
            </div>
            </Container>
            : null
        }
        {loaded && testimonialsCards?.length > 1 && instanceRef.current && (
          <div className="dots flex justify-center mt-6">
            {[
              //@ts-ignore
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={cn("dot m-2 rounded-full cursor-pointer shadow-md", {
                    "w-7 h-4 bg-primary-500 transition-all": currentSlide === idx,
                    "w-4 h-4 bg-surface-0": currentSlide !== idx
                  })}
                ></button>
              )
            })}
          </div>
        )}
      </section>

    </>
  )
});


export default TestimonialSlider