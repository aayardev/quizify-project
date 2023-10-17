import { AxiosRequestConfig, AxiosResponse } from "axios";
import useHttpClient from "./use-http-client";

type TServices = {
  updateProfile: (
    data: FormData,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<API.TUser>>;
};

export const useService = (service: string) => {
  const client = useHttpClient();

  const services: TServices = {
    updateProfile: (data: FormData, config?: AxiosRequestConfig) => {
      return client.patch<API.TUser>("auth/user/", data, config);
    },
  };

  return services[service as keyof TServices];
};
