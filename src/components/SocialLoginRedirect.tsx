// import React from 'react'

import { getUserInfo } from '@src/api/getApi'
import { setRefreshToken } from '@src/storage/Cookie'
import { SET_TOKEN } from '@src/store/slices/authSlice'
import { SET_INFO } from '@src/store/slices/infoSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SocialLoginRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const accessToken = new URL(window.location.href).searchParams.get('access_token') as string
  const refreshToken = new URL(window.location.href).searchParams
    .get('refresh_token')
    ?.replace('refresh-token=', '') as string

  console.log(new URL(window.location.href))
  console.log(new URL(window.location.href).search)

  console.log('memberId:', new URL(window.location.href).searchParams.get('memberId'))
  console.log('access_token:', new URL(window.location.href).searchParams.get('access_token'))
  console.log('refresh_token:', new URL(window.location.href).searchParams.get('refresh_token'))

  useEffect(() => {
    const socialLogin = async () => {
      dispatch(SET_TOKEN(accessToken))
      setRefreshToken(refreshToken)
      try {
        const response = await getUserInfo()
        if (response) {
          dispatch(SET_INFO(response?.data))
          console.log(response)
        }
      } catch (err) {
        console.log(err)
      }
      window.onpopstate = () => {
        console.log('실행이 되고 잇나?')
        window.history.go(-3)
      }
      console.log('로그인함?', new Date())
      return navigate('/', { replace: true })
    }
    socialLogin()
    //navigate('/', { replace: true })
  })

  return <div>로그인 중...</div>
}

export default SocialLoginRedirect
