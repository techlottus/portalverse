
import { useState } from "react";
import type { FormValues } from "@/utils/forms/graduates/schema";
import type { GraduateRegistrationRequestData, GraduateRegistrationResponseData } from "@/api/graduates/register";

type Status = {
  data?: GraduateRegistrationResponseData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const defaultStatus: Status = {
  isLoading: false,
  isSuccess: false,
  isError: false
}

const useGraduateRegistration = () => {
  const [status, setStatus] = useState<Status>({ ...defaultStatus });

  const sendGraduateRegistrationData = async (
    token: string = "",
    data: FormValues
  ): Promise<GraduateRegistrationResponseData | undefined> => {

    setStatus({ ...status, isLoading: true });

    const body: GraduateRegistrationRequestData = {
      token,
      data
    }

    try {
      const response = await fetch("/api/graduates/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error();

      const data = await response?.json() as GraduateRegistrationResponseData;
      const isSuccessfulResponse = !!data?.isSuccessful;

      if (!isSuccessfulResponse) throw new Error();
      
      setStatus({...status, data, isLoading: false, isSuccess: true});
      return data;

    } catch {
      setStatus({ ...status, isLoading: false, isError: true });
      return;
    }
  };

  return { isLoading: status?.isLoading, isError: status?.isError, sendGraduateRegistrationData };
};

export default useGraduateRegistration;