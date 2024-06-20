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

type PageProps = {
  program?: ProgramData | null;
  price: any;
};

const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {

  const { program = null, price = {} } = props;

  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState('')
  const priceAmount = price?.price * 100 || 100000;

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
    console.log("Valid : ", valid)
  }
  const initialData = {
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    residence: ""
  }

  const [personalData, setPersonalData] = useState(initialData);

  useEffect(() => {
   

    window.addEventListener("message", (event) => {
      console.log("event: ",event)
      // IMPORTANT: Verify the origin of the data to ensure it is from Flywire
      // The use of indexOf ensures that the origin ends with ".flywire.com"
      if (event.origin.indexOf(".flywire.com") > 0) {
        // If the message was sent from Flywire:
        // Extract the data from the event
        const result = event.data;
        console.log("event data:", result)
        console.log('result: ', result);
        

        // Check if the session was successful and confirm_url is present:
        if (result.success && result.confirm_url) {
          // The session was successful and the confirm_url has been returned
          const confirm_url = result.confirm_url;

          // Use the confirm_url to confirm the Checkout Session
          console.log("Confirm URL:", confirm_url.url);
          setActivePageIndex(2)

        } else if (event.origin.indexOf(".vercel.live") > 0){
          setActivePageIndex(2)
        }
          // Handle failure accordingly
          // setActivePageIndex(3)
          else{console.error("Session unsuccessful or confirm_url missing.");
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
              "payor_id": "payor_test_thor",
              "options": {
                "form": {
                  "action_button": "save",
                  "locale": "es"
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
          if(regExpLink.test(res)){
            setFlywireLink(await res)
          }else{
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
          <div className="p-6  border-0 border-solid border-surface-200 border-r-2">
            <div className="w-36 h-9 bg-logo bg-cover bg-center"> </div>
          </div>
        </section>
        <div className="flex w-full mobile:flex-col justify-center py-12 gap-x-30 tablet:gap-x-5">
          <div className={cn("w-1/2 mobile:w-full flex desktop:pl-18", { 'hidden': activePageIndex !== 0 })}>
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
          <div className={cn("w-1/2 pl-6 min-h-[512px]", { 'hidden': activePageIndex !== 1 })}>
            {
              !flywireLink
                ? <section className={cn("p-6 shadow-15 bg-surface-0 relative")}><div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0 bg-surface-0">
                <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
              </div></section>
                : flywireLink==="error"? <WebError title="Error" message="Error al conectar a flywire" errorCode="400"></WebError>
                :<Aspect ratio="3/4"><iframe width="500px" height="500px" src={flywireLink} title="Flywire form"></iframe></Aspect>
                
            }
          </div>

          <div className="w-1/2 mobile:w-full pr-6 mobile:px-6">
            <div className="border border-surface-300 rounded-lg p-4 max-w-sm">
              <h3 className="font-headings font-bold text-5.5 leading-6 mb-3">{program?.attributes?.name}</h3>
              {/* se deja pendiente este badge, ya que cada programa cuenta con varias posibles modalidades y aqui solo podríamos elegir una */}
              {/* <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p> */}
              <hr className="text-surface-300" />
              {price?.config?.type == "tokenization_and_pay" && <div className="flex justify-between mt-2">
                <p className="font-texts">Opción de pago:</p>
                <p className="text-surface-500 font-texts">{price?.title}</p>
              </div>}
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
                    <p className="text-base font-bold">{price?.total_payment?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN</p></>}
              </div>
            </div>

            <div className={cn("flex flex-col my-6 max-w-sm", { ["hidden"]: activePageIndex !== 0 })}>
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