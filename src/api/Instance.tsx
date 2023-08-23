import axios from 'axios'
import CheckAuthorization from '@src/components/CheckAuthorization'
// import { checkTokenExpire, postRefereshToken } from './authApi'
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
  async function (config): Promise<any> {
    const atExpire = store.getState().accessToken.expireTime
    const curTime = new Date().getTime()
    // console.log(atExpire, curTime)
    if (atExpire < curTime) {
      console.log(new Date(atExpire) + '/' + new Date(curTime))
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      return console.log('at시간 만료로 스토리지 리셋')
    }

    const state = await CheckAuthorization(config)
    if (state === 'Failed') {
      // return window.location.replace('/login')
      return console.log('CheckAuthorization === Failed.')
    }
    return state

    // if (config) {
    // const refresh_token = getCookieToken()
    // const access_token = localStorage.getItem('accessToken')

    // if (!access_token || !refresh_token) {
    //   // return 'Failed'
    //   console.log(access_token)
    //   console.log(refresh_token)
    //   console.log('노 액세스토큰')
    //   console.log(new Date(atExpire), '/', new Date(curTime))
    //   return
    // }
    // const status = await checkTokenExpire()

    // if (status === 200 && config) {
    //   config.headers['Authorization'] = `Bearer ${access_token}`
    //   console.log('액세스토큰 예스')
    //   console.log(new Date(atExpire), '/', new Date(curTime))
    //   return config
    // } else {
    //   if (refresh_token) {
    //     const { code, tokens }: any = await postRefereshToken()
    //     if (code === 200 && config) {
    //       removeCookieToken()
    //       dispatch(SET_TOKEN(tokens.accessToken))
    //       setRefreshToken(tokens.refreshToken)
    //       config.headers['Authorization'] = `Bearer ${access_token}`
    //       console.log('액세스토큰 만료, 리프레시토큰으로 액세스토큰 재발급 성공')
    //       return config
    //     } else {
    //       removeCookieToken()
    //       dispatch(DELETE_TOKEN())
    //       alert('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
    //       console.log('토큰 예스, 벗 액세스토큰 재발급 실패')
    //       // return 'Failed'
    //       return
    //     }
    //   } else {
    //     removeCookieToken()
    //     dispatch(DELETE_TOKEN())
    //     // return 'Failed'
    //     console.log('리프레시토큰 없어서 강제 로그아웃')
    //     return
    //   }
    // }
    // }
  },
  function (error) {
    return Promise.reject(error)
  }
)
