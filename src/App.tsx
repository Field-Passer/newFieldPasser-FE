import { Outlet, useLocation } from 'react-router'
import Header from './components/Main/Header'
import Footer from './components/Main/Footer'
import { ThemeProvider } from 'styled-components'
import theme from './constants/theme'
import Sidebar from './components/Main/Sidebar'
import { useEffect } from 'react'
import { cheakOpenBox } from './store/slices/searchChkSlice'
import { useDispatch } from 'react-redux'
import ModalWithHook from './components/ModalWithHook'
import Overlay from './components/Style/Overlay'
// import useAxiosInterceptor from './hooks/useAxiosInterceptor'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (window.document.body.classList.contains('stop-scrolling')) {
      window.document.body.classList.remove('stop-scrolling')
      dispatch(cheakOpenBox({ openBox: false }))
    }
  }, [location])

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <ModalWithHook />
      <Overlay />
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  )
}

export default App
