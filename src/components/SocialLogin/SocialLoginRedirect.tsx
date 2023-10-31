import { getUserInfo } from '@src/api/userApi'
import PATH from '@src/constants/pathConst'
import useModal from '@src/hooks/useModal'
import { setRefreshToken } from '@src/storage/Cookie'
import { SET_TOKEN } from '@src/store/slices/authSlice'
import { SET_INFO } from '@src/store/slices/infoSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SocialLoginRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { openModal } = useModal()

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
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['토큰이 존재하지 않습니다. 로그인 페이지로 이동합니다.'],
          navigateOption: PATH.LOGIN,
        })
      }
      console.log('소셜 로그인 성공', new Date())
      return navigate(PATH.HOME, { replace: true })
    }
    socialLogin()
  })

  return <></>
}

export default SocialLoginRedirect
