// import { createHmac } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const flywireAPI = process.env.NEXT_PUBLIC_FLYWIRE_API!;
const flywireAPIKEY = process.env.NEXT_PUBLIC_FLYWIRE_API_KEY!;

export default async function handler(
  req: NextApiRequest ,
  res: NextApiResponse
) {
  const { method, body } = req;
  const link = JSON.parse(body).url;

  if (method === "POST") {

    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTHENTICATION-Key": flywireAPIKEY,
          // "X-Flywire-Digest":createHmac('sha256', process.env.NEXT_PUBLIC_FLYWIRE_SHARED_SECRET!).update(body).digest('base64')
        },
      });

      const responseData = await response.json();
      if (responseData && (responseData.errors || responseData.status === '401')) {
        
        res.status(responseData?.status || 500).json(responseData.errors || responseData.detail);
      } else {
        res.status(200).json(responseData);
      }
    } catch (err: any) {
       console.log('err: ', err);
      
      res.status(err.response?.status || 500).json(err.response?.data);
    }

  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}