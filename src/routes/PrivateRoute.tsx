import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCookieToken } from '@src/storage/Cookie'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import Modal from '@src/components/Modal'
import { useLocation } from 'react-router'

interface IPrivateRoute {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalIsConfirm, setModalIsConfirm] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string[]>([])
  const [modalNavigateOption, setModalNavigateOption] = useState<string>('')

  const access_token = window.localStorage.getItem('accessToken')
  const refresh_token = getCookieToken()
  useEffect(() => {
    if (!access_token || !refresh_token) {
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      setModalOpen(true)
      setModalIsConfirm(false)
      setModalText(['로그인이 필요한 서비스입니다.'])
      setModalNavigateOption('/login')
      // console.log('privateRouter-----------')
    }
  }, [location])
  return (
    <>
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          content={modalText}
          isConfirm={modalIsConfirm}
          navigateOption={modalNavigateOption}
        />
      )}
      {access_token && refresh_token && children}
    </>
  )
}

export default PrivateRoute
