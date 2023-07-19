import { getCookieToken, removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import axios from 'axios'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'
import { checkTokenExpire, postRefereshToken } from './authApi'
import store from '@src/store/config'

const BASE_URL = import.meta.env.VITE_BASE_URL
const { dispatch } = store

// 전역에 쿠키 전송 허용 설정
axios.defaults.withCredentials = true

// 토큰이 필요 없는 api 요청을 보내는 axios 인스턴스
export const publicApi = axios.create({
  baseURL: BASE_URL,
})

// 토큰이 필요한 api 요청을 보내는 axios 인스턴스
export const privateApi = axios.create({
  baseURL: BASE_URL,
})

// 토큰이 필요한 api 요청의 request 인터셉터
privateApi.interceptors.request.use(
  async function (config): Promise<any> {
    // const access_token = store.getState().accessToken.accessToken
    const refresh_token = getCookieToken()

    const { status }: any = await checkTokenExpire()
    // console.log('checkTokenExpire :', status)

    // const atExpire = store.getState().accessToken.expireTime
    // const curExpire = new Date().getTime()
    // console.log(atExpire, curExpire)

    // if (atExpire > curExpire) {
    if (status === 200) {
      // console.log('at검사 응답 200일때')
      config.headers['Authorization'] = `Bearer ${store.getState().accessToken.accessToken}`
      return config
    } else {
      // console.log('at검사 응답 400 or 401 일때')
      if (refresh_token) {
        // console.log('rt로 재발급 시도')
        // console.log('액세스 토큰:', access_token)
        // console.log('리프레시 토큰:', refresh_token)

        const { code, tokens }: any = await postRefereshToken()
        if (code === 200) {
          removeCookieToken()
          dispatch(SET_TOKEN(tokens.accessToken))
          setRefreshToken(tokens.refreshToken)
          config.headers['Authorization'] = `Bearer ${store.getState().accessToken.accessToken}`
          // console.log('rt 재발급 완료')
          return config
        } else {
          removeCookieToken()
          dispatch(DELETE_TOKEN())
          // console.log('만료된 토큰으로 재발급 실패, 로그아웃')
          return
        }
      } else {
        // console.log('rt 없어서 브라우저에서 강제 로그아웃')
        removeCookieToken()
        dispatch(DELETE_TOKEN())
        alert('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
        return
      }
    }
    // return config
  },
  function (error) {
    // console.log(error)
    return Promise.reject(error)
  }
)

// 토큰이 필요한 api 요청의 response 인터셉터
// privateApi.interceptors.response.use(
//   function (response) {
//     //console.log('response 인터셉터 작동')
//     return response
//   },
//   async function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     //return Promise.reject(error)
//     const {
//       config,
//       response: { status },
//     } = error
//     if (status === 401) {
//       if (error.response.data.message === 'UNAUTHORIZED(401)') {
//         const originRequest = config
//         const response = await postRefereshToken()
//         if (response.status === 200) {
//           const newAccessToken = response.data.data.accessToken
//           dispatch(SET_TOKEN(newAccessToken))
//           privateApi.defaults.headers.common.authorization = `Bearer ${newAccessToken}`
//           // 진행중이던 요청 이어서
//           originRequest.headers.authorization = `Bearer ${newAccessToken}`
//           return axios(originRequest)
//           // rt도 만료 됐을때
//         } else if (response.status === 404) {
//           dispatch(DELETE_TOKEN())
//           removeCookieToken()
//           console.log('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
//         }
//       }
//     }
//   }
// )
