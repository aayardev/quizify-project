declare namespace API {
  type TUser = {
    id: number;
    last_name: string;
    first_name: string;
    full_name: string;
    username: string;
    email: string;
    profile_image: string;
  };

  type TCredentials = Record<"email" | "password", string>;

  type TRegisterData = {
    last_name: string;
    first_name: string;
    email: string;
    password1: string;
    password2: string;
  };

  type TLoginReturnedData = {
    access: string;
    refresh: string;

    access_expiration: string;
    refresh_expiration: string;

    user: TUser;
    id: string;
  };

  type TRefreshTokenData = Record<"refresh", string>;
  type TRefreshTokenRerurnedData = Record<"access", string>;
  type TResendVerificationEmailData = Record<"email", string>;
  type TVerifyEmailData = Record<"key", string>;
  type TResetPasswordData = TResendVerificationEmailData;

  type TResetPasswordReturnedData = {
    detail: string;
  };

  type TConfirmPasswordData = Record<"new_password1" | "new_password2", string>;

  type SocialLoginData = Record<"access_token" | "code" | "id_token", string>;

  type TUpdateUserProfileData = {
    last_name?: string;
    first_name?: string;
    profile_image?: File;
  };

  type TChangePasswordData = Record<
    "new_password1" | "new_password2" | "old_password",
    string
  >;
}
