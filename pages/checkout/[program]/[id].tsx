import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import cn from "classnames"
import React, { use, useEffect, useState} from "react"
import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as PersonalData from "@/forms/components/PersonalData";
import * as Field from "@/components/lottus-education/Field"
import Radio from "@/components/lottus-education/Radio"
import configControls from "@/forms/fixtures/controls"
import * as Stepper from '@/components/lottus-education/Stepper'
import CurpData from "@/forms/components/CurpData"
import Checkbox from "@/old-components/Checkbox";
import Input from "@/components/lottus-education/Input"

type PageProps = {
  program?: ProgramData | null;
  price: any;
};

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { program = null, price = {} } = props;

  //@ts-ignore
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?.toString());

  const priceAmount = price?.discounted_price || price?.price;
  const priceString = priceAmount?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
  const partialityString = price?.partiality_price?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

  const [residence, setResidence] = useState<any>(null)
  const [hasCurp, setHasCurp] = useState<any>(null)
  const [adviser, setAdviser] = useState<any>(false)
  // const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<boolean>();
  // const [submit, setSubmit] = useState(false);
  const [isValidCurp, setIsValidCurp] = useState(false);
  const [curpError, setCurpError] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  // const [isSuccessPayment, setIsSuccessPayment] = useState(false)



  const router = useRouter();

  // const setStatus = ({ valid }: { valid: boolean }) => {
  //   setIsValid(valid)
  // }
  const initialData = {
    curp: "",
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

  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    secons_last_name: false,
    gender: false,
    birthdate: false,
    phone: false,
    email: false,
  })

  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    last_name: false,
    secons_last_name: false,
    gender: false,
    birthdate: false,
    phone: false,
    email: false,
  })


  const [personalData, setPersonalData] = useState(initialData);
  const [clientSecret, setClientSecret] = useState('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);


  const onChangeStep = (step: number) => {
    setActiveStep(step);
  }
  // todo pasar a una funcion general exportable
  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'birthdate') {
      return true
    }
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
    }
    return !!value.trim()
  };

  const path: string = origin + "/checkout-thank-you";

  useEffect(() => {
    // TODO: Conect to prod
    // setPersonalData({...personalData, residence: residence? "Nacional" : "Extranjero"})
    // console.log(personalData)
    if (price.config && activeStep == 1) {
      fetch('https://app-cv-webhook-payments-qa.azurewebsites.net/service/api/v1/portal/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "session_config": {
              "return_url": path,
              "payment_method_types": JSON.parse(JSON.stringify(price.config["payment_method_types"])),
              "line_items": [{ "price": price?.config["price_id"], "quantity": 1 }],
              "mode": price.config["mode"],
              "ui_mode": "embedded",
              "allow_promotion_codes": price.config["allow_promotion_codes"],
              "billing_address_collection": "auto",
              "phone_number_collection": {
                "enabled": true
              },
              "metadata": { ...price?.metadata, "extra_fields": JSON.stringify({...personalData, residence: residence? "Nacional" : "Extranjero"}) }
            },
            "school": businessUnit
          }
        )
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.data.client_secret))
        .catch((err) => console.error(err));
    }
    console.log("price ", price)
  }, [activeStep]);

  return (
    <>
      <Head>
        Checkout
      </Head>

      <ContentFullLayout classNames="min-h-screen">
        <section id="Navbar" className={cn("w-full flex align-middle items-center bg-surface-0 z-15 shadow-lg h-fit desktop:px-6 desktop:py-4 tablet:px-6 tablet:py-4")}>
          <div className="w-36 h-9 bg-logo bg-cover bg-center mx-auto mobile:hidden"> </div>
          <div className="w-full flex items-center justify-center">
            <div id="steps" className={cn("w-[400px] mobile:w-50  desktop:h-fit mobile:h-[81px] ")}>
              <Stepper.Root direction="horizontal" activeId={activeStep}>
                <Stepper.Item title="Datos del alumno" completed={activeStep > 0} />
                <Stepper.Item title="Datos de pago" completed={activeStep > 1} />
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

        <Container classNames="flex desktop:space-x-40 mobile:flex-col tablet:gap-20 tablet:mt-12 desktop:mt-12 h-screen w-full mobile:p-6">
          {activeStep == 0 && <div className={cn("mobile:w-full w-1/2 flex flex-col justify-normal desktop:mx-2 tablet:mx-2 mobile:mb-6 gap-3 ")}>
            <h3 className="text-surface-950 font-bold font-texts text-base">Información del alumno</h3>

            <Field.Root >
              <Field.Label >¿Es Mexicano? <span className="text-error-500 ml-1">*</span> </Field.Label>
              <div className="flex justify-start gap-4">
                <Radio
                  name={"residence"}
                  disabled={false}
                  hasError={false}
                  value={residence}
                  checked={residence}
                  onChange={() => {
                    setResidence(true)
                    setHasCurp(true)
                    setPersonalData({ ...personalData, residence: "Nacional" })
                  }}
                >
                  Si
                </Radio>
                <Radio
                  name={"residence"}
                  disabled={false}
                  hasError={false}
                  value={residence}
                  checked={!residence && residence !== null}
                  onChange={() => {
                    setResidence(false)
                    setPersonalData({ ...personalData, residence: "Extranjero" })
                  }}
                >
                  No
                </Radio>
              </div>
            </Field.Root>
            {/* ********************************************************************************
              * CURP radios
             ***********************************************************************************/}
            {!residence && residence !== null && <Field.Root >
              <Field.Label >¿Tiene CURP? <span className="text-error-500 ml-1">*</span> </Field.Label>
              <div className="flex justify-start gap-4">
                <Radio
                  name={"hascurp"}
                  disabled={false}
                  hasError={false}
                  value={hasCurp}
                  checked={hasCurp}
                  onChange={() => {
                    setHasCurp(true)
                  }}
                >
                  Si
                </Radio>
                <Radio
                  name={"hascurp"}
                  disabled={false}
                  hasError={false}
                  value={hasCurp}
                  checked={!hasCurp}
                  onChange={() => {
                    setHasCurp(false)
                  }}
                >
                  No
                </Radio>
              </div>
            </Field.Root>}
            {/* ********************************************************************************
              * Curp data input
             ***********************************************************************************/}
            {hasCurp && <CurpData
              personalData={personalData}
              setPersonalData={setPersonalData}
              personalDataTouched={personalDataTouched}
              setPersonalDataTouched={setPersonalDataTouched}
              curp={curp}
              setCurp={setCurp}
              isValidCurp={isValidCurp}
              setIsValidCurp={setIsValidCurp}
              curpError={curpError}
              setCurpError={setCurpError}
            />}
            {/* ********************************************************************************
              * Personal Data filled
             ***********************************************************************************/}
            {(hasCurp && isValidCurp) && <PersonalData.Root
              personalData={personalData}
              setPersonalData={setPersonalData}
              infoControlsTouched={personalDataTouched}
              setInfoControlsTouched={setPersonalDataTouched}
              errorControls={personalDataErrors}
              setErrorControls={setPersonalDataErrors}
              validateControl={validatePersonalDataControl}
            >
              <PersonalData.Name disabled />
              <div className="mobile:mt-3 flex gap-3 justify-between w-full">
                <PersonalData.SurName disabled placeholder="Apellido Paterno" />
                <PersonalData.SurName disabled last_name_2 placeholder="Apellido Materno" />
              </div>
              <div className="mobile:mt-3 flex gap-3 justify-between w-full">
                <PersonalData.Birthdate disabled />
                <PersonalData.Gender disabled />
              </div>
              <h3 className="text-surface-950 font-bold font-texts text-base">Datos de contacto  <span className="text-error-500 ml-1">*</span></h3>
              <PersonalData.Phone />
              <PersonalData.Email />
            </PersonalData.Root>}
            {/* ********************************************************************************
              * Personal Data no filled
             ***********************************************************************************/}
            {(hasCurp && !isValidCurp) || (!hasCurp && residence !== null) && <PersonalData.Root
              personalData={personalData}
              setPersonalData={setPersonalData}
              infoControlsTouched={personalDataTouched}
              setInfoControlsTouched={setPersonalDataTouched}
              errorControls={personalDataErrors}
              setErrorControls={setPersonalDataErrors}
              validateControl={validatePersonalDataControl}
            >
              <PersonalData.Name />
              <div className="mobile:mt-3 flex gap-3 justify-between w-full">
                <PersonalData.SurName placeholder="Apellido Paterno" />
                <PersonalData.SurName last_name_2 placeholder="Apellido Materno" />
              </div>
              <div className="mobile:mt-3 flex gap-3 justify-between w-full">
                <PersonalData.Birthdate />
                <PersonalData.Gender />
              </div>

              <h3 className="text-surface-950 font-bold font-texts text-base">Información del alumno</h3>
              <PersonalData.Phone />
              <PersonalData.Email />
            </PersonalData.Root>}
            {/* ********************************************************************************
              * Adviser
             ***********************************************************************************/}
            {((isValidCurp) || (hasCurp===false ))  && <div className="flex items-center">
              <Checkbox data={{
                name: "adviser",
                disabled: false,
                selected: adviser,
                tagOnCheck: undefined,
                value: ""
              }} onCheck={() => {
                setAdviser(!adviser)
              }} />
              <p className="font-texts font-bold text-base text-surface-950 ml-2">¿Recibiste ayuda de un asesor? <span className="font-texts text-sm text-surface-500 font-semibold">(Opcional)</span></p>
            </div>}
            {adviser && <div className="col-span-2">
              <Input
                placeholder='Nombre del asesor'
                name='adviser'
                type='text'
                disabled={false}
                required={true}
                onKeyUp={(e: any) => setPersonalData({...personalData,adviser:e.target.value})}
                onFocus={(e: any) => setPersonalData({...personalData,adviser:e.target.value})}
                onChange={(e: any) => setPersonalData({...personalData,adviser:e.target.value})}
              />
            </div>}
            {/* ********************************************************************************
              * Aviso de privacidad
             ***********************************************************************************/}
            {hasCurp && <div className={cn("flex text-wrap")}>
              <span className={cn("text-xs leading-5 text-surface-900 font-texts font-normal")}>
                Al llenar tus datos aceptas nuestro <a className="text-xs font-texts font-normal text-surface-900 underline"
                  href="/terminos-y-condiciones"
                  target="_blank">
                  Aviso de Privacidad
                </a>
              </span>
            </div>}
            {/* ********************************************************************************
              * Boton de continuar
             ***********************************************************************************/}
            {(hasCurp || (!residence && !hasCurp)) &&
              <div>
                <button disabled={personalData.email === ''} className={cn("rounded-lg w-fit px-8 py-4 text-surface-0 font-text text-base font-bold", {
                  ['bg-primary-300']: personalData.email == '',
                  ['bg-primary-500']: personalData.email !== '',
                })} onClick={() => onChangeStep(1)}>Continuar</button>
                <button id='return' className="flex align-middle items-center text-primary-500 mt-6" onClick={() => router.back()}>
                  <span className="material-symbols-outlined font-bold !text-base">chevron_left</span>
                  <span className="ml-2 font-texts font-bold text-base">Volver</span>
                </button>
              </div>}
          </div>}
          {/* ********************************************************************************
              * Embed Checkout
             ***********************************************************************************/}
          {activeStep == 1 &&
            <div className="flex w-full">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: clientSecret , onComplete: () =>setIsLoadingPayment(true)}} >
                <EmbeddedCheckout className="w-full" />
              </EmbeddedCheckoutProvider>
            </div>}
          {/* ********************************************************************************
              * Loading iframe
             ***********************************************************************************/}
          { isLoadingPayment &&
            <div className="h-screen flex flex-col justify-center items-center align-middle">
              <span className="material-symbols-outlined text-info-300 !text-[80px] align-middle animate-spin">progress_activity</span>
              <p className="text-center font-text ">¡Ya casi listo! </p>
              <p className="text-center font-text" >Estamos procesando tu pago</p>
            </div>
          }
          {/* ********************************************************************************
              * Payment card
          ***********************************************************************************/}
          { activeStep == 0 && <div id="payment-card" className={cn("desktop:max-w-96 mobile:w-full flex flex-col")}>
            <div className={cn("flex mobile:w-full  flex-col mobile:flex-col-reverse ")}>
              <div className="w-full border border-surface-200 rounded p-4">
                <h3 className="font-texts font-bold text-lg mobile:text-base leading-6 mb-3">{program?.attributes?.name}</h3>
                <hr className="text-surface-200" />
                <div className="flex justify-between my-3">
                  <p className="font-texts font-semibold text-sm">Opción de pago:</p>
                  <p className="text-surface-600 font-texts font-semibold text-sm">{price?.title}</p>
                </div>
                {price?.config?.mode == "subscription" ? <div className="flex justify-between my-1">
                  <p className="font-texts font-semibold text-sm">Parcialidades:</p>
                  <p className="text-surface-500 font-texts font-normal text-sm">{price?.partialities_number}</p>
                </div>: <div className="flex justify-between my-1">
                  <p className="font-texts font-semibold text-sm">Precio:</p>
                  <p className="text-surface-500 font-texts font-normal text-sm">{priceString} MXN</p>
                </div>}
                {price?.config?.mode == "subscription" &&
                  <div className="flex justify-between mb-2">
                    <p className="font-texts font-semibold">Costo total:</p>
                    <p className="text-surface-600 font-texts font-normal">{priceString} MXN</p>
                  </div>}
                {/* <div className="flex items-end justify-end text-success-600 font-text text-sm mb-3">AHORRO {`$ ${0.00}`}</div> */}
                <hr className="text-surface-200 mt-3" />
                <div className="flex justify-between mt-3">
                  {
                    price?.config?.mode == "subscription"
                      ? <>
                        <p className="font-texts font-bold text-base leading-6"> Parcialidad a pagar:</p>
                        <p className="text-base font-bold">
                          {partialityString} MXN
                        </p>
                      </>
                      : <>
                        <p className="font-texts font-bold text-base leading-6"> Total a pagar: </p>
                        <p className="font-texts text-base font-bold"> {priceString} MXN </p>
                      </>
                  }
                </div>
              </div>
            </div>
            <div id='Pago-seguro' className={cn("flex flex-col space-y-1 my-6 ")}>
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

          {/* ********************************************************************************
              * Footer links mobile
            ***********************************************************************************/}

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