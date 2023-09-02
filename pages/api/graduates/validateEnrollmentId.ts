import { FormValues } from "@/utils/forms/graduates/schema";
import type { NextApiRequest, NextApiResponse } from "next";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
const endpoint = process.env.NEXT_PUBLIC_GRADUATES_FORM_ENROLLMENT_VALIDATION_ENDPOINT!;

export type EnrollmentIdValidationRequestData = {
  token: string;
  data: Pick<FormValues, "enrollmentId">
}

export type EnrollmentIdValidationResponseData = {
  isValid: boolean;
}

// Currently, body/request variables are the same for both UANE & UTEG
type RequestVariables = {
  matricula: string;
}

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
      const { token, data: { enrollmentId } } = req.body as EnrollmentIdValidationRequestData;

      const body: RequestVariables = { matricula: enrollmentId };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const isValidEnrollmentId = await validateEnrollmentIdResponse(response);

      const responseData: EnrollmentIdValidationResponseData = {
        isValid: isValidEnrollmentId
      }

      res.status(200).json(responseData);

    } catch {
      res.status(500).json({ error: "Error validating enrollment" });
    }
  }
}

const validateEnrollmentIdResponse = async (response: Response) => {
  const data = await response?.json();

  switch (businessUnit) {
    case "UANE": {
      const result = data?.[0]?.mensaje?.resultado as string;
      const isValid = result === "true";
      return isValid;
    }
    case "UTEG": {
      const result = data?.[0]?.response as string;
      const isValid = result === "true";
      return isValid;
    }
    default:
      return false;
  }
};
