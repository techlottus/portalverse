import Head from "next/head"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useState } from "react"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import { InscriptionForm } from "@/forms/container/InscriptionForm"
import Button from "@/old-components/Button/Button"
import cn from "classnames"
import React from "react"
import { useRouter } from "next/router";
import WebError from "@/components/sections/WebError";
import Container from "@/layouts/Container.layout"
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { json } from "stream/consumers"
import PersonalData from "@/forms/steps/PersonalData"

type PageProps = {
  program?: ProgramData | null;
  price: any;
};

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY?.toString()
//@ts-ignore
const stripePromise = loadStripe(stripePublicKey);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/complete', // URL para redirigir cuando el pago esté completo
        payment_method_data: {
          billing_details: {
            email: 'test@gmail.com',
            
          }
        },
      }
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddressElement
        options={{
          mode: 'billing', // También puede ser 'shiping'
          allowedCountries: ['US', 'CA','MX'], // Configura los países permitidos
          fields: {
            phone: 'always', // Otros valores posibles: 'always', 'auto'
          }
        }} />
      <PaymentElement options={
        {layout:'accordion'}
      }/>
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
};

const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {

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
  const [activePageIndex, setActivePageIndex] = useState(0);
  // const router = useRouter();

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

  const [personalData, setPersonalData] = useState(initialData);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Llamada a la API Route para obtener el clientSecret
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "amount": priceAmount
      })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Head>
        Checkout
      </Head>

      <ContentFullLayout>
        <section id="Navbar" className="w-full bg-surface-0 z-15 transition-transform shadow-15">
          <div className="p-6 border-0 border-solid border-surface-200 border-r-2">
            <div className="w-36 h-9 bg-logo bg-cover bg-center mobile:mx-auto"> </div>
          </div>
        </section>
        <Container classNames="flex mobile:!px-0 mobile:flex-col tablet:flex-col tablet:!px-0 desktop:gap-30 desktop:mt-12 mobile:mt-6 tablet:mt-6">
          <div id="forms" className="desktop:w-1/2">
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
            {clientSecret &&
              <div className={cn("p-4")}>
                <Elements stripe={stripePromise} options={{
                  clientSecret: clientSecret,
                  appearance: {
                    theme: 'flat',    // Other themes: 'stripe', 'night', 'none'
                    variables: {
                      colorPrimary: '#0570de',
                      colorBackground: '#f6f9fc',
                      colorText: '#30313d',
                      fontFamily: 'Ideal Sans, system-ui, sans-serif',
                    }
                  },             
                  
                }}>
                  <PaymentForm />
                </Elements>
              </div>}
          </div>
          <div id="payment-card" className="desktop:w-1/2 ">
            <div className={cn("flex mobile:w-full mobile:px-6 mobile:mb-7 flex-col mobile:flex-col-reverse ")}>
              <div className="w-full border border-surface-300 rounded-lg p-4">
                <h3 className="font-headings font-bold text-5.5 leading-6 mb-3">{program?.attributes?.name}</h3>
                {/* se deja pendiente este badge, ya que cada programa cuenta con varias posibles modalidades y aqui solo podríamos elegir una */}
                {/* <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p> */}
                <hr className="text-surface-300" />
                <div className="flex justify-between mt-2">
                  <p className="font-texts">Opción de pago:</p>
                  <p className="text-surface-500 font-texts font-normal">{price?.title}</p>
                </div>
                {price?.config?.type == "recurring" && <div className="flex justify-between my-1">
                  <p className="font-texts">Parcialidades:</p>
                  <p className="text-surface-500 font-texts font-normal">{price?.partialities_number}</p>
                </div>}
                {price?.config?.type == "recurring" &&
                  <div className="flex justify-between mb-2">
                    <p className="font-texts">Costo total:</p>
                    <p className="text-surface-500 font-texts font-normal">{priceString} MXN</p>
                  </div>}
                <hr className="text-surface-300" />
                <div className="flex justify-between mt-2">
                  {
                    price?.config?.type == "recurring"
                      ? <>
                        <p className="font-texts font-bold text-base leading-6"> Parcialidad a pagar</p>
                        <p className="text-base font-bold">
                          {partialityString} MXN
                        </p>
                      </>
                      : <>
                        <p className="font-texts font-bold text-base leading-6"> Total a pagar</p>
                        <p className="text-base font-bold"> {priceString} MXN </p>
                      </>
                  }
                </div>
              </div>
              <div id="btn-inscribir" className="mobile:mb-4">
                <div className={cn("flex flex-col  my-6", { ["hidden"]: activePageIndex !== 0 })}>
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
                  <span className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">
                    Al llenar tus datos aceptas nuestro <a className="text-3.5 font-texts font-normal text-sm text-surface-800 underline"
                      href="/terminos-y-condiciones"
                      target="_blank">
                      Aviso de Privacidad
                    </a>
                  </span>
                </div>
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