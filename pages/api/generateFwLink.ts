import { FormValues } from "@/utils/forms/graduates/schema";
import type { NextApiRequest, NextApiResponse } from "next";

// const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
// const endpoint = process.env.NEXT_PUBLIC_GRADUATES_FORM_ENROLLMENT_VALIDATION_ENDPOINT!;
const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API!;
const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY!;

// export type EnrollmentIdValidationRequestData = {
//   token: string;
//   data: Pick<FormValues, "enrollmentId">
// }

// export type EnrollmentIdValidationResponseData = {
//   isValid: boolean;
// }

// // Currently, body/request variables are the same for both UANE & UTEG
// type RequestVariables = {
//   matricula: string;
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    console.log("entro en post")
    try {
      // const { data: { enrollmentId } } = req.body;

      const body = {
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

      const response = await fetch(`${flywireAPI}/checkout/sessions`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTHENTICATION-Key": flywireAPIKEY,
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      res.status(200).json(responseData["hosted_form"].url);

    } catch(err:any) {
      res.status(err.response.status).json(err.response.data);
      console.log("catch")
    }

  } else {
    res.status(405).end(`Method ${method} Not Allowed no es post:p`);
  }
}

// const validateEnrollmentIdResponse = async (response: Response) => {
//   const data = await response?.json();

//   switch (businessUnit) {
//     case "UANE": {
//       const result = data?.[0]?.mensaje?.resultado as string;
//       const isValid = result === "true";
//       return isValid;
//     }
//     case "UTEG": {
//       const result = data?.[0]?.response as string;
//       const isValid = result === "true";
//       return isValid;
//     }
//     default:
//       return false;
//   }
// };
