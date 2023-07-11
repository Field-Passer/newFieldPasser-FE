export interface ISaveImgFile {
  imgFile: File | null
  imgSrc: string | undefined
}

export interface IPostingPayload {
  title: string
  imgFile: File | null
  price: number
  district: string
  category: string
  name: string
  reservation: string
  content: string
}
