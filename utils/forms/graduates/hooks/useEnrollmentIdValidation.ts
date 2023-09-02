import { useState } from "react";
import type {
  EnrollmentIdValidationRequestData,
  EnrollmentIdValidationResponseData,
} from "@/api/graduates/validateEnrollmentId";

type Status = {
  data?: EnrollmentIdValidationResponseData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const defaultStatus: Status = {
  isLoading: false,
  isSuccess: false,
  isError: false
}

const useEnrollmentIdValidation = () => {

  const [status, setStatus] = useState<Status>({ ...defaultStatus });

  const validateEnrollmentId = async (
    token: string = "",
    enrollmentId: string = ""
  ): Promise<EnrollmentIdValidationResponseData | undefined> => {

    if (!isAllowedEnrollmentIdValue(enrollmentId)) {
      const data: EnrollmentIdValidationResponseData = {
        isValid: false,
      };
      setStatus({ ...status, data, isSuccess: true });
      return data;
    }

    setStatus({ ...defaultStatus, isLoading: true });

    const body: EnrollmentIdValidationRequestData = {
      token,
      data: {
        enrollmentId,
      },
    };

    try {
      const response = await fetch("/api/graduates/validateEnrollmentId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error();

      const data = await response?.json() as EnrollmentIdValidationResponseData;

      setStatus({
        ...status,
        data,
        isLoading: false,
        isSuccess: true,
      });

      return data;

    } catch {
      setStatus({ ...status, isLoading: false, isError: true });
      return;
    }
  };

  return {
    data: status?.data,
    isLoading: status?.isLoading,
    isError: status?.isError,
    validateEnrollmentId,
  };
};

/**
 * "0" and empty strings ("" and "   ") are valid enrollment id values that exist in UANE's database for testing purposes,
 * so we need to consider these as invalid.
 */
const isAllowedEnrollmentIdValue = (value: string) => {
  return !!value?.trim() && value?.trim() !== "0";
}

export default useEnrollmentIdValidation;