import React, { useEffect, useState } from 'react'
import Write from './Write'
import { checkTokenExpire } from '@src/api/authApi'
import { getUserInfo } from '@src/api/getApi'
import { useNavigate } from 'react-router'

type Props = {}

const Edit = (props: Props) => {
  const navigate = useNavigate()
  const [isWriter, setIsWriter] = useState(false)
  //private 라우터에 포함
  // 게시글 작성자와 현재 로그인한 아이디 일치할 때만 write로 이동 (pathname으로만 이동 시 혼선 방지)
  // 일치하지 않을 경우 alert만 띄우고 종료
  useEffect(() => {
    // 수정버튼 클릭 시 navigate props로 게시글 정보 받아와 내려주기
    const checkId = async () => {
      try {
        const tokenRes = await checkTokenExpire() // 임시 토큰확인코드 (private 라우터 완성되면 지울 것)
        const idRes = await getUserInfo()
        if (tokenRes?.status === 200 && idRes.memberId) {
          return idRes.memberId
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkId()
  }, [])

  const goToBack = () => {
    alert('본인이 작성한 게시물만 수정 가능합니다.')
    navigate(-1) //이전페이지로 이동
  }

  return <>{isWriter ? <Write /> : goToBack()}</>
}

export default Edit
