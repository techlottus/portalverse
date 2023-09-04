import { useState } from "react";
import type { TokenResponseData } from "@/api/graduates/getToken";

type Status = {
  data?: TokenResponseData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const defaultStatus: Status = {
  data: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false
}

const useToken = () => {

  const [status, setStatus] = useState<Status>({ ...defaultStatus });

  const getTokenData = async (): Promise<TokenResponseData | undefined> => {
    setStatus({ ...defaultStatus, isLoading: true });

    try {
      const response = await fetch("/api/graduates/getToken");

      if (!response.ok) throw new Error();

      const data = await response?.json() as TokenResponseData;
      const token = data?.token;

      if(!token) throw new Error();

      setStatus({ ...status, data, isLoading: false, isSuccess: true });
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
    getTokenData,
  };
};

export default useToken;