import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'styled-components'
import theme from './constants/theme'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

const App = () => {
  const [sideOpen, setSideOpen] = useState<boolean>(false)

  return (
    <ThemeProvider theme={theme}>
      <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Outlet />
      <Footer />
    </ThemeProvider>
  )
}

export default App
