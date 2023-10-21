import { useEffect, useState } from 'react'
import Write from '../components/Write/Write'
import { getUserInfo } from '@src/api/authApi'
import { useLocation } from 'react-router'
import useModal from '@src/hooks/useModal'
import { requestEdit } from '@src/api/postApi'

const EditPost = () => {
  const { state } = useLocation()
  const [isWriter, setIsWriter] = useState(false)
  const { openModal } = useModal()
  const [postData, setPostData] = useState<IWritePostData>({
    categoryName: state.data.categoryName,
    content: state.data.content,
    districtName: state.data.districtName,
    endTime: state.data.endTime,
    imageUrl: state.data.imageUrl,
    price: state.data.price,
    startTime: state.data.startTime,
    title: state.data.title,
  })

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
        if (idRes?.memberId === state.data.memberId) {
          setIsWriter(true)
        } else {
          goToBack()
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

  const submitData = async (formData: FormData) => {
    try {
      const editRes = await requestEdit(formData, state.data.boardId)
      if (editRes === 200) {
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['게시글 수정이 완료되었습니다.'],
          navigateOption: `/board-details/${state.data.boardId}`,
        })
      }
    } catch (err) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['정상적으로 등록되지 않았습니다. 다시 시도해주세요.'],
      })
    }
  }

  return (
    <>{isWriter && <Write postData={postData} setPostData={setPostData} pageName={'edit'} submitData={submitData} />}</>
  )
}

export default EditPost
