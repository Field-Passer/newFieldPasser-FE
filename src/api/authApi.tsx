import { publicApi, privateApi } from '@src/hooks/useAxiosInterceptor'

// 로그인
export const userLogin = async ({ userEmail: memberId, userPw: password }: IUserInfoType) => {
  const response = await publicApi.post('/auth/login', { memberId, password })
  return response
}

// 로그아웃
export const userLogout = async () => {
  const response = await privateApi.post('/auth/logout')
  return response
}

// accessToken 검사 (AT 검사)
export async function checkTokenExpire() {
  const access_token = window.localStorage.getItem('accessToken')
  if (access_token == null) return
  const response = await publicApi.post(
    '/auth/validate',
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
  return response.status
}

// refreshToken 재발급
export async function postRefereshToken() {
  const access_token = window.localStorage.getItem('accessToken')
  try {
    const response = await publicApi.post('/auth/reissue', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
