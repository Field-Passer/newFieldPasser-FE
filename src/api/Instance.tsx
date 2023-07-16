import { getCookieToken, removeCookieToken } from '@src/storage/Cookie'
import axios from 'axios'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'
import store from '@src/store/config'

const BASE_URL = import.meta.env.VITE_BASE_URL
const access_token = store.getState().accessToken.accessToken
const { dispatch } = store

// 토큰이 필요 없는 api 요청을 보내는 axios 인스턴스
export const publicApi = axios.create({
  baseURL: BASE_URL,
  //timeout: 10000,
})

// 토큰이 필요한 api 요청을 보내는 axios 인스턴스
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${access_token}`,
  },
  //timeout: 10000,
})

// 토큰이 필요한 api 요청의 request 인터셉터
privateApi.interceptors.request.use(
  function (config) {
    const access_token = store.getState().accessToken.accessToken
    if (access_token) {
      config.headers['authorization'] = `Bearer ${access_token}`
      //console.log('request 인터셉터 작동')
    }
    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

// 토큰이 필요한 api 요청의 response 인터셉터
privateApi.interceptors.response.use(
  function (response) {
    //console.log('response 인터셉터 작동')
    return response
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    //return Promise.reject(error)
    const {
      config,
      response: { status },
    } = error
    if (status === 401) {
      if (error.response.data.message === 'UNAUTHORIZED(401)') {
        const originRequest = config
        const response = await postRefereshToken()
        if (response.status === 200) {
          const newAccessToken = response.data.data.accessToken
          dispatch(SET_TOKEN(newAccessToken))
          privateApi.defaults.headers.common.authorization = `Bearer ${newAccessToken}`
          // 진행중이던 요청 이어서
          originRequest.headers.authorization = `Bearer ${newAccessToken}`
          return axios(originRequest)
          // rt도 만료 됐을때
        } else if (response.status === 404) {
          dispatch(DELETE_TOKEN())
          removeCookieToken()
          console.log('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
        }
      }
    }
  }
)

// refreshToken 재발급 api
async function postRefereshToken() {
  const response = await publicApi.post('auth/reissue', {
    refreshToken: getCookieToken(),
  })
  return response
}
