import { privateApi, publicApi } from './Instance'

// 로그인
export const userLogin = async ({ userEmail, userPw }: LoginType) => {
  try {
    const response = await publicApi('/auth/login', {
      method: 'POST',
      data: {
        memberId: userEmail,
        password: userPw,
      },
    })
    return {
      status: response.status,
      result: response.data.result,
      message: response.data.message,
      tokens: response.data.data,
    }
  } catch (error) {
    console.log(error)
    return {
      //message: error,
    }
  }
}

// 로그아웃
export const userLogout = async () => {
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
    console.log(error)
    return {
      // message: error
    }
  }
}

// at 검사

// rt 재발급
