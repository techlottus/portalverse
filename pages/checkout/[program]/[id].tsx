import { ReactNode } from "react";
import Head from "next/head"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useState } from "react"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
import { InscriptionForm } from "@/forms/container/InscriptionForm"

import Link from "next/link"
import Button from "@/old-components/Button/Button"
import cn from "classnames"
import React from "react"
import axios from "axios";
import Aspect from "@/components/Aspect";

type PageProps = {
  program?: ProgramData | null;
  price: any;
};

const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {

  // const curpEndPoint = process.env.NEXT_PUBLIC_CURP_ID_END_POINT!;
  // const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
  const { program = null, price = {} } = props;
  
  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState('')
  const priceAmount = price?.price * 100 || 100000;

  const [residence, setResidence] = useState<any>()
  const [noResidence, setNoResidence] = useState<any>()
  const [hasCurp, setHasCurp] = useState<any>()
  const [noCurp, setNoCurp] = useState<any>()
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

  const setStatus = ({ loading, valid, success }: { loading: boolean, valid: boolean, success: boolean }) => {
    setIsVisible(!loading && !error)
    setIsLoading(loading)
    setIsValid(valid)
    setIsSuccess(success)
    console.log("Valid : ",valid)
  }

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    residence:""
  });

  useEffect(()=> {
    console.log("isValid: ",isValid)
  },[isValid])

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
                  // Falta agregar email en campos y dejarlo en el estado de personal data, al igual que el telefono
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

          const res = await response.json()
          setFlywireLink(await res)
        }
      }
      postData()
    }
  }, [activePageIndex])
  useEffect(() => {
  }, [flywireLink])



  const onSubmitForm = async () => {

    /* const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO; */
    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.last_name;
    const apellidoMaterno = personalData?.second_last_name;
    const email = personalData?.email;
    const telefono = personalData?.phone;
    const fechaNacimiento = personalData?.birthdate;
    const genero = personalData?.gender;

    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}&email=${email}&telefono=${telefono}&fechaNacimiento=${fechaNacimiento}&genero=${genero}`;

  }
//  console.log("program: ",program?.attributes)
//  console.log("price: ",price)
  
  return (
    <>
      <Head>
        title
      </Head>
      <HeaderFooterLayout breadcrumbs={false}>
        <ContentFullLayout>
          <div className="flex w-full justify-center py-12">
            <div className={cn({'hidden': activePageIndex !== 0})}>

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
            <div className={cn("w-1/2 h-full", {'hidden': activePageIndex !== 1})}>
              {
                !flywireLink
                  ? <p>... loading</p>
                  : <Aspect ratio="3/4"><iframe width="500px" height="500px"  src={flywireLink} title="Flywire form"></iframe></Aspect>
              }
            </div>
            
            <div className="mobile:col-span-2 desktop:pl-6">
            <div className="border border-surface-300 rounded-lg p-4">
              <h3 className="font-headings font-bold text-5.5 leading-6">{program?.attributes?.name}</h3>
              {/* se deja pendiente este badge, ya que cada programa cuenta con varias posibles modalidades y aqui solo podríamos elegir una */}
              {/* <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p> */}
              <hr className="text-surface-300" />
              {price?.config?.type =="recurring" && <div className="flex justify-between mt-2">
                <p className="font-texts">Opción de pago:</p>
                <p className="text-surface-500 font-texts">{price?.title}</p>
              </div>}
              {price?.config?.type =="recurring" &&<div className="flex justify-between my-1">
                <p className="font-texts">Parcialidades:</p>
                <p className="text-surface-500 font-texts">{price.price?.toLocaleString('es-MX',{style: 'currency',currency:'MXN'})} MXN </p>
              </div>}
              {price?.config?.type =="recurring" &&
              <div className="flex justify-between mb-2">
                <p className="font-texts">Costo total:</p>
                <p className="text-surface-500 font-texts">{price?.total_payment?.toLocaleString('es-MX',{style: 'currency',currency:'MXN'})} MXN</p>
              </div>}
              <hr className="text-surface-300" />
              <div className="flex justify-between mt-2">
              {price?.config?.type =="recurring" ?  <><p className="font-texts font-bold text-base leading-6"> Parcialidad a pagar</p>
                <p className="text-base font-bold">{price.price?.toLocaleString('es-MX',{style: 'currency',currency:'MXN'})} MXN</p></>
                  :<><p className="font-texts font-bold text-base leading-6"> Total a pagar</p>
                <p className="text-base font-bold">{price?.total_payment?.toLocaleString('es-MX',{style: 'currency',currency:'MXN'})} MXN</p></>}
              </div>
            </div>
                {
                  residence &&
                  <div className="flex flex-col my-6">
                    <Button
                      dark
                      data={{
                        type: "primary",
                        title: "Inscribirme ahora",
                        isExpand: true,
                        disabled: false
                      }}
                      onClick={() => {
                        // onSubmitCurp()
                        setActivePageIndex(activePageIndex + 1)
                      }}
                    />
                  </div>
                }
                {
                  noResidence &&
                  <div className={cn("flex flex-col my-6", { "hidden": !hasCurp })}>
                    <Button
                      dark
                      data={{
                        type: "primary",
                        title: "Inscribirme ahora",
                        isExpand: true,
                        disabled: false
                      }}
                      onClick={() => {
                        // onSubmitCurp()
                        setActivePageIndex(activePageIndex + 1)
                      }}
                    />
                  </div>
                }
                {
                  noCurp &&
                  <div className="flex flex-col my-6">
                    <Button
                      dark
                      data={{
                        type: "primary",
                        title: "Inscribirme ahora",
                        isExpand: true,
                        disabled: !isValid
                      }}
                      onClick={() => {
                        onSubmitForm()
                      }}
                    />
                  </div>
                }
                <div className="flex">
                  <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">Al llenar tus datos aceptas nuestro</p>
                  <Link href="terminos-y-condiciones" passHref target={"_blank"}> {/* deberia ir a aviso de privacidad???*/}
                    <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de Privacidad</p>
                  </Link>
                </div>
              </div>
            </div>
        </ContentFullLayout>
      </HeaderFooterLayout>
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
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"

  };
}
export async function getStaticProps(context: any): Promise<{ props: PageProps }> {
  const {
    params: { id = null, program = null },
  } = context;

  if (program && Number(id)) {
    const programData = await getProgramById(program);
    const price = await programData?.attributes.price_list.price.filter((price: any) => price.id === id)[0]
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