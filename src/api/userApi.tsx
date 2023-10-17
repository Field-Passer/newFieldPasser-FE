import { privateApi } from './Instance'

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
