/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { removeCookieToken } from '@src/storage/Cookie'
import store from '@src/store/config'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import CheckAuthorization from '@src/components/CheckAuthorization'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { useDispatch } from 'react-redux'
import useModal from './useModal'
import PATH from '@src/constants/pathConst'

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

export const Interceptor = ({ children }: any) => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  useEffect(() => {
    privateApi.interceptors.request.use(
      async function (config): Promise<InternalAxiosRequestConfig | any> {
        const atExpire = store.getState().accessToken.expireTime
        const curTime = new Date().getTime()
        console.log(new Date(atExpire) + '/' + new Date(curTime), '만료 시간')
        if (atExpire < curTime) {
          removeCookieToken()
          dispatch(DELETE_TOKEN())
          dispatch(DELETE_INFO())
          openModal({
            isModalOpen: true,
            isConfirm: false,
            content: ['자동 로그아웃 되었습니다. 다시 로그인 해주세요.'],
            navigateOption: PATH.LOGIN,
          })
          return Promise.resolve()
        }

        const newConfig = await CheckAuthorization(config)
        console.log('newConfig: ', newConfig)
        if (newConfig === 'NoToken') {
          openModal({
            isModalOpen: true,
            isConfirm: false,
            content: ['토큰이 존재하지 않습니다. 로그인 페이지로 이동합니다.'],
            navigateOption: PATH.LOGIN,
          })
          return Promise.resolve()
        } else if (newConfig === 'ExpiredToken') {
          openModal({
            isModalOpen: true,
            isConfirm: false,
            content: ['토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.'],
            navigateOption: PATH.LOGIN,
          })
          return Promise.resolve()
        } else {
          return newConfig
        }
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }, [])
  return children
}

export default Interceptor
