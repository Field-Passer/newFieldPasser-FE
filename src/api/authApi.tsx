import axios, { isAxiosError } from 'axios'
import { privateApi, publicApi } from './Instance'
import store from '@src/store/config'

// 로그인
export const userLogin = async ({ userEmail, userPw }: IUserInfoType) => {
  try {
    const response = await publicApi<IResponseType>('/auth/login', {
      method: 'POST',
      data: {
        memberId: userEmail,
        password: userPw,
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

// 로그아웃
export const userLogout = async () => {
  const access_token = store.getState().accessToken.accessToken
  if (access_token == null) return console.log('로그아웃 요청에서 at=null')
  try {
    const response = await privateApi('/auth/logout', {
      method: 'POST',
    })
    return {
      status: response.status,
      result: response.data.result,
      message: response.data.message,
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
  const access_token = store.getState().accessToken.accessToken
  if (access_token == null) {
    console.log('------null 거르기------')
    return
  }
  try {
    const response = await publicApi('/auth/validate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return {
      status: response.status,
    }
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
  const access_token = store.getState().accessToken.accessToken
  try {
    const response = await publicApi('/auth/reissue', {
      withCredentials: true,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return {
      code: response.status,
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
    const response = await publicApi<IResponseType>('/signup', {
      method: 'POST',
      data: {
        memberId: userEmail,
        password: userPw,
        memberName: userName,
        memberNickName: userNickName,
        memberPhone: userPhone,
      },
    })
    return {
      status: response.status!,
    }
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

// 비밀번호 찾기 - 인증번호 메일 요청
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

// 비밀번호 찾기 - 인증번호 확인
export const verifyUserNum = async ({ userEmail, userVerifyNum }: IUserInfoType) => {
  try {
    const response = await publicApi('/check-email', {
      method: 'POST',
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

// 비밀번호 찾기 - 임시 비밀번호 발급
export const temporaryPassword = async ({ userEmail }: IUserInfoType) => {
  console.log('temporary 실행')
  try {
    const response = await publicApi('/member-temporary', {
      method: 'POST',
      params: {
        email: userEmail,
      },
    })
    console.log(response)
    return {
      status: response.status,
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError<IResponseErrorType>(error)) {
      return {
        status: error.response?.data.state,
      }
    }
  }
}
