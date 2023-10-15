import { useCallback } from 'react'

const useModal = () => {
  const openModal = useCallback(() => {
    //state setting
  }, [])

  const closeModal = useCallback(() => {
    //state setting
  }, [])

  return { openModal, closeModal }
}

export default useModal
