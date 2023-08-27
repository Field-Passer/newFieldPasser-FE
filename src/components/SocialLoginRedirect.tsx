// import React from 'react'

import { removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import { DELETE_TOKEN, SET_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const SocialLoginRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userId = new URL(window.location.href).searchParams.get('memberId')
  const accessToken = new URL(window.location.href).searchParams.get('access_token') as string
  const refreshToken = new URL(window.location.href).searchParams.get('refresh_token') as string

  console.log(userId)
  console.log(accessToken)
  console.log(refreshToken)

  useEffect(() => {
    const socialLogin = async () => {
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      removeCookieToken()
      dispatch(SET_TOKEN(accessToken))
      setRefreshToken(refreshToken)
      alert('리다이렉트 페이지 확인')
      console.log('로그인함', new Date())
      // return navigate('/')
    }
    socialLogin()
    navigate('/', { replace: true })
  })

  return <div>로그인 중...</div>
}

export default SocialLoginRedirect
