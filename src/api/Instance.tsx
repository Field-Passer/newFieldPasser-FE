import axios, { InternalAxiosRequestConfig } from 'axios'
import CheckAuthorization from '@src/components/CheckAuthorization'
import { removeCookieToken } from '@src/storage/Cookie'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import store from '@src/store/config'
import { DELETE_INFO } from '@src/store/slices/infoSlice'

const { dispatch } = store
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
  async function (config): Promise<InternalAxiosRequestConfig> {
    const atExpire = store.getState().accessToken.expireTime
    const curTime = new Date().getTime()

    if (atExpire < curTime) {
      console.log(new Date(atExpire) + '/' + new Date(curTime))
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      window.location.replace('/login')
      console.log('at시간 만료로 스토리지 리셋')
      return Promise.resolve()
    }

    const newConfig = await CheckAuthorization(config)
    if (newConfig === 'Failed') {
      window.location.replace('/login')
      console.log('CheckAuthorization === Failed.')
      return Promise.resolve()
    }
    return newConfig
  },
  function (error) {
    return Promise.reject(error)
  }
)
