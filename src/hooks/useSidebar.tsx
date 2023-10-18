import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '@src/store/slices/sidebarSlice'

const useSidebar = () => {
  const dispatch = useDispatch()

  const openSidebar = useCallback(() => {
    dispatch(OPEN_SIDEBAR())
  }, [])

  const closeSidebar = useCallback(() => {
    dispatch(CLOSE_SIDEBAR())
  }, [])

  return { openSidebar, closeSidebar }
}

export default useSidebar
