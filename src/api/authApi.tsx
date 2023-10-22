import axios, { isAxiosError } from 'axios'
import { privateApi, publicApi } from './Instance'

// 로그인
export const userLogin = async ({ userEmail, userPw }: IUserInfoType) => {
  try {
    const response = await publicApi('/auth/login', {
      method: 'POST',
      data: {
        memberId: userEmail,
        password: userPw,
      },
    })
    // if(!response) return
    if (response.status && response.data.data) {
      return {
        status: response.status,
        tokens: response.data.data,
      }
    }
  } catch (error) {
    if (axios.isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.status,
      }
    }
  }
}

// 로그아웃
export const userLogout = async () => {
  // const access_token = store.getState().accessToken.accessToken
  const access_token = window.localStorage.getItem('accessToken')
  if (access_token == null) return
  try {
    const response = await privateApi('/auth/logout', {
      method: 'POST',
    })
    if (response.status === 200) {
      // window.location.replace('/login')
      return {
        status: response.status,
        result: response.data.result,
        message: response.data.message,
      }
    }
  } catch (error) {
    if (axios.isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.status,
      }
    }
  }
}

// accessToken 검사 (AT 검사)
export async function checkTokenExpire() {
  const access_token = window.localStorage.getItem('accessToken')
  if (access_token == null) {
    return
  }
  try {
    const response = await publicApi('/auth/validate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.status
  } catch (error) {
    if (axios.isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.status,
      }
    }
  }
}

// refreshToken 재발급
export async function postRefereshToken() {
  // const access_token = store.getState().accessToken.accessToken
  const access_token = window.localStorage.getItem('accessToken')
  try {
    const response = await publicApi('/auth/reissue', {
      withCredentials: true,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return {
      status: response.status,
      tokens: response.data.data,
    }
  } catch (error) {
    if (axios.isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.status,
      }
    }
  }
}

// 회원가입
export const join = async ({ userEmail, userPw, userName, userNickName, userPhone }: IUserInfoType) => {
  try {
    const response = await publicApi('/signup', {
      method: 'POST',
      data: {
        memberId: userEmail,
        password: userPw,
        memberName: userName,
        memberNickName: userNickName,
        memberPhone: userPhone,
      },
    })
    return response.status
  } catch (error) {
    if (axios.isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.status,
      }
    }
  }
}

// (회원가입시) 이메일 중복 검사
export const checkDuplicateEmail = async ({ userEmail }: IUserInfoType) => {
  try {
    const response = await publicApi('/duplicate-email', {
      method: 'POST',
      data: {
        memberId: userEmail,
      },
    })
    return response.status
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 비밀번호 찾기(find-password) - 인증번호 메일 요청(PIN번호 메일 전송)
export const verifyUserEmail = async ({ userEmail }: IUserInfoType) => {
  try {
    const response = await publicApi('/check-email', {
      method: 'POST',
      params: {
        memberId: userEmail,
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

// 비밀번호 찾기 - 인증번호 확인(PIN번호 확인)
export const verifyUserNum = async ({ userEmail, userVerifyNum }: IUserInfoType) => {
  try {
    const response = await publicApi('/check-pin', {
      method: 'GET',
      params: {
        memberId: userEmail,
        pin: userVerifyNum,
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
  try {
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
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 회원 정보 수정
export const editUserInfo = async ({ userName, userNickName, userPhone }: IUserInfoType) => {
  try {
    const response = await privateApi('/my-page/edit-info', {
      method: 'PATCH',
      data: {
        memberName: userName,
        memberNickName: userNickName,
        memberPhone: userPhone,
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
  try {
    const response = await privateApi(`/my-page/post-inquiry/${page}`, {
      method: 'GET',
    })
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data.content,
      totalPages: response.data.data.totalPages,
      totalElements: response.data.data.totalElements,
    }
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 관심글 조회
export const getWishlist = async (page: number) => {
  try {
    const response = await privateApi(`/my-page/wish-list/${page}`, {
      method: 'GET',
    })
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data.content,
      totalPages: response.data.data.totalPages,
      totalElements: response.data.data.totalElements,
    }
  } catch (error) {
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}

// 내가 작성한 댓글 조회
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
  const response = await publicApi.get(`member-inquiry/${memberId}/${page}`)
  return {
    status: response.status,
    data: response.data.data.content,
    lastPage: response.data.data.last,
  }
}
