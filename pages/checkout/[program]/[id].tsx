import Head from "next/head"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useEffect, useMemo, useState } from "react"
import getProgramById, { ProgramData } from "@/utils/getProgramById"
type PageProps = {
  program?: ProgramData;
  price: any;
};
const CheckoutPage: NextPageWithLayout<PageProps> = (props:PageProps) => {
  const {program,price} =props;
  const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API
  const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY
  const [flywireLink, setFlywireLink] = useState()
  const priceAmount = price[0].price *10000;
  console.log("program: ", program)
  console.log("price: ", priceAmount)

  useEffect(() => {
    const postData = async () => {
      if (flywireAPI && flywireAPIKEY) {
        const response = await fetch("/api/generateFwLink", {
          method: 'POST',
          body: JSON.stringify({...price[0].config,
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


  return <>
    <Head>
      title
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
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

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: "checkout",
          program: '',
          id: ""
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
}
export async function getStaticProps(context: any): Promise<{ props: PageProps }> {
  const {
    params: { id, program },
  } = context;
  const programData = await getProgramById(program);
  const price = programData.attributes.price_list.price.filter((price:any) => price.id === id)
  return {
    props: {
      program: programData,
      price
    },
  };
}

export default CheckoutPage