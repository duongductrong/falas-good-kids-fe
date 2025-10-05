import Axios, { AxiosResponse } from "axios";
import qs from "qs";
import { z } from "zod";

// const isRefreshToken = false;
// const requestsToRefresh: ((token: string | null) => void)[] = [];

export const apiResponseHandler = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

export const http = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

http.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${getAccessToken()}`
  return config;
});

// http.interceptors.response.use(
//   (response) => {
//     // ...
//     return response;
//   },
//   (error) => {
//     const { response, config } = error;
//     const status = response?.status;

//     // The account not active
//     if (status === 406) {
//       // removeAccessToken()
//       // return (window.location.href = "/login");
//     }

//     // 1. Should refresh token when status response 401
//     // if status is response code 401, we need to send request token here
//     if (status === 401) {
//       // if (!getAccessToken()) {
//       return Promise.reject(error);
//     }

//     // 1.1 refresh token is false, to call refresh token api
//     if (!isRefreshToken) {
//       // @todo update status isRefresh to be true
//       isRefreshToken = true;

//       // 2. Once time to call refresh token api
//       // @todo send request to refresh token here
//       //   refreshToken()
//       //     .then(({ data: { accessToken } }) => {
//       //       setAccessToken(accessToken)

//       //       requestsToRefresh.forEach((callback) => {
//       //         callback(accessToken)
//       //       })

//       //       // 4. Push access_token for callback in step 3
//       //     })
//       //     .catch(() => {
//       //       removeAccessToken()
//       //       requestsToRefresh.forEach((cb) => cb(null))
//       //     })
//       //     .finally(() => {
//       //       // 5. After that, to clear all setup
//       //       isRefreshToken = false
//       //       requestsToRefresh = []
//       //     })
//       // }

//       // 3. Setup callback to change token in headers authorization
//       return new Promise((resolve, reject) => {
//         requestsToRefresh.push((token) => {
//           if (token) {
//             // Reset access_token for another request behind
//             config.headers.Authorization = `Bearer ${token}`;
//             resolve(http(config));
//           }

//           reject(error);
//         });
//       });
//     }
//     return Promise.reject(error);
//   }
// );

export const apiParamsSchema = z.object({});

export const apiResponseSchema = z.object({
  status: z.boolean(),
  statusCode: z.number(),
  path: z.string(),
  data: z.unknown(),
  message: z.string(),
  timestamp: z.string(),
  meta: z.object({
    page: z.number(),
    size: z.number(),
    total: z.number(),
  }),
});

export type ApiResponse<T> = z.infer<typeof apiResponseSchema> & {
  data: T;
};

export type ApiParams = z.infer<typeof apiParamsSchema> & {
  [x: string]: unknown;
};
