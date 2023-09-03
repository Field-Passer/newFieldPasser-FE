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

  useEffect(() => {
    const socialLogin = async () => {
      dispatch(SET_TOKEN(accessToken))
      setRefreshToken(refreshToken)
      try {
        const response = await getUserInfo()
        if (response) {
          dispatch(SET_INFO(response?.data))
        }
      } catch (err) {
        console.log(err)
      }
      console.log('소셜 로그인 성공', new Date())
      return navigate('/', { replace: true })
    }
    socialLogin()
    //navigate('/', { replace: true })
  })

  return <></>
}

export default SocialLoginRedirect
