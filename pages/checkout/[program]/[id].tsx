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
import axios from "axios";

// const axios = require('axios');

type PageProps = {
  program?: ProgramData | null;
  price: any;
};
const CheckoutPage: NextPageWithLayout<PageProps> = (props: PageProps) => {

  const curpEndPoint = process.env.NEXT_PUBLIC_CURP_ID_END_POINT!;
  const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
  const { program=null, price={} } = props;
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

  const setStatus = ({ loading, valid, success }: { loading: boolean, valid: boolean, success: boolean }) => {
    setIsVisible(!loading && !error)
    setIsLoading(loading)
    setIsValid(valid)
    setIsSuccess(success)
  }

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: ""
  });

  useEffect(() => {
    const postData = async () => {
      if (flywireAPI && flywireAPIKEY) {
        const response = await fetch("/api/generateFwLink", {
          method: 'POST',
          body: JSON.stringify({
            ...price?.config,
            "options": {
              "form": {
                "action_button": "save",
                "locale": "en"
              }
            },
            "recipient": {
              // "fields": [
              //   {
              //     "id": "metadatalottus",
              //     "value": JSON.stringify(price?.metadata),
              //     "read_only": true
              //   },
              //   {
              //     "id": "program_name",
              //     "value": "SMTH"
              //   },
              //   {
              //     "id": "curp",
              //     "value": "U12345678"
              //   },
              //   {
              //     "id": "student_first_name",
              //     "value": "Test",
              //     "read_only": true
              //   },
              //   {
              //     "id": "student_last_name",
              //     "value": "Thor&Hanna",
              //     "read_only": true
              //   },
              //   {
              //     "id": "student_email",
              //     "value": "Thor@test.com",
              //     "read_only": true
              //   },
              //   {
              //     "id": "payment_type",
              //     "value": "Tuition",
              //     "read_only": true
              //   }
              // ]
              "fields": [
                {
                    "id": "graduation_year",
                    "value": "2020",
                    "read_only": true
                },
                {
                    "id": "program_of_study",
                    "value": "SMTH"
                },
                {
                    "id": "student_id",
                    "value": "U12345678"
                },
                {
                    "id": "student_first_name",
                    "value": "Test",
                    "read_only": true
                },
                {
                    "id": "student_last_name",
                    "value": "Thor&Hanna",
                    "read_only": true
                },
                {
                    "id": "relationship",
                    "value": "lover",
                    "read_only": true
                },
                {
                    "id": "student_email",
                    "value": "Thor@test.com",
                    "read_only": true
                },
                {
                    "id": "payment_type",
                    "value": "Tuition",
                    "read_only": true
                }
            ]
            },
            "items": [
              {
                "id": "default",
                "amount": priceAmount,
                "description": "My favourite item"
              }
            ],
            "notifications_url": "https://webhook.site/6ff82c43-94f3-4651-b45d-80c9e02d97de",
          })
        });
        const res = await response.json()
        setFlywireLink(await res)
      }
    }
    postData()
  }, [])
  useEffect(() => {
  }, [flywireLink])

  const onSubmitCurp = (() => {

    axios.post(`https://${businessUnit.toLowerCase() + curpEndPoint}/curp/validate`, {
      curp: curp,
    })
      .then(function (response: any) {
        personalData.name = response?.data?.nombre;
        personalData.last_name = response?.data?.apellidoPaterno;
        personalData.second_last_name = response?.data?.apellidoMaterno;
        personalData.birthdate = response?.data?.fechaNacimiento;
        personalData.gender = response?.data?.sexo;
        if (response.data.errorMessage) {
          setIsValidCurp(false)
          setCurpError(true)
        }
      })
  })

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
    console.log("params", params)
  }

  return (
  <>
    <Head>
      title
    </Head>
   <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <div className="grid grid-cols-2 p-6">
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
          <div className="mobile:col-span-2">
            <div className="border border-surface-300 rounded-lg p-4">
              <h3 className="font-headings font-bold text-5.5 leading-6">Diplomado en Análisis de Datos</h3>
              <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p>
              <hr className="text-surface-300" />
              <div className="flex justify-between mt-2">
                <p className="font-texts">Opción de pago:</p>
                <p className="text-surface-500 font-texts">3 parcialidades</p>
              </div>
              <div className="flex justify-between my-1">
                <p className="font-texts">Parcialidades:</p>
                <p className="text-surface-500 font-texts">$1,523.00 MXN</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-texts">Costo total:</p>
                <p className="text-surface-500 font-texts">$4,569.00 MXN</p>
              </div>
              <hr className="text-surface-300" />
              <div className="flex justify-between mt-2">
                <p className="font-texts font-bold text-base leading-6">Parcialidad a pagar:</p>
                <p className="text-base font-bold">$1,523.00 MXN</p>
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
                    disabled: !isValidCurp
                  }}
                  onClick={() => {
                    onSubmitCurp()
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
                    onSubmitCurp()
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
              <Link href="terminos-y-condiciones" passHref target={"_blank"}>
                <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de Privacidad</p>
              </Link>
            </div>
          </div>
        </div>
        <ContentInsideLayout>
          <h1>checkout</h1>
          <div className="flex w-full">
            <div className="w-full h-full mx-auto text-center align-middle">checkout</div>
            <div className="w-1/2 h-full">
              <iframe width="600px" height="500px" src={flywireLink} title="Flywire form" ></iframe>
            </div>
          </div>
        </ContentInsideLayout>
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
    params: { id=null, program=null },
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