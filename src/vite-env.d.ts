/// <reference types="vite/client" />
interface IuserInfoType {
  userEmail: string
  userPw?: string
  userName?: string
  userNickName?: string
  userPhone?: string
}

interface IResponseErrorType {
  state: number
}

interface ISaveImgFile {
  imgFile: File | null
  imgSrc: string | undefined
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

interface CommentTypes {
  commentId: number
  memberId: string
  title: string
  commentContent: string
  commentRegisterDate: string
  commentUpDate: string
}
