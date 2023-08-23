import { checkTokenExpire, postRefereshToken } from '@src/api/authApi'
import { getCookieToken, removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import store from '@src/store/config'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'

const { dispatch } = store

interface AxiosInterceptorConfigType {
  headers: { [x: string]: string }
}

const CheckAuthorization = async (config: AxiosInterceptorConfigType) => {
  // const atExpire = store.getState().accessToken.expireTime
  // const curTime = new Date().getTime()
  // console.log(atExpire, curTime)
  // if (config) {
  const refresh_token = getCookieToken()
  const access_token = localStorage.getItem('accessToken')

  if (!access_token || !refresh_token) {
    // return 'Failed'
    // console.log('at:', access_token)
    // console.log('rt:', refresh_token)
    // console.log('노 액세스토큰')
    // console.log(new Date(atExpire), '/', new Date(curTime))
    return 'Failed'
  }
  const status = await checkTokenExpire()

  if (status === 200 && config) {
    config.headers['Authorization'] = `Bearer ${access_token}`
    // console.log('액세스토큰 예스', new Date().getTime())
    // console.log(new Date(atExpire) + ' / ' + new Date(curTime))
    return config
  } else {
    if (refresh_token) {
      const { code, tokens }: any = await postRefereshToken()
      if (code === 200 && config) {
        removeCookieToken()
        dispatch(SET_TOKEN(tokens.accessToken))
        setRefreshToken(tokens.refreshToken)
        config.headers['Authorization'] = `Bearer ${access_token}`
        // console.log('액세스토큰 만료, 리프레시토큰으로 액세스토큰 재발급 성공')
        return config
      } else {
        removeCookieToken()
        dispatch(DELETE_TOKEN())
        alert('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
        // console.log('토큰 예스, 벗 액세스토큰 재발급 실패')
        return 'Failed'
        // return
      }
    } else {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      // console.log('리프레시토큰 없어서 강제 로그아웃')
      // return
      return 'Failed'
    }
  }
  // }
}

export default CheckAuthorization
