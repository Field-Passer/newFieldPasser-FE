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
import Modal from './components/Modal'

const App = () => {
  const dispatch = useDispatch()
  const [sideOpen, setSideOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    if (window.document.body.classList.contains('stop-scrolling')) {
      window.document.body.classList.remove('stop-scrolling')
      dispatch(cheakOpenBox({ openBox: false }))
    }
  }, [location])

  return (
    <ThemeProvider theme={theme}>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} content={['잘못된 로그인 정보입니다.', '아이디 또는 비밀번호를 다시 입력해주세요.']} />
      <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Overlay sideOpen={sideOpen} setSideOpen={setSideOpen} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Header setSideOpen={setSideOpen} />
      <Outlet />
      <Footer />
    </ThemeProvider>
  )
}

export default App
