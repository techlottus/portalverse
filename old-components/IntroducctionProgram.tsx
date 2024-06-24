import { FC } from "react";
import { useRouter } from "next/router";
import Aspect from "@/components/Aspect";
import Button from "@/old-components/Button/Button";
import Container from "@/layouts/Container.layout";
import Image from "@/old-components/Image";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { IntroductionProgramData } from "@/types/IntroductionProgramData";

const IntroductionProgram: FC<IntroductionProgramData> = (props: IntroductionProgramData) => {

  const router = useRouter();

  const {
    title,
    label,
    discountPercentajeText = "Descuento",
    certificationMessage,
    description,
    offerPrice,
    price,
    periodicity,
    programPerks,
    brands,
    image,
    discount,
    checkoutUrl,
    checkoutUrlText = "Inscribirme ahora",
    price_list
  } = props

  console.log(props, "props program")
  
  return (
    <section className="my-0 mb-4 md:my-6">
      <Container classNames="w-p:!p-0 w-t:!p-0 w-d-base:!px-0">
        <div className="flex w-p:flex-col w-t:flex-col gap-18">
          <div className="flex flex-col w-d:w-2/3 w-full my-auto gap-6">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  {
                    label ?
                      <p className="font-texts font-normal text-4 leading-4 text-surface-500">{label}</p>
                      : null
                  }
                  {
                    title ?
                      <h3 className="text-10 font-bold font-headings leading-12 w-t:semi-tight w-p:leading-tight w-t:text-8.5 w-p:text-7.5">{title}</h3>
                      : null
                  }
                </div>
                {
                  discount ?
                    <div className="font-texts font-bold text-white text-xs py-2 px-4 w-max rounded-md bg-secondary-500 select-none">
                      <span>{discount}% {discountPercentajeText || " Descuento"}</span>
                    </div>
                    : null
                }
                {
                  certificationMessage ?
                    <p className="text-secondary-500 font-texts font-bold text-base leading-5">{certificationMessage}</p>
                    : null
                }
                {
                  image ?
                    <div className="w-d:w-1/3 w-full flex items-center w-d:hidden">
                      <Aspect ratio={"2/1"}>
                        <Image
                          alt={"title"}
                          src={image?.src}
                          classNamesImg="w-full h-full object-cover rounded-lg"
                          classNames="w-full h-full"
                        />
                      </Aspect>
                    </div>
                    : null
                }
                {
                  description ?
                    <div className="-mb-5">
                      <RichtText data={{
                        content: description
                      }} />
                    </div>
                    : null
                }
                {
                  programPerks?.length > 0 ?
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2.5 lg:gap-2.5 md:items-center w-full">
                      {
                        programPerks?.map((item, i) => (<div key={i}>
                          <div className="flex items-center gap-2 p-2">
                            <span className="material-symbols-outlined my-auto text-surface-500 !text-[32px] select-none">{item?.attributes?.iconName}</span>
                            <div className="flex flex-col">
                              <p className="font-texts font-normal text-xs leading-4">{item?.attributes?.title}</p>
                              <p className="font-texts font-bold text-base leading-5">{item?.attributes?.subtitle}</p>
                            </div>
                          </div>
                        </div>))
                      }
                    </div>
                    : null
                }
              </div>
              <div className="flex flex-row gap-6">
                {
                  price || offerPrice || brands ?
                    <div className="flex w-p:flex-col w-t:flex-col gap-6 mb:gap-0 w-full">
                      {
                        price || offerPrice ?
                          <div className={cn({ "flex flex-col gap-0.5 mr-12": offerPrice !== 0 && price !== 0 })}>
                            {
                              offerPrice && offerPrice !== 0 ?
                                <div className="flex">
                                  <div className="flex items-center gap-0.5">
                                    <span className="font-headings text-7 leading-9 font-bold">${offerPrice?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} MXN</span>
                                    {
                                      periodicity ?
                                        <span className="font-texts font-normal text-lg leading-6 text-surface-900 my-auto">/{periodicity}</span>
                                        : null
                                    }
                                  </div>
                                </div>
                                : null
                            }
                            {
                              price && offerPrice ?
                                <div className="flex">
                                  <span className="font-texts font-normal text-sm line-through text-secondary-500">${price} MXN</span>
                                </div>
                                : price !== 0 ?
                                  <div className="flex gap-1">
                                    <span className="text-headings text-6 leading-9 font-bold">${price?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                    <span className="text-headings text-6 leading-9 font-bold">MXN</span>
                                    {
                                      periodicity ?
                                        <div className="flex gap-1 my-auto ml-1">
                                          <span className="text-base leading-6 text-surface-500">/</span>
                                          <span className="text-base leading-6 text-surface-500">{periodicity}</span>
                                        </div>
                                        : null
                                    }
                                  </div>
                                  : null
                            }
                          </div>
                          : null
                      }
                      {
                        !checkoutUrl && brands && brands?.length > 0 ?
                          <div
                            className={cn(
                                "flex items-center gap-6",
                                {
                                  ["mb-5"]: !!offerPrice
                                }
                              )
                            }
                          >
                            {
                              brands?.length > 0 ?
                                <>
                                  {
                                    brands?.[0]?.attributes?.contact ?
                                      <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined !text-lg text-primary-500 select-none">email</span>
                                        <a
                                          className="font-texts font-bold text-base text-primary-500 leading-5 underline"
                                          target="_blank"
                                          rel="noreferrer"
                                          href={brands?.[0]?.attributes?.contact}
                                        >
                                          Solicitar información
                                        </a>
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
              </div>
            </div>
            {
              checkoutUrl ?
                <div className="w-p:hidden w-t:hidden">
                  <Button dark data={{
                    id: "",
                    type: "primary",
                    title: checkoutUrlText || "Inscribirme ahora",
                    size: "small",
                    icon: "",
                    lyIcon: false,
                    disabled: false,
                    isExpand: false,
                    tagOnClick: "",
                    test: ""
                  }} onClick={() => {         
                    if(price_list){
                      router.push("#payment_cards")
                    } else {
                      router.push(checkoutUrl)
                    }
                    
                  }} />
                </div>
                : null
            }
            {
              checkoutUrl ?
                <div className="w-d:hidden">
                  <Button dark data={{
                    id: "",
                    type: "primary",
                    title: checkoutUrlText || "Inscribirme ahora",
                    size: "small",
                    icon: "",
                    lyIcon: false,
                    disabled: false,
                    isExpand: true,
                    tagOnClick: "",
                    test: ""
                  }} onClick={() => {
                    router.push(checkoutUrl)
                  }} />
                </div>
                : null
            }
          </div>
          {
            image ?
              <div className="w-d:w-1/2 w-full flex items-center w-p:hidden w-t:hidden">
                <Aspect ratio={"2/1"}>
                  <Image
                    alt={"title"}
                    src={image?.src}
                    classNamesImg="w-full h-full object-cover rounded-lg"
                    classNames="w-full h-full"
                  />
                </Aspect>
              </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
};

export default IntroductionProgram;