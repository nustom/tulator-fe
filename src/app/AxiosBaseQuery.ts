import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosRequestConfig } from "axios"

type ArgsBaseQueryFn = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}
type BaseQueryOptions = {
  baseUrl: string
}
export const AxiosBaseQuery = ({ baseUrl }: BaseQueryOptions = { baseUrl: "" }): BaseQueryFn<ArgsBaseQueryFn> =>
  async ({ url, method, data, params }: ArgsBaseQueryFn) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }