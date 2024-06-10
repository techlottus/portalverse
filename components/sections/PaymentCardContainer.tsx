import React, { useState } from "react";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import PaymentCard, { PaymentCardData } from "./PaymentCard";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import cn from 'classnames';

type PriceListData = {
  general_perks: Array<string>
  price: Array<PaymentCardData>
}

export type PaymentCardContainerData = {
  program?:number;
  title: string;
  accent_title: string;
  subtitle: string;
  price_list: PriceListData;
  text: string;
}

const PaymentCardContainer = (props: PaymentCardContainerData) => {

  const {title, accent_title, subtitle, price_list, text, program } = props;

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
    initial: 0,
    breakpoints: {
      '(max-width: 599px)': {
        slides: { origin: "auto", perView: 1.1, spacing: 16 }
      },
      '(min-width: 600px': {
        slides: { origin: "auto", perView: 2.8, spacing: 25 }
      },
      '(min-width: 1024px)': {
        slides: { origin: "auto", perView: price_list?.price?.length <= 3 ? 3 : 3.8, spacing: 25 }
      },
    },
    mode: "free",
    slides: { origin: "center", perView: 3, spacing: 25 }
  })

  return (
    <ContentFullLayout classNames="bg-primary-0 mt-20">
      <ContentLayout>
        <div className="col-span-12 py-12 px-20 mobile:px-4">
          <div className="col-span-12 text-center">            
            <p className="font-headings text-2xl font-bold">{title}<span className="text-secondary-500">{accent_title}</span></p>
            <p className="font-texts text-surface-500">{subtitle}</p>
          </div>
          <div>
            {
              price_list?.general_perks?.length > 0
                ? <div className="flex justify-center items-center gap-2 mt-6 mobile:flex-col mobile:items-start">
                  {
                    price_list?.general_perks?.map((perk: any, i: number) => {
                      return (
                        <div className="flex items-center" key={i}>
                          <span className="material-symbols-outlined !text-md text-success-400 me-2">check_circle</span><p className="font-texts text-md font-semibold">{perk?.accent}</p>
                        </div>
                      )
                    }
                    )
                  }
                </div>
                : null
            }
          </div>
          <div className="relative my-8">
            {
              price_list?.price?.length > 3
                ? < div ref={sliderRef} className={cn("keen-slider")}>
                  {
                    price_list?.price?.map((price: PaymentCardData, i: Number) => {
                      return (
                        <PaymentCard key={`carouselCard-${i}`} {...{program, ...price}} />
                      )
                    })
                  }
                </div>
                : < div className="flex justify-center gap-8 mobile:flex-col">
                  {
                    price_list?.price?.map((price: PaymentCardData, i: any) => {
                      return (
                        <PaymentCard key={i} {...{program, ...price}} />
                      )
                    })
                  }
                </div>
            }

            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={false}
                />

                <Arrow
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={false}
                />
              </>
            )}
          </div>
          {loaded && instanceRef.current && (
            <div className="dots text-center pb-6 desktop:hidden">
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
                    className={cn("w-4 h-4 bg-white rounded-full m-2", {
                      "w-7 transition-all !bg-primary-400": currentSlide === idx
                    }
                    )}
                  ></button>
                )
              })}
            </div>
          )}
          <div className="col-span-12 text-center text-sm font-sm mobile:text-left">
            {text}
          </div>
        </div>
      </ContentLayout>
    </ContentFullLayout >
  );
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={cn("arrow w-14 rounded-md bg-white/50 absolute top-1/2 fill-surface-950 cursor-pointer p-4 mobile:hidden", { "left-[-10%]": props.left, "left-auto right-[-10%]": !props.left })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {
        props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )
      }
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </ svg>
  )
}

export default PaymentCardContainer