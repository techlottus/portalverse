import Head from "next/head"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useMemo, useState } from "react"

const CheckoutPage: NextPageWithLayout = () => {

  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState()
  useEffect(() => {
    const postData = async () => {
      if (flywireAPI && flywireAPIKEY) {
        const response = await fetch(`${flywireAPI}/checkout/sessions`, {
          method: 'POST',
          headers: {
            'X-AUTHENTICATION-Key':flywireAPIKEY,

          },
          body: JSON.stringify(
            {
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
              "recipient_id": "GDZ",
              "payor_id": "payor_test_thor"
            })// body data type must match "Content-Type" header
        });
        console.log("response", response)
        const res = await response.json()
        console.log("await res", await res)
        setFlywireLink(await res)
      }
    }
    postData()
  }, [])
  useEffect(() => {
    console.log('flywireLink: ', flywireLink)
  }, [flywireLink])


  return <>
    <Head>
      title
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <ContentInsideLayout>
          <div className="w-full h-full mx-auto text-center align-middle">checkout</div>
          <div></div>
        </ContentInsideLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}


export default CheckoutPage