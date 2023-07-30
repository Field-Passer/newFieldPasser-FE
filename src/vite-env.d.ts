/// <reference types="vite/client" />
interface IUserInfoType {
  userEmail?: string
  userPw?: string
  userName?: string
  userNickName?: string
  userPhone?: string
  userVerifyNum?: string
  newPw?: string
}
interface IResponseType {
  status: number
  tokens: {
    accessToken: string
    refreshToken: string
  }
  data?: any
}
interface IResponseErrorType {
  status?: number
  state?: number
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
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  district: string[]
  category: string
  [prop: string]: any
}

interface ValueStateType {
  categoryValue: string
  districtValue: string[]
  startTimeValue: string
  endTimeValue: string
  startDate: Date
  endDate: Date
  searchTextValue: string
  [prop: string]: any
}

interface CheckValueStateType {
  searchBoxOpen: boolean
  categoryOpen: boolean
  districtOpen: boolean
  districtSelect: boolean
  timeChange: boolean
  startDateChange: boolean
  endDateChange: boolean
  [prop: string]: any
}

interface ICategories {
  category: string
  name: string
  icon: ReactElement
}
