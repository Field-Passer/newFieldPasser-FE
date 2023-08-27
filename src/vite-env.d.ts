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

interface IUserInfoEditType {
  status: number
  memberId: string
  memberName: string
  memberNickName: string
  memberPhone: string
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
  memberNickName: string
  myBoard: boolean
  phone: string
  price: number
  registerDate: string
  startTime: string
  title: string
  transactionStatus: string | null
  viewCount: number
  wishCount: number
  likeBoard: boolean
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

interface CommentTypes {
  children: CommentTypes[]
  commentContent: string
  commentId: number
  commentRegisterDate: string
  commentUpDate: string
  deleteCheck: boolean
  memberId: string
  memberNickname: string
  myComment: boolean
  title: string
}

interface QuestionTypes {
  answerTitle: string
  answerContent: string
}

interface StyleProps {
  screen: string
}

interface QuestionPostType {
  questionTitle: string
  questionContent: string
  questionCategory: string
}

interface QuestionGetTypes {
  answerId: number
  questionCategory: string
  questionContent: string
  questionId: number
  questionProcess: string
  questionRegisterDate: string
  questionTitle: string
  questionUpdateDate: string
}

interface QuestionAnswerTypes {
  answerContent: string
  answerRegisterDate: string
  answerTitle: string
  memberName: string
}

interface ISidebarProps {
  sideOpen: boolean
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface IModalProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: string[]
  isConfirm: boolean
  navigateAfterConfirm?: string
}
interface IOverlayProps {
  sideOpen?: boolean
  setSideOpen?: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen?: boolean
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface ITimeSelectorProps {
  setIsTimeChange: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>
  setIsTimeSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>
}
