import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useContext, useEffect, useState } from "react"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import { InscriptionForm } from "@/forms/container/InscriptionForm"
import Button from "@/old-components/Button/Button"
import cn from "classnames"
import React from "react"
import { useRouter } from "next/router";
import WebError from "@/components/sections/WebError";
import Container from "@/layouts/Container.layout"
import { AddressElement, CardElement, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, useCustomCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { json } from "stream/consumers"
import PersonalData from "@/forms/steps/PersonalData"
import { CustomCheckoutProvider } from '@stripe/react-stripe-js';
import * as Stepper from '@/forms/steps/Stepper'
import { createContext } from "vm"
import PaymentForm from "@/forms/container/paymentForm"
import Stripe from "stripe"
import Input from "@/old-components/Input/Input"
type PageProps = {
  program?: ProgramData | null;
  price: any;
};


const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const stripePublicKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
  //@ts-ignore
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?.toString());

  const { program = null, price = {} } = props;
  console.log(price)
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
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isSuccessPayment, setIsSuccessPayment] = useState(false)
  const [oxxoVoucherUrl, setOxxoVoucherUrl] = useState('/')

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
  const [payerData, setPayerData] = useState(initialDataPayer)
  const [clientSecret, setClientSecret] = useState('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const onChangeStep = (step: number) => {
    setActiveStep(step);
  }


  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "session_config": {
            "return_url": "https://example.com/success",
            "line_items": [{ "price": "price_1QDarDC7WSf2QaV6u7I4P8Wk", "quantity": 1 }],
            "mode": "payment",
            "ui_mode": "embedded",
            "allow_promotion_codes": true
          },
          "school": "UTC"
        }
      )
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, [priceAmount]);
  // useEffect(()=>{console.log('loading:',isLoadingPayment)},[isLoadingPayment])

  return (
    <>
      <Head>
        Checkout
      </Head>

      <ContentFullLayout classNames="min-h-screen">
        <section id="Navbar" className={cn("w-full flex align-middle items-center bg-surface-0 z-15 shadow-lg h-[69px] px-6 py-2.5")}>
          <button id='return' className="absolute px-6 py-2.5 left-0 top-0 flex align-middle items-center h-[69px] text-primary-500 " onClick={() => router.back()}>
            <span className="material-symbols-outlined font-bold !text-base">chevron_left</span>
            <span className="ml-2 font-texts font-bold text-base">Salir</span>
          </button>
          <div className="w-36 h-9 bg-logo bg-cover bg-center mx-auto"> </div>
        </section>
        <div className="flex space-x-0 h-0 w-full">
          <div className={cn("border-[3px] border-solid w-1/3 h-0", {
            ['border-primary-500']: activeStep >= 0,
            ['border-primary-50']: activeStep < 0
          })}>
          </div>
          <div className={cn("border-[3px] border-solid w-1/3 h-0", {
            ['border-primary-500']: activeStep >= 1,
            ['border-primary-50']: activeStep < 1
          })}>
          </div>
          <div className={cn("border-[3px] border-solid w-1/3 h-0", {
            ['border-primary-500']: activeStep >= 2,
            ['border-primary-50']: activeStep < 2
          })}>
          </div>
        </div>

        <Container classNames="flex mobile:!px-0 mobile:flex-col tablet:gap-20 tablet:mt-12  desktop:gap-30 desktop:mt-12 h-screen w-full ">
          <div id="steps" className={cn("desktop:w-1/2 tablet:w-1/2 mobile:p-6 h-fit", { 'hidden': isLoadingPayment && !isSuccessPayment })}>
            {/* <PaymentForm/> */}


            <Stepper.Root direction="vertical" activeId={activeStep}>
              <Stepper.Item title="Información del alumno" completed={activeStep > 0} rightElement={
                <button className={cn({ 'hidden font-normal': activeStep == 0 || isSuccessPayment })} onClick={() => onChangeStep(0)}><p className="font-normal text-surface-600 text-sm">Editar</p></button>
              }>
                <div className={cn("w-full flex flex-col justify-normal desktop:mx-2 tablet:mx-2 mobile:mb-6 ", { 'hidden': activeStep !== 0 })}>
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
                    </div></div>}

                </div>
                {
                  activeStep > 0 && (
                    <div className="font-text text-sm font-semibold text-surface-300 mobile:pl-2.5 flex flex-col space-y-1">
                      <p className="font-text text-sm font-semibold text-surface-400">{personalData.name + ' ' + personalData.last_name + ' ' + personalData.second_last_name}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{curp}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{personalData.email}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{personalData.phone}</p>
                    </div>
                  )
                }
              </Stepper.Item>
              <Stepper.Item title="Datos del Titular de Pago" completed={activeStep > 1} id="1" rightElement={
                <button className={cn({ 'hidden font-normal': activeStep <= 1 || isSuccessPayment })} onClick={() => onChangeStep(1)}><p className="font-normal text-surface-600 text-sm">Editar</p></button>
              }>
                {activeStep == 1 &&
                  // <div className="my-3 flex-col space-y-3 desktop:w-full">
                  //   <h3 className="text-surface-950 font-bold font-texts text-base mb-3">Dirección</h3>
                  //   {clientSecret && <Elements stripe={stripePromise} options={{
                  //     appearance: {
                  //       theme: 'flat',    // Other themes: 'stripe', 'night', 'none'
                  //       variables: {
                  //         colorPrimary: '#0570de',
                  //         colorBackground: '#f6f9fc',
                  //         colorText: '#30313d',
                  //         fontFamily: 'Ideal Sans, system-ui, sans-serif',
                  //       }
                  //     },
                  //     clientSecret: clientSecret

                  //   }}>
                  //     <AddressElement onChange={(e: any) => setPayerData({
                  //       name: e?.value?.name,
                  //       email: e?.Value?.email,
                  //       phone: e?.value?.phone,
                  //       address: e?.value?.address?.line1 + ', ' + e?.value?.address?.postal_code + ', ' + e?.value?.address?.city + ', ' + e?.value?.address?.state,
                  //     })}
                  //       options={{
                  //         mode: 'billing', // También puede ser 'shiping'
                  //         allowedCountries: ['US', 'CA', 'MX'], // Configura los países permitidos
                  //         fields: {
                  //           phone: 'always', // Otros valores posibles: 'always', 'auto'
                  //         }
                  //       }} />
                  //   </Elements>}
                  //   <button disabled={personalData.email === ''} className={cn("rounded w-fit  px-3 py-2  text-surface-0 font-text text-sm font-bold", {
                  //     ['bg-primary-300']: personalData.email == '',
                  //     ['bg-primary-500']: personalData.email !== '',
                  //   })} onClick={() => onChangeStep(2)}>Continuar</button>
                  // </div>
                  // <PaymentForm/>
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: clientSecret }} >
                    <EmbeddedCheckout className="" />
                  </EmbeddedCheckoutProvider>
                }



                {
                  activeStep > 1 && (
                    <div className="font-text text-sm font-semibold text-surface-300 pl-2.5 flex flex-col space-y-1">
                      <p className="font-text text-sm font-semibold text-surface-400">{payerData?.name}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{payerData?.email}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{payerData?.phone}</p>
                      <p className="font-text text-sm font-semibold text-surface-400">{payerData?.address}</p>
                    </div>
                  )
                }

              </Stepper.Item>

              {/* <Stepper.Item title="Método de pago" completed={isSuccessPayment} id="2" >
                {activeStep == 2 && clientSecret && !isSuccessPayment && (
                  <div className="desktop:w-full">
                    <Elements stripe={stripePromise} options={{
                      appearance: {
                        theme: 'flat',    // Other themes: 'stripe', 'night', 'none'
                        variables: {
                          colorPrimary: '#0570de',
                          colorBackground: '#f6f9fc',
                          colorText: '#30313d',
                          fontFamily: 'Ideal Sans, system-ui, sans-serif',
                        }
                      },
                      clientSecret: clientSecret

                    }}>
                      <PaymentForm amount={priceAmount} setIsSuccessPayment={setIsSuccessPayment} setIsLoadingPayment={setIsLoadingPayment} setOxxoVoucherUrl={setOxxoVoucherUrl} />
                    </Elements></div>)}
                {
                  isSuccessPayment && (
                    <div className="font-text text-sm font-semibold text-surface-300 mobile:pl-12 flex flex-col space-y-1">
                      <p className="font-text text-sm font-semibold text-surface-400 pl-2.5">Recuerda que tu ficha de pago tiene una vigencia de 2 días. Al vencer tendrás que volver a solicitar una nueva ficha de pago</p>
                      {oxxoVoucherUrl !== '/' && <button className="mobile:w-full rounded bg-primary-500  text-surface-0 mt-3 py-3 px-4" onClick={() => router.push(oxxoVoucherUrl)}>Descargar ficha de Pago</button>}
                    </div>

                  )
                }
              </Stepper.Item> */}
            </Stepper.Root>

          </div>
          {!isSuccessPayment && isLoadingPayment &&
            <div className="h-screen flex flex-col justify-center items-center align-middle">
              <span className="material-symbols-outlined text-info-300 !text-[80px] align-middle animate-spin">progress_activity</span>
              <p className="text-center font-text ">¡Ya casi listo! </p>
              <p className="text-center font-text" >Estamos procesando tu pago</p>
            </div>
          }
          {!isLoadingPayment && <div id="payment-card" className={cn("desktop:w-1/2 ", { 'hidden': isSuccessPayment })}>
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
                <div id='coupons' className="flex space-x-2 h-11 mb-2">
                  <Input  data={{
                    label: 'Inserta Cupón',
                    name: 'cupon',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphanumeric: false,
                    pattern: '',
                    isRequired: true,
                    disabled: false
                  }}
                    eventKeyPress={(e: CustomEvent) => { console.log('cupon keypress') }}
                    eventFocus={() => { console.log('focus cupon') }}
                    errorMessage={'Ingresa cupón válido'}
                    hasError={false}
                  />
                  <button className={cn("rounded w-fit h-11 px-3 py-2  text-surface-0 font-text text-sm font-bold bg-primary-400")}
                    onClick={() => console.log('aplicar cupon')}>Aplicar</button>

                </div>
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
              {/* <div id="btn-inscribir" className="mobile:mb-4 hidden">
                <div className={cn("flex flex-col  my-6", { ["hidden"]: activeStep < 2 })}>
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
                <div className="flex mt-3 mobile:hidden">
                  <span className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">
                    Al llenar tus datos aceptas nuestro <a className="text-3.5 font-texts font-normal text-sm text-surface-800 underline"
                      href="/terminos-y-condiciones"
                      target="_blank">
                      Aviso de Privacidad
                    </a>
                  </span>
                </div>
              </div> */}
            </div>
          </div>}
          {/* <div id='Pago-seguro' className={cn("flex flex-col space-y-1 my-6 px-6 desktop:hidden",{'hidden':isSuccessPayment})}>
            <span className="w-6 h-6 material-symbols-outlined text-lg text-info-700">
            encrypted
            </span>
            <p className="font-text text-base font-bold text-surface-950">Pago 100% seguro</p>
            <p className="font-texts text-xs font-normal text-surface-950">Tu información está protegida con encriptación avanzada.</p>
            <div id='img-payment-methods' className="flex h-[25px]">
              <img src={price?.payment_provider_image?.data?.attributes?.url} className="h-[25px] w-fit mt-3" />
            </div>
          </div> */}
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