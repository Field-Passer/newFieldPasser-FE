import { isAxiosError } from 'axios'
import { privateApi } from './Instance'

// 승급
export const promoteUser = async (memberId: string) => {
  try {
    const response = await privateApi(`/admin/promote?memberId=${memberId}`, {
      method: 'PUT',
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

// 강등
export const demoteUser = async (memberId: string) => {
  try {
    const response = await privateApi(`/admin/demote?memberId=${memberId}`, {
      method: 'PUT',
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
