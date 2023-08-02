import { useEffect, useState } from 'react'
import Write from './Write'
import { checkTokenExpire } from '@src/api/authApi'
import { getUserInfo } from '@src/api/getApi'
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
        const tokenRes = await checkTokenExpire() // 임시 토큰확인코드 (private 라우터 완성되면 지울 것)
        const idRes = await getUserInfo()
        if (tokenRes?.status === 200 && idRes.memberId) {
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
