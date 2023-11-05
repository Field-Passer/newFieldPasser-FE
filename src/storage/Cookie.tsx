import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setRefreshToken = (refreshToken: string) => {
  const today = new Date()
  const expireDate = today.setDate(today.getTime() + 90 * 2 * 10000) // 밀리초 // 15분

  return cookies.set('refresh-token', refreshToken, {
    sameSite: 'none',
    secure: true,
    expires: new Date(expireDate),
    maxAge: 900, // 초 // 15분
  })
}

export const getCookieToken = () => {
  return cookies.get('refresh-token')
}

export const removeCookieToken = () => {
  return cookies.remove('refresh-token', { sameSite: 'strict', path: '/' })
}
