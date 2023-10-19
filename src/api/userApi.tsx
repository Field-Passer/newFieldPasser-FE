import { isAxiosError } from 'axios'
import { privateApi, publicApi } from './Instance'

// 승급
export const promoteUser = async (memberId: string) => {
  const response = await privateApi.put(`/admin/promote?memberId=${memberId}`)
  return {
    status: response.status,
  }
}

// 강등
export const demoteUser = async (memberId: string) => {
  const response = await privateApi.put(`/admin/demote?memberId=${memberId}`)
  return {
    status: response.status,
  }
}

// 회원가입
export const join = async ({
  userEmail: memberId,
  userPw: password,
  userName: memberName,
  userNickName: memberNickName,
  userPhone: memberPhone,
}: IUserInfoType) => {
  const response = await publicApi.post('/signup', { memberId, password, memberName, memberNickName, memberPhone })
  return response.status
}

// (회원가입시) 이메일 중복 검사
export const checkDuplicateEmail = async ({ userEmail: memberId }: IUserInfoType) => {
  const response = await publicApi.post('/duplicate-email', { memberId })
  return response.status
}

// 비밀번호 찾기(find-password) - 인증번호 메일 요청(PIN번호 메일 전송)
export const verifyUserEmail = async ({ userEmail: memberId }: IUserInfoType) => {
  const response = await publicApi.post('/check-email', { params: { memberId } })
  return response
}

// 비밀번호 찾기 - 인증번호 확인(PIN번호 확인)
export const verifyUserNum = async ({ userEmail: memberId, userVerifyNum: pin }: IUserInfoType) => {
  const response = await publicApi.get('/check-pin', {
    params: { memberId, pin },
  })
  return response.status
}

// 비밀번호 찾기 - 임시 비밀번호 발급(임시 비밀번호 생성, 저장, 메일 전송)
export const temporaryPassword = async ({ userEmail }: IUserInfoType) => {
  try {
    const response = await publicApi('/member-temporary', {
      method: 'POST',
      params: {
        email: userEmail,
      },
    })
    return {
      status: response.status,
    }
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 회원 정보 조회
export const getUserInfo = async () => {
  const response = await privateApi('/my-page/member-inquiry', {
    method: 'GET',
  })
  return {
    status: response.status,
    memberId: response.data.data.memberId,
    memberName: response.data.data.memberName,
    memberNickName: response.data.data.memberNickName,
    memberPhone: response.data.data.memberPhone,
    data: response.data.data,
  }
}

// 회원 정보 수정
export const editUserInfo = async ({ userName, userNickName, userPhone }: IUserInfoType) => {
  const response = await privateApi('/my-page/edit-info', {
    method: 'PATCH',
    data: {
      memberName: userName,
      memberNickName: userNickName,
      memberPhone: userPhone,
    },
  })
  return response
}

// 비밀번호 변경(마이페이지에서)
export const editUserPw = async ({ newPw }: IUserInfoType) => {
  try {
    const response = await privateApi('/my-page/edit-password', {
      method: 'POST',
      data: {
        password: newPw,
      },
    })
    return {
      status: response.status,
    }
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 내가 작성한 글 조회
export const getMyPost = async (page: number) => {
  const response = await privateApi.get(`/my-page/post-inquiry/${page}`)
  return {
    status: response.status,
    message: response.data.message,
    data: response.data.data.content,
    totalPages: response.data.data.totalPages,
    totalElements: response.data.data.totalElements,
  }
}

// 관심글 조회
export const getWishlist = async (page: number) => {
  const response = await privateApi.get(`/my-page/wish-list/${page}`)
  return {
    status: response.status,
    message: response.data.message,
    data: response.data.data.content,
    totalPages: response.data.data.totalPages,
    totalElements: response.data.data.totalElements,
  }
}

// 내가 작성한 댓글 조회
// export const getMyReply = async (page: number) => {
//   try {
//     const response = await privateApi(`/comment/my-inquiry/${page}`, {
//       method: 'GET',
//     })
//     return {
//       status: response.status,
//       message: response.data.message,
//       data: response.data.data.content,
//       totalPages: response.data.data.totalPages,
//       totalElements: response.data.data.totalElements,
//     }
//   } catch (error) {
//     if (isAxiosError<IResponseErrorType>(error)) {
//       return {
//         status: error.response?.data.state,
//       }
//     }
//   }
// }

export const getMyReply = async (page: number) => {
  const response = await privateApi.get(`/comment/my-inquiry/${page}`)
  return {
    status: response.status,
    message: response.data.message,
    data: response.data.data.content,
    totalPages: response.data.data.totalPages,
    totalElements: response.data.data.totalElements,
  }
}

// 회원 게시글 조회
export const getUserPost = async (page: number, memberId: string) => {
  const response = await publicApi(`member-inquiry/${memberId}/${page}`, { method: 'GET' })
  return {
    status: response.status,
    data: response.data.data.content,
    lastPage: response.data.data.last,
  }
}
