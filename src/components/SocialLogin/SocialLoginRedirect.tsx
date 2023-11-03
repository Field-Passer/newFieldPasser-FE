import PATH from '@src/constants/pathConst'
import { setRefreshToken } from '@src/storage/Cookie'
import { SET_TOKEN } from '@src/store/slices/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SocialLoginRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { openModal } = useModal()

  const accessToken = new URL(window.location.href).searchParams.get('access_token') as string
  const refreshToken = new URL(window.location.href).searchParams
    .get('refresh_token')
    ?.replace('refresh-token=', '') as string

  useEffect(() => {
    const socialLogin = async () => {
      dispatch(SET_TOKEN(accessToken))
      setRefreshToken(refreshToken)
      console.log('소셜 로그인 성공', new Date())
      return navigate(PATH.HOME, { replace: true })
    }
    socialLogin()
  })

  return <></>
}

export default SocialLoginRedirect
