import React from 'react'
// import PATH from '@src/constants/pathConst'

interface IPrivateRoute {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  // 로그인 여부 확인 코드 작성 필요
  // 로그인 상태라면 children을 리턴, 아니라면 로그인 창으로 돌아가기
  // 아래는 예시 코드입니다 로그인 기능 구현 후 수정 예정
  // const accessToken = getCookie('accessToken')
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // if (!accessToken) {
  //   dispatch(
  //     setModal({
  //       isOpen: true,
  //       text: MESSAGES.INVALID_AUTH,
  //       onClickOK: () => {
  //         dispatch(setModal({ route: navigate(PATH.LOGIN) }))
  //       },
  //     })
  //   )
  // }
  // return accessToken && children

  return children
}

export default PrivateRoute
