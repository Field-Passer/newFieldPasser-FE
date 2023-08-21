import { checkTokenExpire, postRefereshToken } from '@src/api/authApi'
import { getCookieToken, removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import store from '@src/store/config'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'

const { dispatch } = store

interface AxiosInterceptorConfigType {
  headers: { [x: string]: string }
}

const CheckAuthorization = async (config: AxiosInterceptorConfigType) => {
  if (config) {
    const refresh_token = getCookieToken()
    const access_token = localStorage.getItem('accessToken')

    if (!access_token) {
    }
    const status = await checkTokenExpire()

    if (status === 200 && config) {
      config.headers['Authorization'] = `Bearer ${access_token}`
      return config
    } else {
      if (refresh_token) {
        const { code, tokens }: any = await postRefereshToken()
        if (code === 200 && config) {
          removeCookieToken()
          dispatch(SET_TOKEN(tokens.accessToken))
          setRefreshToken(tokens.refreshToken)
          config.headers['Authorization'] = `Bearer ${access_token}`
          return config
        } else {
          removeCookieToken()
          dispatch(DELETE_TOKEN())
          alert('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
          return 'Failed'
        }
      } else {
        removeCookieToken()
        dispatch(DELETE_TOKEN())
        return 'Failed'
      }
    }
  }
}

export default CheckAuthorization
