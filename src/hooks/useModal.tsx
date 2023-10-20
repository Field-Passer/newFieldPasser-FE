import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { DELETE_MODAL, SET_MODAL } from '@src/store/slices/modalSlice'

const useModal = () => {
  const dispatch = useDispatch()

  const openModal = useCallback((payload: IModalPayload) => {
    dispatch(SET_MODAL(payload))
  }, [])

  const closeModal = useCallback(() => {
    dispatch(DELETE_MODAL())
  }, [])

  return { openModal, closeModal }
}

export default useModal
