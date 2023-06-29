import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

const App = () => {
  const [sideOpen, setSideOpen] = useState<boolean>(false)

  return (
    <>
      <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
