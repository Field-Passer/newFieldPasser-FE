import { useState } from 'react'
import Write from '../components/Write/Write'
import { requestWrite } from '@src/api/postApi'
import useModal from '@src/hooks/useModal'
import PATH from '@src/constants/pathConst'

const WritePost = () => {
  const { openModal } = useModal()
  const [postData, setPostData] = useState<IWritePostData>({
    categoryName: '',
    content: '',
    districtName: '',
    endTime: '',
    imageUrl: '',
    price: 0,
    startTime: '',
    title: '',
  })

  const submitData = async (formData: FormData) => {
    try {
      const writeRes = await requestWrite(formData)
      if (writeRes === 200) {
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['게시글 작성이 완료되었습니다.'],
          navigateOption: PATH.HOME,
        })
      } else {
        throw new Error()
      }
    } catch (err) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['정상적으로 등록되지 않았습니다. 다시 시도해주세요.'],
      })
    }
  }

  return <Write postData={postData} setPostData={setPostData} pageName={'write'} submitData={submitData} />
}

export default WritePost
