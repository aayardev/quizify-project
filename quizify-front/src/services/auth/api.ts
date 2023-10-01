import httpClient from "@/lib/http-client";
import { type AxiosRequestConfig } from "axios";
import { OAuthProviderType } from "next-auth/providers/oauth-types";

export const login = (data: API.TCredentials, config?: AxiosRequestConfig) => {
  return httpClient.post<API.TLoginReturnedData>("auth/login/", data, config);
};

export const register = (
  data: API.TRegisterData,
  config?: AxiosRequestConfig
) => {
  return httpClient.post("auth/registration/", data, config);
};

export const getCurrentUserDetail = (config?: AxiosRequestConfig) => {
  return httpClient.get<API.TUser>("auth/user/", config);
};

export const updateUserProfile = (
  data: FormData,
  config?: AxiosRequestConfig
) => {
  return httpClient.patch<API.TUser>("auth/user/", data, config);
};

export const refreshToken = (data: API.TRefreshTokenData) => {
  return httpClient.post<API.TRefreshTokenRerurnedData>(
    "auth/token/refrehhsh/",
    data
  );
};

export const resendVerificationEmail = (
  data: API.TResendVerificationEmailData
) => {
  return httpClient.post("auth/registration/resend-email/", data);
};

export const verifyEmail = (data: API.TVerifyEmailData) => {
  return httpClient.post("auth/registration/verify-email/", data);
};

export const resetPassword = (data: API.TResetPasswordData) => {
  return httpClient.post<API.TResetPasswordReturnedData>(
    "auth/password/reset/",
    data
  );
};

export const confirmPassword = (data: API.TUpdateUserProfileData) => {
  return httpClient.post("auth/password/reset/confirm/", data);
};

export const changePassword = (
  data: API.TChangePasswordData,
  config?: AxiosRequestConfig
) => {
  return httpClient.post("auth/password/change/", data, config);
};

export const socialLogin = (
  provider: OAuthProviderType,
  data: API.TUpdateUserProfileData
) => {
  return httpClient.post(`auth/${provider}`, data);
};
