import { FC } from "react"
import RichtText from "./Richtext/Richtext"
import Container from "@/layouts/Container.layout"
import Button from "./Button/Button"
import Image from "./Image"
import Aspect from "@/components/Aspect"
import { IntroductionProgramData } from "@/types/IntroductionProgramData"
import cn from "classnames";
import { useRouter } from "next/router"

const IntroductionProgram: FC<IntroductionProgramData> = (props: IntroductionProgramData) => {

  const router = useRouter();

  const { title, label, discountPercentajeText, certificationMessage, description, offerPrice, price, periodicity, programPerks, brands, image, discount, checkoutUrl, checkoutUrlText } = props

  return <section>
    <Container classNames="w-p:!p-0 w-t:!p-0 w-d-base:px-0">
      <div className="flex w-p:flex-col w-t:flex-col gap-18">
        <div className="w-d:w-2/3 w-full my-auto">
          {
            label ?
              <div className="pb-2">
                <p className="font-texts text-5 leading-5 text-surface-500">{label}</p>
              </div> : null
          }
          {
            title ?
              <div className="pb-6">
                <h3 className="text-10 font-bold font-headings leading-12 w-t:semi-tight w-p:leading-tight w-t:text-8.5 w-p:text-7.5">{title}</h3>
              </div>
              : null
          }
          {
            discount && offerPrice ?
              <div className={cn("text-white bg-secondary-500 py-2 px-4 w-max rounded-md mb-6",

              )}>
                <span>{discount}</span>
                <span>{discountPercentajeText}</span>
              </div>
              : null
          }
          {
            certificationMessage ?
              <div className="mb-6">
                <p className="text-secondary-500 font-bold leading-5">{certificationMessage}</p>
              </div>
              : null
          }
          {
            image ?
              <div className="w-d:w-1/3 w-full flex items-center w-d:hidden my-6">
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
              <div>
                <RichtText data={{
                  content: description
                }} />
              </div>
              : null
          }
          {
            programPerks?.length > 0 ?
              <section className="grid w-d:grid-cols-3 gap-6 w-t:grid-cols-1 w-p:grid-cols-1 pb-6">
                {
                  programPerks?.map((item, i) => <div>
                    <div className="flex">
                      <span className="material-icons my-auto text-surface-500 !text-10">{item?.attributes?.iconName}</span>
                      <div>
                        <p className="text-xs leading-4 font-texts">{item?.attributes?.title}</p>
                        <p className="text-base leading-5 font-texts font-bold">{item?.attributes?.subtitle}</p>
                      </div>
                    </div>
                  </div>)
                }
              </section>
              : null
          }
          {
            price || offerPrice || brands ?
              <div className={cn("flex w-p:flex-col w-t:flex-col pb-6")}>
                {
                  price || offerPrice ?
                    <div className={cn({ "mr-12": offerPrice !== 0 && price !== 0 })}>
                      {
                        offerPrice && offerPrice !== 0 ?
                          <div className="flex">
                            <div className="flex gap-1">
                              <span className="text-headings text-6 leading-9 font-bold">${offerPrice}</span>
                              <span className="text-headings text-6 leading-9 font-bold">MXN</span>
                              {
                                periodicity ?
                                  <div className="my-auto ml-1 flex gap-2">
                                    <span>/</span>
                                    <span className="text-base leading-6 text-surface-500">{periodicity}</span>
                                  </div>
                                  : null

                              }
                            </div>
                          </div>
                          : null
                      }
                      {
                        price && offerPrice ?
                          <div className="flex text-secondary-500 gap-1">
                            <span className="line-through">${price}</span>
                            <span className="line-through">MXN</span>
                          </div>
                          : price !== 0 ?
                            <div className="flex gap-1">
                              <span className="text-headings text-6 leading-9 font-bold">${price}</span>
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
                  brands ?
                    <section className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-2 pb-6">
                      {
                        brands?.length > 0 ?
                          brands?.map((item) =>
                            <div className="my-auto mr-12">
                              {
                                item?.attributes?.contact ?
                                  <div className="flex">
                                    <span className="material-icons text-primary-500 mr-2">email</span>
                                    <a className="text-base font-texts text-primary-500" target="_blank" href={item?.attributes?.contact}>Solicitar información</a>
                                  </div>
                                  : null
                              }
                            </div>
                          )
                          : null
                      }
                    </section>
                    : null
                }
              </div>
              : null
          }
          {
            checkoutUrl && checkoutUrlText ?
              <div className="w-p:hidden w-t:hidden">
                <Button dark data={{
                  id: "",
                  type: "primary",
                  title: checkoutUrlText,
                  size: "large",
                  icon: "",
                  lyIcon: false,
                  disabled: false,
                  isExpand: false,
                  tagOnClick: "",
                  test: ""
                }} onClick={() => {
                  router.push(checkoutUrl)
                }} />
              </div>
              : null
          }
          {
            checkoutUrl && checkoutUrlText ?
              <div className="w-d:hidden">
                <Button dark data={{
                  id: "",
                  type: "primary",
                  title: checkoutUrlText,
                  size: "large",
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
            <div className="w-d:w-1/3 w-full flex items-center w-p:hidden w-t:hidden">
              <Aspect ratio={"5/4"}>
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
}

export default IntroductionProgram