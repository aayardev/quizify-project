import axios from "axios";
import { getSession } from "next-auth/react";
import { getServerAuthSession } from "./next-auth";
import { isTokenExpired } from "./utils";

const isServer = typeof window === "undefined";

// Need this for docker
// const host = isServer ? "backend" : "127.0.0.1";
// const host = "127.0.0.1";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  if (isServer) return config;
  const session = await getSession();
  const access = session?.access;
  if (!config.headers["Authorization"] && access) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  return config;
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const session = isServer
//       ? await getServerAuthSession()
//       : await getSession();

//     console.log("httpClient.interceptors.response");

//     const refresh = session?.refresh;
//     const prevRequest = error?.config;

//     console.log(
//       session,
//       error?.response?.status,
//       !prevRequest?.sent,
//       refresh,
//       error?.response?.status === 401 && !prevRequest?.sent && refresh,
//       "error?.response?.status === 401 && !prevRequest?.sent && refresh"
//     );

//     if (error?.response?.status === 401 && !prevRequest?.sent && refresh) {
//       prevRequest.sent = true;
//       const res = await refreshToken({
//         refresh,
//       });
//       prevRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
//       return httpClient(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default httpClient;
