import axios from "axios";
import { getSession } from "next-auth/react";
import { getServerAuthSession } from "./next-auth";
import { refreshToken } from "@/services";

const isServer = typeof window === "undefined";

// Need this for docker
// const host = isServer ? "backend" : "127.0.0.1";
const host = "127.0.0.1";

const httpClient = axios.create({
  baseURL: `http://${host}:8000/api/v1/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  const session = isServer ? await getServerAuthSession() : await getSession();

  console.log(session?.access, "session");
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
