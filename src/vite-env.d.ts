/// <reference types="vite/client" />
interface userInfoType {
  userEmail: string
  userPw?: string
  userName?: string
  userPhone?: string
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
