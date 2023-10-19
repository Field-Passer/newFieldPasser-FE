import { useEffect, useState } from 'react'
import Write from './Write'
import { getUserInfo } from '@src/api/authApi'
import { useLocation } from 'react-router'
import useModal from '@src/hooks/useModal'

const EditPost = () => {
  const location = useLocation()
  const [userId, setUserId] = useState('')
  const [isWriter, setIsWriter] = useState(false)
  const { openModal } = useModal()
  const [dataForEdit] = useState<POST_TYPE>(location.pathname.includes('edit') && location.state.data)

  const goToBack = () => {
    openModal({
      isModalOpen: true,
      isConfirm: false,
      content: ['본인이 작성한 게시물만 수정 가능합니다.'],
      navigateOption: -1,
    })
  }

  useEffect(() => {
    const checkId = async () => {
      try {
        const idRes = await getUserInfo()
        if (idRes?.memberId) {
          setUserId(idRes.memberId)
        }
      } catch (err) {
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['유저 정보를 확인할 수 없습니다. 재로그인 후 다시 시도해주세요.'],
          navigateOption: -1,
        })
      }
    }
    checkId()
  }, [])

  useEffect(() => {
    if (userId) {
      userId === location.state.data.memberId ? setIsWriter(true) : goToBack()
    }
  }, [userId])

  return <>{isWriter && <Write />}</>
}

export default EditPost
