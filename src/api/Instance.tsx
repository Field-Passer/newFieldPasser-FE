import axios from 'axios'
import CheckAuthorization from '@src/components/CheckAuthorization'

const BASE_URL = import.meta.env.VITE_BASE_URL

// 전역에 쿠키 전송 허용 설정
axios.defaults.withCredentials = true

// 토큰이 필요 없는 api 요청을 보내는 axios 인스턴스
export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// 토큰이 필요한 api 요청을 보내는 axios 인스턴스
export const privateApi = axios.create({
  baseURL: BASE_URL,
})

// 토큰이 필요한 api 요청의 request 인터셉터
privateApi.interceptors.request.use(
  async function (config): Promise<any> {
    const state = await CheckAuthorization(config)
    if (state === 'Failed') {
      return window.location.replace('/login')
    }
    return state
  },
  function (error) {
    return Promise.reject(error)
  }
)
