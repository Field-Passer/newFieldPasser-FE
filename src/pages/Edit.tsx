import { useEffect, useState } from 'react'
import Write from './Write'
import { getUserInfo } from '@src/api/authApi'
import { useLocation, useNavigate } from 'react-router'

const Edit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [userId, setUserId] = useState('')
  const [isWriter, setIsWriter] = useState(false)

  const goToBack = () => {
    alert('본인이 작성한 게시물만 수정 가능합니다.')
    navigate(-1) //이전페이지로 이동
  }

  useEffect(() => {
    const checkId = async () => {
      try {
        const idRes = await getUserInfo()
        if (idRes?.memberId) {
          setUserId(idRes.memberId)
        }
      } catch (err) {
        console.log(err)
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

export default Edit
