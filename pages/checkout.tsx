import Head from "next/head"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useMemo, useState } from "react"
import { InscriptionForm } from "@/forms/container/InscriptionForm"
import Link from "next/link"
import Button from "@/old-components/Button/Button"
import { useForm } from "react-hook-form"

const axios = require('axios');
const curpEndPoint = process.env.NEXT_PUBLIC_CURP_ID_END_POINT!;
const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const CheckoutPage: NextPageWithLayout = () => {

  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  
  const [flywireLink, setFlywireLink] = useState()
  const [residence, setResidence] = useState<boolean>()
  const [noResidence, setNoResidence] = useState<boolean>()
  const [hasCurp, setHasCurp] = useState<boolean>()
  const [noCurp, setNoCurp] = useState<boolean>()
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<boolean>();

  useEffect(() => {
    const postData = async () => {
      if (flywireAPI && flywireAPIKEY) {
        const response = await fetch("/api/generateFwLink", {
          method: 'POST',
          body: JSON.stringify({
            "type": "one_off",
            "charge_intent": {
              "mode": "one_off"
            },
            "payor": {
              "first_name": "SANDBOX_TO_DELIVERED_STATUS",
              "last_name": "Thor",
              "address": "Allen Street",
              "city": "Valencia",
              "country": "ES",
              "state": "VA",
              "email": "test@Thor.com",
              "zip": "10002",
              "phone": "+341123456789"
            },
            "options": {
              "form": {
                "action_button": "pay",
                "locale": "en"
              }
            },
            "recipient": {
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
                "amount": 350000,
                "description": "My favourite item"
              }
            ],
            "notifications_url": "https://webhook.site/6ff82c43-94f3-4651-b45d-80c9e02d97de",
            "external_reference": "Test payment Thor",
            "recipient_id": "KWR",
            "payor_id": "payor_test_thor"
          }
          )
        });
        const res = await response.json()
        setFlywireLink(await res)
      }
    }
    postData()
  }, [])
  useEffect(() => {
    console.log('flywireLink: ', flywireLink)
  }, [flywireLink])

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({

  });

  const onSubmit = handleSubmit(() => {

    axios.post(`https://${businessUnit.toLowerCase() + curpEndPoint}/curp/validate`, {
      curp: curp,
    })
      .then(function (response: any) {
        /* personalData.name = response?.data?.nombre; */
        /* personalData.last_name = response?.data?.apellidoPaterno; */
        /* personalData.second_last_name = response?.data?.apellidoMaterno; */
        /* personalData.birthdate = response?.data?.fechaNacimiento; */
        /* personalData.gender = response?.data?.sexo;    */
      })
      .catch(function (error: any) {
      });
    /* Validate() */
  })

  return <>
    <Head>
      title
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <div className="grid grid-cols-2 p-6">
          <InscriptionForm />
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
                    disabled: false
                  }}
                  onClick={() => {
                    onSubmit()
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
                    onSubmit()
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
          <div className="flex w-full">
            <div className="w-1/2 h-full mx-auto text-center align-middle">checkout</div>
            <div className="w-1/2 h-full">
              <iframe width="600px" height="500px" src={flywireLink} title="Flywire form"></iframe></div>
          </div>
        </ContentInsideLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}




export default CheckoutPage