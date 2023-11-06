import { login, socialLogin } from "@/services/auth/api";
import axios, { isAxiosError } from "axios";
import moment from "moment";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    id: number;
    last_name: string;
    first_name: string;
    username: string;
    full_name: string;
    email: string;
    profile_image_url: string;
    access: string;
    refresh: string;
    access_expiration: string;
    refresh_expiration: string;
  }
  interface Session extends DefaultSession {
    user: API.TUser;
    access: string;
    refresh: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: API.TUser;
    access: string;
    refresh: string;
    access_expiration: string;
    refresh_expiration: string;
    error?: string;
  }
}

async function refreshToken(token: JWT): Promise<JWT> {
  let newToken = {};
  console.log("Refreshing access token...");
  try {
    const response = await axios.post<API.TRefreshTokenRerurnedData>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/token/refresh/`,
      {
        refresh: token.refresh,
      }
    );
    newToken = { ...token, ...response.data };
  } catch (error) {
    if (isAxiosError(error))
      console.log(error.response?.data.detail, "error refreshing token");
    newToken = { ...token, error: "RefreshError" };
  }

  return newToken as JWT;
}

const isTokenExpired = (token: { access_expiration: string }) => {
  return moment().utc() > moment(token.access_expiration).utc();
};

// TODO: Fix sign out logic
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      if (user && account?.type === "credentials") {
        token.access = user.access;
        token.refresh = user.refresh;
        token.refresh_expiration = user.refresh_expiration;
        token.access_expiration = user.access_expiration;

        token.user = {
          ...user,
        } as API.TUser;
      }

      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }

      // Social Login
      if (account?.type === "oauth") {
        const { access_token, id_token } = account;
        try {
          const { data } = await socialLogin(account.provider, {
            access_token: access_token as string,
            id_token: id_token as string,
          });
          token = { ...data, ...data.user };
        } catch (e) {
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 400) {
              const nonFieldErr = e.response.data["non_field_errors"] as
                | string
                | undefined;

              if (nonFieldErr && nonFieldErr[0]) {
                if (
                  nonFieldErr[0] ===
                  "User is already registered with this e-mail address."
                ) {
                  console.log(nonFieldErr, "nonFieldErr");
                }
              }
            }
          }
          token = { ...token, error: "OauthError" };
        }

        return token as JWT;
      }

      if (isTokenExpired(token)) {
        console.log("access token expired...");
        token = await refreshToken(token);
      }

      return token;
    },

    // @ts-ignore
    session: async ({ session, token }) => {
      if (!token.error) {
        session.access = token.access;
        session.expires = token.refresh_expiration;
        session.user = token.user;
        return session;
      }
      return null;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await login(credentials!);
          return { ...response.data, ...response.data.user };
        } catch (error: any) {
          throw new Error(JSON.stringify(error.response.data));
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};

export const getServerToken = async () => {
  const session = await getServerAuthSession();
  return session?.access;
};
