import type { NextApiRequest, NextApiResponse } from "next";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
const endpoint = process.env.NEXT_PUBLIC_GRADUATES_FORM_TOKEN_ENDPOINT!;
const username = process.env.NEXT_PUBLIC_GRADUATES_FORM_USERNAME!;
const password = process.env.NEXT_PUBLIC_GRADUATES_FORM_PASSWORD!;

export type TokenResponseData = {
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = await getToken();

    if (!token) throw new Error();

    const responseData: TokenResponseData = { token };

    res.status(200).json(responseData);
  } catch {
    res.status(500).json({ error: "No token" });
  }
}

const getToken = () => {
  switch(businessUnit) {
    case "UANE": return getUANEToken();
    case "UTEG": return getUTEGToken();
    default: return null;
  }
}

const getUANEToken = async () => {
  console.log("inside getUANEToken");
  console.log("endpoint", endpoint);
  console.log("username", username);
  console.log("password", password);
  try {
    const response = await fetch(`${endpoint}?Usuario=${username}&Contrasena=${password}`);
    console.log("response:", response);
    const data = await response?.json();
    console.log("data:", data);
    const token = data?.[0]?.token as string;

    if (!token) throw new Error();
    return token;
  } catch {
    return null;
  }
}

const getUTEGToken = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        user: username,
        password: password,
      }),
    });

    const data = await response?.json();
    const token = data?.token as string;

    if (!token) throw new Error();
    return token;
  } catch {
    return null;
  }
};