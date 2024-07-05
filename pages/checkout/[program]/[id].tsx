import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useState } from "react"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import { InscriptionForm } from "@/forms/container/InscriptionForm"
import Link from "next/link"
import Button from "@/old-components/Button/Button"
import cn from "classnames"
import React from "react"
import Aspect from "@/components/Aspect";
import { useRouter } from "next/router";
import Image from "@/old-components/Image"
import WebError from "@/components/sections/WebError";
import ContentLayout from "@/layouts/Content.layout"
import Container from "@/layouts/Container.layout"

type PageProps = {
  program?: ProgramData | null;
  price: any;
};

const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {

  const { program = null, price = {} } = props;

  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState('')
  const priceAmount = Math.round(price?.discounted_price * 100) || Math.round(price?.price * 100);

  const [residence, setResidence] = useState<any>()
  const [noResidence, setNoResidence] = useState<any>()
  const [hasCurp, setHasCurp] = useState<any>(false)
  const [noCurp, setNoCurp] = useState<any>(true)
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<boolean>();
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isValidCurp, setIsValidCurp] = useState(false);
  const [curpError, setCurpError] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [errorResponse, setErrorResponse] = useState();
  const router = useRouter();

  const setStatus = ({ loading, valid, success }: { loading: boolean, valid: boolean, success: boolean }) => {
    setIsVisible(!loading && !error)
    setIsLoading(loading)
    setIsValid(valid)
    setIsSuccess(success)
  }
  const initialData = {
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    residence: "",
    adviser: ""
  }

  const [personalData, setPersonalData] = useState(initialData);

  useEffect(() => {


    window.addEventListener("message", (event) => {
      // console.log("event: ",event)
      // IMPORTANT: Verify the origin of the data to ensure it is from Flywire
      // The use of indexOf ensures that the origin ends with ".flywire.com"
      if (event.origin.indexOf(".flywire.com") > 0) {
        // If the message was sent from Flywire:
        // Extract the data from the event
        const result = event.data;
        // console.log("event data:", result)
        // console.log('result: ', result);


        // Check if the session was successful and confirm_url is present:
        if (result.success && result.confirm_url) {
          // The session was successful and the confirm_url has been returned
          const confirm_url = result.confirm_url;

          // Use the confirm_url to confirm the Checkout Session
          // console.log("Confirm URL:", confirm_url.url);
          const postConfirm = async () => {
            const response = await fetch("/api/confirmFw", {
              method: "POST",
              body: JSON.stringify({ url: confirm_url.url })
            })

            const res = await response.json()
          };

          postConfirm()

          setActivePageIndex(2)

        } else if (result.status === "success") {
          setActivePageIndex(2)
          // console.log("status", result.status)
        }
        // Handle failure accordingly
        // setActivePageIndex(3)
        else {
          // console.error("Session unsuccessful or confirm_url missing.");
        }
      }
    });
  }, [])

  useEffect(() => {

    if (activePageIndex === 1) {
      const postData = async () => {


        if (flywireAPI && flywireAPIKEY) {
          const response = await fetch("/api/generateFwLink", {
            method: 'POST',
            body: JSON.stringify({
              ...price?.config,
              "payor_id": personalData?.email,
              "options": {
                "form": {
                  "action_button": "save",
                  "locale": "es-ES"
                }
              },
              "recipient": {
                "fields": [
                  {
                    "id": "program_name",
                    "value": program?.attributes?.name
                  },
                  {
                    "id": "metadatalottus",
                    "value": JSON.stringify(price?.metadata)
                  },
                  {
                    "id": "student_first_name",
                    "value": personalData?.name,
                    "read_only": true
                  },
                  {
                    "id": "student_middle_name",
                    "value": personalData?.last_name,
                    "read_only": true
                  },
                  {
                    "id": "student_last_name",
                    "value": personalData?.second_last_name,
                    "read_only": true
                  },
                  {
                    "id": "curp",
                    "value": curp,
                    "read_only": true
                  },
                  {
                    "id": "student_email",
                    "value": personalData?.email,
                    "read_only": true
                  },
                  {
                    "id": "student_phone",
                    "value": personalData?.phone,
                    "read_only": true
                  },
                  {
                    "id": "residence",
                    "value": personalData?.residence,
                    "read_only": true
                  },
                  {
                    "id": "assessor_name",
                    "value": personalData?.adviser,
                    "read_only": true
                  },
                ]
              },
              "items": [
                {
                  "id": "default",
                  "amount": priceAmount,
                  "description": "My favourite item"
                }
              ],
              "notifications_url": `${process.env.NEXT_PUBLIC_PAYMENT_WEBHOOK}/flywire/webhook`,
            })
          });
          const regExpLink = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
          const res = await response.json()
          if (regExpLink.test(res)) {
            setFlywireLink(await res)
          } else {
            setFlywireLink("error")
          }
          setIsSuccess(true)
        }
      }
      postData()
    }
    if (activePageIndex === 2) {
      router.push(`/checkout-thank-you`);
    }
  }, [activePageIndex])
  useEffect(() => {
  }, [flywireLink])

  return (
    <>
      <Head>
        Checkout
      </Head>

      <ContentFullLayout>
        <section className="w-full bg-surface-0 z-15 transition-transform shadow-15">
          <div className="p-6 border-0 border-solid border-surface-200 border-r-2">
            <div className="w-36 h-9 bg-logo bg-cover bg-center mobile:mx-auto"> </div>
          </div>
        </section>
        <Container classNames="flex mobile:!px-0 mobile:flex-col tablet:flex-col tablet:!px-0 desktop:gap-30 desktop:mt-12 mobile:mt-6 tablet:mt-6">
          <div className="desktop:w-1/2">
            <div className={cn("mobile:w-full", { 'hidden': activePageIndex !== 0 })}>
              <InscriptionForm
                submit={submit}
                setStatus={setStatus}
                residence={residence}
                noResidence={noResidence}
                hasCurp={hasCurp}
                noCurp={noCurp}
                setResidence={setResidence}
                setNoResidence={setNoResidence}
                setHasCurp={setHasCurp}
                setNoCurp={setNoCurp}
                personalData={personalData}
                setPersonalData={setPersonalData}
                curp={curp}
                setCurp={setCurp}
                isValidCurp={isValidCurp}
                setIsValidCurp={setIsValidCurp}
                curpError={curpError}
                setCurpError={setCurpError}
              />
            </div>
            <div className={cn("mobile:w-full flex justify-center min-h-[512px]", { 'hidden': activePageIndex !== 1 }, { 'w-full': flywireLink === "error" })}>
              {
                !flywireLink
                  ? <section className={cn("bg-surface-0")}>
                    <div className="w-full h-full bg-surface-0">
                      <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                    </div>
                  </section>
                  : flywireLink === "error"
                    ? <WebError title="Error" message="Error al conectar a flywire" errorCode="400"></WebError>
                    : <div className="w-full mobile:px-4">
                      <iframe className="mobile:hidden tablet:hidden w-full h-full" src={flywireLink} title="Flywire form"></iframe>
                      <iframe className="desktop:hidden w-full h-full" src={flywireLink} title="Flywire form"></iframe>
                    </div>
              }
            </div>
          </div>
          <div className="desktop:w-1/2 mobile:mt-7">
            <div className={cn("mobile:w-full mobile:px-6 mobile:mb-7", { "mobile:hidden tablet:hidden": flywireLink })}>
              <div className="w-full border border-surface-300 rounded-lg p-4">
                <h3 className="font-headings font-bold text-5.5 leading-6 mb-3">{program?.attributes?.name}</h3>
                {/* se deja pendiente este badge, ya que cada programa cuenta con varias posibles modalidades y aqui solo podríamos elegir una */}
                {/* <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p> */}
                <hr className="text-surface-300" />
                <div className="flex justify-between mt-2">
                  <p className="font-texts">Opción de pago:</p>
                  <p className="text-surface-500 font-texts">{price?.title}</p>
                </div>
                {price?.config?.type == "tokenization_and_pay" && <div className="flex justify-between my-1">
                  <p className="font-texts">Parcialidades:</p>
                  <p className="text-surface-500 font-texts">{price.price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN </p>
                </div>}
                {price?.config?.type == "tokenization_and_pay" &&
                  <div className="flex justify-between mb-2">
                    <p className="font-texts">Costo total:</p>
                    <p className="text-surface-500 font-texts">{price?.total_payment?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</p>
                  </div>}
                <hr className="text-surface-300" />
                <div className="flex justify-between mt-2">
                  {price?.config?.type == "tokenization_and_pay" ? <><p className="font-texts font-bold text-base leading-6"> Parcialidad a pagar</p>
                    <p className="text-base font-bold">{price.price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</p></>
                    : <><p className="font-texts font-bold text-base leading-6"> Total a pagar</p>
                      <p className="text-base font-bold">{
                        price?.total_payment ?
                          (price?.total_payment?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
                          : price?.discounted_price ?
                            (price?.discounted_price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })) :
                            (price?.price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
                      } MXN</p></>}
                </div>
              </div>

              <div className={cn("flex flex-col my-6", { ["hidden"]: activePageIndex !== 0 })}>
                <Button
                  dark
                  data={{
                    type: "primary",
                    title: "Inscribirme ahora",
                    isExpand: true,
                    disabled: !isValid
                  }}
                  onClick={() => {
                    setActivePageIndex(activePageIndex + 1)
                  }}
                />
              </div>
              <div className="flex mt-3">
                <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">Al llenar tus datos aceptas nuestro</p>
                <Link href="terminos-y-condiciones" passHref target={"_blank"}> {/* deberia ir a aviso de privacidad???*/}
                  <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de Privacidad</p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </ContentFullLayout>
    </>);
}



export async function getStaticPaths() {

  return {
    paths: [
      {
        params: {
          program: '0',
          id: '0',
        },
      },
    ],
    fallback: true,

  };
}
export async function getStaticProps(context: any): Promise<{ props: PageProps }> {
  const {
    params: { id = null, program = null },
  } = context;

  if (program && Number(id)) {
    const programData = await getProgramById(program);
    const price = await programData?.attributes?.price_list?.price.filter((price: any) => price.id === id)[0]
    return {
      props: {
        program: programData,
        price
      },
    };
  } else {
    const programData = null;
    const price = null
    return {
      props: {
        program: programData,
        price
      },
    }
  }

}

export default CheckoutPage