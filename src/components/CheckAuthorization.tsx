import { checkTokenExpire, postRefereshToken } from '@src/api/authApi'
import { getCookieToken, removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import store from '@src/store/config'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import { InternalAxiosRequestConfig } from 'axios'

const { dispatch } = store

const CheckAuthorization = async (config: InternalAxiosRequestConfig) => {
  const refresh_token = getCookieToken()
  const access_token = localStorage.getItem('accessToken')

  if (!access_token || !refresh_token) {
    removeCookieToken()
    dispatch(DELETE_TOKEN())
    dispatch(DELETE_INFO())
    console.log('at, rf 없음')
    // return 'Failed'
    return 'NoToken'
  }
  const status = await checkTokenExpire()

  if (status === 200) {
    config.headers['Authorization'] = `Bearer ${access_token}`
    return config
  } else {
    if (refresh_token) {
      const { status, tokens } = (await postRefereshToken()) as IResponseType
      if (status === 200) {
        removeCookieToken()
        dispatch(SET_TOKEN(tokens.accessToken))
        setRefreshToken(tokens.refreshToken)
        config.headers['Authorization'] = `Bearer ${access_token}`
        console.log('rf로 at 재발급')
        return config
      } else {
        removeCookieToken()
        dispatch(DELETE_TOKEN())
        dispatch(DELETE_INFO())
        console.log('만료된 rf로 at재발급 실패')
        return 'ExpiredToken'
      }
    } else {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      console.log('rf 아예 없음')
      // return 'Failed'
      return 'NoToken'
    }
  }
}

export default CheckAuthorization
