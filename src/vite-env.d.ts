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
