import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'styled-components'
import theme from './constants/theme'
import Sidebar from './components/Sidebar'
import Overlay from './components/Overlay'
import { useState, useEffect } from 'react'

const App = () => {
  const [sideOpen, setSideOpen] = useState<boolean>(false)
  useEffect(() => {
    const body = document.querySelector('body')
    if (body?.classList.contains('stop-scrolling')) body?.classList.remove('stop-scrolling')
  }, [])

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
