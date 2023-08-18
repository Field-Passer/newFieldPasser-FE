// import { RootState } from '@src/store/config'
import { useEffect, useState } from 'react'
// import PATH from '@src/constants/pathConst'
// import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { getCookieToken } from '@src/storage/Cookie'
// import CheckAuthorization from '@src/components/CheckAuthorization'
import { getCookieToken, removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import { checkTokenExpire, postRefereshToken } from '@src/api/authApi'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'
import { privateApi } from '@src/api/Instance'

const ReIssueToken = async (key: string) => {
  console.log('111111111')
  console.log(key)
  const [isValid, setIsValid] = useState('Loaded')
  console.log('why......')

  const refresh_token = getCookieToken()
  // const access_token = useSelector((state: RootState) => state.accessToken.accessToken)
  const access_token = window.localStorage.getItem('accessToken')
  const dispatch = useDispatch()

  console.log('22222222')

  useEffect(() => {
    console.log('3333333333')
    const reIssueToken = async () => {
      if (!access_token) {
        setIsValid('Failed')
        return alert('페이지 이동 => ac없음!!')
      }
      const status = await checkTokenExpire()

      console.log('페이지 이동해서 토큰 체크~~~~~:', status)
      if (status === 200) {
        //return true
        console.log('페이지 이동 => 아직 유효한 토큰!!')
        setIsValid('Success')
      } else {
        if (refresh_token) {
          const { code, tokens }: any = await postRefereshToken()
          if (code === 200) {
            removeCookieToken()
            dispatch(SET_TOKEN(tokens.accessToken))
            setRefreshToken(tokens.refreshToken)
            privateApi.defaults.headers['Authorization'] = `Bearer ${access_token}`
            console.log('페이지 이동 => ac만료되서 rt로 at재발급 완료')
            //return true
            setIsValid('Success')
          } else {
            removeCookieToken()
            dispatch(DELETE_TOKEN())
            alert('페이지 이동 => no config 토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
            console.log('페이지 이동 => 만료된 rt로 재발급 실패, 로그아웃')
            //return false
            setIsValid('Failed')
          }
        } else {
          console.log('페이지 이동 => rt 없어서 브라우저에서 강제 로그아웃')
          removeCookieToken()
          dispatch(DELETE_TOKEN())
          console.log('페이지 이동 => 리프레시 토큰 없음')
          alert('페이지 이동 => 토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
          //return false
          setIsValid('Failed')
        }
      }
    }

    reIssueToken()
  }, [key])

  return { isValid }
}
export default ReIssueToken
