import type { NextApiRequest, NextApiResponse } from "next";
import type { FormValues } from "@/utils/forms/graduates/schema";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
const endpoint = process.env.NEXT_PUBLIC_GRADUATES_FORM_REGISTRATION_ENDPOINT!;

export type GraduateRegistrationRequestData = {
  token: string;
  data: FormValues;
}

export type GraduateRegistrationResponseData = {
  isSuccessful: boolean;
}

type GraduateRegistrationVariables =
  | UANEGraduateRegistrationVariables
  | UTEGGraduateRegistrationVariables;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } else {
    try {
      const { token, data } = req.body as GraduateRegistrationRequestData;

      const body = formatRequestVariables(data);

      if (!body) throw new Error();

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const isSuccessfulRegistration = await validateRegistrationResponse(response);

      const responseData: GraduateRegistrationResponseData = {
        isSuccessful: isSuccessfulRegistration,
      };

      if (!isSuccessfulRegistration) throw new Error();

      res.status(200).json(responseData);

      return responseData;

    } catch {
      res.status(500).json({ error: "Error registering graduate", isSuccessful: false });
      return;
    }
  }
}

const validateRegistrationResponse = async (response: Response) => {
  const data = await response?.json();

  switch (businessUnit) {
    case "UANE": {
      /**
       * On successful registration, we receive the graduate data back
       */
      const isSuccessful = !!data?.[0]?.egresado?.matricula;
      return isSuccessful;
    }
    case "UTEG": {
      /**
       * On successful registration, we receive the graduate data back
       */
      const isSuccessful = !!data?.[0]?.response?.matricula;
      return isSuccessful;
    }
    default: {
      return false;
    }
  }
};

type UANEGraduateRegistrationVariables = {
  matricula: string;
  correo?: string;
  telefonocelular?: string;
  labora?: boolean;
  empresa?: string;
};

type UTEGGraduateRegistrationVariables = {
  matricula: string;
  email?: string;
  telefonocelular?: string;
  labora?: string;
  empresa?: string;
};

const isValueDefined = (value: any) => {
  return typeof value === "string"
    ? !!value?.trim()
    : typeof value !== "undefined" && value !== null;
};

const formatRequestVariables = (
  data: GraduateRegistrationRequestData["data"]
): GraduateRegistrationVariables | null => {

  if (!data) return null;

  const { enrollmentId, email, phone, isWorking, company } = data;

  /**
   * Although there are other, more elegant ways to conditionally add properties to an object, using an
   * if statement like this allows us to preserve type checking.
   */

  switch (businessUnit) {
    case "UANE": {
      const variables: UANEGraduateRegistrationVariables = {
        matricula: enrollmentId,
      };

      if (isValueDefined(email)) variables.correo = email;
      if (isValueDefined(phone)) variables.telefonocelular = phone;
      if (isValueDefined(isWorking)) variables.labora = isWorking;
      if (isValueDefined(company)) variables.empresa = company;

      return variables;
    }
    case "UTEG": {
      const variables: UTEGGraduateRegistrationVariables = {
        matricula: enrollmentId,
      };

      if (isValueDefined(email)) variables.email = email;
      if (isValueDefined(phone)) variables.telefonocelular = phone;
      if (isValueDefined(isWorking)) variables.labora = isWorking ? "si" : "no";
      if (isValueDefined(company)) variables.empresa = company;

      return variables;
    }
    default:
      return null;
  }
};