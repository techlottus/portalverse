import { FormValues } from "@/utils/forms/graduates/schema";
import type { NextApiRequest, NextApiResponse } from "next";

const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API!;
const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method,body } = req;

  if (method === "POST") {
    try {
      const response = await fetch(`${flywireAPI}/checkout/sessions`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTHENTICATION-Key": flywireAPIKEY,
        },
        body
      });

      const responseData = await response.json();

      res.status(200).json(responseData["hosted_form"].url);

    } catch(err:any) {
      res.status(err.response.status).json(err.response.data);
    }

  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}