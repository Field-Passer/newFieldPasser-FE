/// <reference types="vite/client" />
interface LoginType {
  userEmail: string
  userPw: string
}

interface IPostPayload {
  title: string
  file: File | null
  price: number
  districtName: string
  categoryName: string
  startTime: string
  endTime: string
  content: string
}

interface POST_TYPE {
  blind: boolean
  boardId: number
  categoryName: string
  content: string
  deleteCheck: boolean
  districtName: string
  endTime: string
  imageUrl: string
  memberId: string
  memberName: string
  phone: string
  price: number
  registerDate: string
  startTime: string
  title: string
  transactionStatus: string | null
  viewCount: number
  wishCount: number
}

interface SearchValueTypes {
  title: string
  date: string
  startTime: string
  endTime: string
  district: string[]
  category: string
}
