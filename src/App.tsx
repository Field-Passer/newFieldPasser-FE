import { Outlet, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'styled-components'
import theme from './constants/theme'
import Sidebar from './components/Sidebar'
import Overlay from './components/Overlay'
import { useState, useEffect } from 'react'
import { cheakOpenBox } from './store/slices/searchChkSlice'
import { useDispatch } from 'react-redux'
// import useAxiosInterceptor from './hooks/useAxiosInterceptor'

const App = () => {
  const dispatch = useDispatch()
  const [sideOpen, setSideOpen] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    if (window.document.body.classList.contains('stop-scrolling')) {
      window.document.body.classList.remove('stop-scrolling')
      dispatch(cheakOpenBox({ openBox: false }))
    }
  }, [location])
  // useAxiosInterceptor()

  return (
    <ThemeProvider theme={theme}>
      <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Overlay sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Header setSideOpen={setSideOpen} />
      <Outlet />
      <Footer />
    </ThemeProvider>
  )
}

export default App
