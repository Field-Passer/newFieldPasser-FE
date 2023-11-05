import { userLogout } from '@src/api/authApi'
import useModal from './useModal'
import PATH from '@src/constants/pathConst'
import { removeCookieToken } from '@src/storage/Cookie'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import { useDispatch } from 'react-redux'

const useLoginState = () => {
  const { openModal } = useModal()
  const dispatch = useDispatch()

  const accessAfterLoginAlert = () => {
    openModal({
      isModalOpen: true,
      isConfirm: false,
      content: ['로그인 후 이용 가능합니다.'],
      navigateOption: PATH.LOGIN,
    })
  }

  const logOutAlert = () => {
    openModal({
      isModalOpen: true,
      isConfirm: false,
      content: ['로그아웃 되었습니다.'],
      navigateOption: PATH.HOME,
    })
  }

  const logoutHandler = async () => {
    const response = await userLogout()
    if (response?.status === 200) {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      logOutAlert()
      return
    }
  }

  return { accessAfterLoginAlert, logOutAlert, logoutHandler }
}

export default useLoginState
