import axios from 'axios'
const BASE_URL = import.meta.env.BASE_URL

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosApi = (url: string, options?: any) => {
  const instance = axios.create({ baseURL: url, ...options })
  return instance
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosAuthApi = (url: string, options?: any) => {
  const token = '토큰 값'
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: 'Bearer ' + token },
    ...options,
  })
  return instance
}
export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)
