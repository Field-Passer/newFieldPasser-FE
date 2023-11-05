import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookieToken } from '@src/storage/Cookie'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'
import { useLocation } from 'react-router'
import useLoginState from '@src/hooks/useLoginState'

interface IPrivateRoute {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { accessAfterLoginAlert } = useLoginState()

  const access_token = window.localStorage.getItem('accessToken')
  const refresh_token = getCookieToken()
  useEffect(() => {
    if (!access_token || !refresh_token) {
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      accessAfterLoginAlert()
    }
  }, [location])
  return <>{access_token && refresh_token && children}</>
}

export default PrivateRoute
