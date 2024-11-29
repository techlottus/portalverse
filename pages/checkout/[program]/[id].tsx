import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import { InscriptionForm } from "@/forms/container/InscriptionForm"
import cn from "classnames"
import React, { use, useEffect, useState, Fragment } from "react"
import { useRouter } from "next/router";
import WebError from "@/components/sections/WebError";
import Container from "@/layouts/Container.layout"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PersonalData from "@/forms/steps/PersonalData"
import * as Stepper from '@/components/lottus-education/Stepper'
import { Dialog, Transition } from '@headlessui/react'
type PageProps = {
  program?: ProgramData | null;
  price: any;
};


const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  //@ts-ignore
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?.toString());
  const { program = null, price = {} } = props;
  const priceAmount = price?.discounted_price || price?.price;
  const priceString = priceAmount?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
  const partialityString = price?.partiality_price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
  const [residence, setResidence] = useState<any>()
  const [noResidence, setNoResidence] = useState<any>()
  const [hasCurp, setHasCurp] = useState<any>(false)
  const [noCurp, setNoCurp] = useState<any>(true)
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<boolean>();
  const [submit, setSubmit] = useState(false);
  const [isValidCurp, setIsValidCurp] = useState(false);
  const [curpError, setCurpError] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isSuccessPayment, setIsSuccessPayment] = useState(false)


  const router = useRouter();

  const setStatus = ({ valid }: { valid: boolean }) => {
    setIsValid(valid)
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
  const initialDataPayer = {
    name: "",
    email: "",
    phone: "",
    address: "",
  }


  const [personalData, setPersonalData] = useState(initialData);
  const [clientSecret, setClientSecret] = useState('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const onChangeStep = (step: number) => {
    setActiveStep(step);
  }


  useEffect(() => {
    // TODO: Conect to prod
    if(price.config){
    fetch('https://app-cv-webhook-payments-qa.azurewebsites.net/service/api/v1/portal/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "session_config": {
            "return_url": "https://example.com/success",
            "payment_method_types": JSON.parse(JSON.stringify(price.config["payment_method_types"])),
            "line_items": [{ "price": price?.config["price_id"], "quantity": 1 }],
            "mode": price.config["mode"],
            "ui_mode": "embedded",
            "allow_promotion_codes": price.config["allow_promotion_codes"],
            "billing_address_collection": "required",
            "metadata":{...price?.metadata,"extra_fields": JSON.stringify(personalData)}
          },
          "school": "UTC"
        }
      )
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.data.client_secret))
      .catch((err) => console.error(err));}
    console.log("price ", price)
  }, [priceAmount, price]);

  return (
    <>
      <Head>
        Checkout
      </Head>

      <ContentFullLayout classNames="min-h-screen">
        <section id="Navbar" className={cn("w-full flex align-middle items-center bg-surface-0 z-15 shadow-lg h-fit px-6 py-4")}>
          <div className="w-36 h-9 bg-logo bg-cover bg-center mx-auto"> </div>
          <div className="w-full flex items-center justify-center">
            <div id="steps" className={cn("w-[400px] mobile:p-6 h-fit", { 'hidden': isLoadingPayment && !isSuccessPayment })}>
            <Stepper.Root direction="horizontal" activeId={activeStep}>
              <Stepper.Item title="Información del alumno" completed={activeStep > 0} />
              <Stepper.Item title="Método de pago" completed={activeStep > 1} />
            </Stepper.Root>
          </div>
          </div>
          
        </section>
        <div className="flex space-x-0 h-0 w-full">
          <div className={cn("border-[3px] border-solid w-1/2 h-0", {
            ['border-primary-500']: activeStep >= 0,
            ['border-primary-50']: activeStep < 0
          })}>
          </div>
          <div className={cn("border-[3px] border-solid w-1/2 h-0", {
            ['border-primary-500']: activeStep >= 1,
            ['border-primary-50']: activeStep < 1
          })}>
          </div>

        </div>

        <Container classNames="flex space-x-40 mobile:!px-0 mobile:flex-col tablet:gap-20 tablet:mt-12 desktop:mt-12 h-screen w-full ">
          {activeStep == 0 && <div className={cn("w-1/2 flex flex-col justify-normal desktop:mx-2 tablet:mx-2 mobile:mb-6 ")}>
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
            {(hasCurp || (noResidence && noCurp)) && <div><button disabled={personalData.email === ''} className={cn("rounded w-fit px-3 py-2  text-surface-0 font-text text-sm font-bold", {
              ['bg-primary-300']: personalData.email == '',
              ['bg-primary-500']: personalData.email !== '',
            })} onClick={() => onChangeStep(1)}>Continuar</button>
              <div className={cn("flex mt-3 text-wrap")}>
                <span className={cn("text-xs leading-5 text-surface-900 font-texts font-normal")}>
                  Al llenar tus datos aceptas nuestro <a className="text-xs font-texts font-normal text-surface-900 underline"
                    href="/terminos-y-condiciones"
                    target="_blank">
                    Aviso de Privacidad
                  </a>
                </span>
              </div>
              <button id='return' className="py-2.5 flex align-middle items-center text-primary-500 " onClick={() => router.back()}>
                <span className="material-symbols-outlined font-bold !text-base">chevron_left</span>
                <span className="ml-2 font-texts font-bold text-base">Salir</span>
              </button>
            </div>}

          </div>}
          {activeStep == 1 &&
            <div className="flex w-full">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: clientSecret }} >
                <EmbeddedCheckout className="w-full" />
              </EmbeddedCheckoutProvider>
            </div>}
          {!isSuccessPayment && isLoadingPayment &&
            <div className="h-screen flex flex-col justify-center items-center align-middle">
              <span className="material-symbols-outlined text-info-300 !text-[80px] align-middle animate-spin">progress_activity</span>
              <p className="text-center font-text ">¡Ya casi listo! </p>
              <p className="text-center font-text" >Estamos procesando tu pago</p>
            </div>
          }
          {!isLoadingPayment && activeStep == 0 && <div id="payment-card" className={cn("desktop:w-1/2 flex flex-col", { 'hidden': isSuccessPayment })}>
            <div className={cn("flex mobile:w-full mobile:px-6 flex-col mobile:flex-col-reverse ")}>
              <div className="w-full border border-surface-200 rounded p-4">
                <h3 className="font-headings font-bold text-base leading-6 mb-3">{program?.attributes?.name}</h3>
                {/* se deja pendiente este badge, ya que cada programa cuenta con varias posibles modalidades y aqui solo podríamos elegir una */}
                {/* <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p> */}
                <hr className="text-surface-200" />
                <div className="flex justify-between my-3">
                  <p className="font-texts font-semibold text-sm">Opción de pago:</p>
                  <p className="text-surface-600 font-texts font-normal text-sm">{price?.title}</p>
                </div>
                {price?.config?.type == "recurring" && <div className="flex justify-between my-1">
                  <p className="font-texts font-semibold text-sm">Parcialidades:</p>
                  <p className="text-surface-500 font-texts font-normal text-sm">{price?.partialities_number}</p>
                </div>}
                {price?.config?.type == "recurring" &&
                  <div className="flex justify-between mb-2">
                    <p className="font-texts font-semibold">Costo total:</p>
                    <p className="text-surface-600 font-texts font-normal">{priceString} MXN</p>
                  </div>}
                <div className="flex items-end justify-end text-success-600 font-text text-sm mb-3">AHORRO {`$ ${0.00}`}</div>
                <hr className="text-surface-200" />
                <div className="flex justify-between mt-3">
                  {
                    price?.config?.type == "recurring"
                      ? <>
                        <p className="font-texts font-bold text-base leading-6"> Parcialidad a pagar:</p>
                        <p className="text-base font-bold">
                          {partialityString} MXN
                        </p>
                      </>
                      : <>
                        <p className="font-texts font-bold text-base leading-6"> Total a pagar: </p>
                        <p className="text-base font-bold"> {priceString} MXN </p>
                      </>
                  }
                </div>
              </div>
            </div>
            <div id='Pago-seguro' className={cn("flex flex-col space-y-1 my-6 px-6")}>
            <span className="w-6 h-6 material-symbols-outlined text-lg text-info-700">
              encrypted
            </span>
            <p className="font-text text-base font-bold text-surface-950">Pago 100% seguro</p>
            <p className="font-texts text-xs font-normal text-surface-950">Tu información está protegida con encriptación avanzada.</p>
            <div id='img-payment-methods' className="flex h-[25px]">
              <img src={price?.payment_provider_image?.data?.attributes?.url} className="h-[25px] w-fit mt-3" />
            </div>
          </div>
          </div>}
         
          <div className="flex flex-grow items-end pb-[69px] mt-2 desktop:hidden tablet:hidden">
            <div id='legal-links' className=" px-6 py-2 flex justify-between w-full items-end">
              <div><p className="text-xs font-texts font-normal  text-surface-400">
                Universidad
              </p></div>
              <a className="text-xs font-texts font-normal text-surface-400 "
                href="/terminos-y-condiciones"
                target="_blank">
                Aviso de Privacidad
              </a>
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