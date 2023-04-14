import { FC, useState } from "react"
import cn from "classnames"
import CardWebsite from "@/old-components/CardWebsite";
import Image from "../Image";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { CarouselProps, CarouselType } from "@/types/Carousel.types";
import CardWebsitePortalverse from "../CardWebsitePortalverse";


const Carousel: FC<CarouselProps> = ({ data: { items }, type }) => {

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const stylesBaseControls = "material-icons select-none absolute top-[35%] p-1 rounded-lg text-[12px] w-p:hidden";
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      "(min-width: 320px)":{
        slides: { perView: 1, spacing: 24 },
      },
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const activeBulletSlide = (position: number) => {
    instanceRef.current?.moveToIdx(position)
  }

  return <section className="flex flex-col relative w-full my-6">
    <section className="w-d:w-[90%] w-t:w-[95%] w-p:w-[90%] mx-auto">
      <div ref={sliderRef} className="keen-slider">
      {
        items.map((item: any, i: number) => <section key={`card-item-${i}`}>
          { 
            type === CarouselType.CARD ?
              <div className="keen-slider__slide">
                <CardWebsitePortalverse key={`card-${i}`} data={item}/> 
              </div>
            :
              <div className="keen-slider__slide">
                <Image src={item.desk?.src} alt={item.desk?.alt} classNames="aspect-2/1"/>
              </div>
          }
        </section>)
      }
      </div>
    </section>
    {loaded && instanceRef.current && (
      <>
        <div className={cn("z-20 left-0 w-p:invisible w-t:invisible cursor-pointer", stylesBaseControls)}>
          <span className="material-icons" onClick={(e: any) =>
              {instanceRef.current?.prev()
              }
            }
            >arrow_back_ios</span>           
        </div>   
        <div className={cn("z-20 right-0 w-p:invisible w-t:invisible cursor-pointer", stylesBaseControls)}>
          <span className="material-icons" onClick={(e: any) =>
              instanceRef.current?.next()
            }
            >arrow_forward_ios</span>           
        </div>  
        <div className={cn("w-full flex justify-center gap-2 mt-6 dots")}>
          {
            items.map((_: any, i: number) => 
              <div 
                key={`bullet-item-${i}`} 
                onClick={() => activeBulletSlide(i)} 
                className={cn("h-4 bg-[#686868] rounded-full cursor-pointer", { "w-4": i !== currentSlide, "w-8": i === currentSlide })} 
              />
            )
          }
        </div>        
      </>
    )}
  </section>
}
export default Carousel