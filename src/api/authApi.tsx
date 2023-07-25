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

// 이메일 인증 절차
