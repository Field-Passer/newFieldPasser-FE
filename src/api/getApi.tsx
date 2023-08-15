import { privateApi } from './Instance'

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const res = await privateApi.get('/my-page/member-inquiry')
    return res.data.data
  } catch (err) {
    console.log(err)
  }
}

// 관리자 문의글 전체 조회
export const getAdminQuestion = async (page: number) => {
  try {
    const response = await privateApi.get(`/admin/question-list/${page}`)
    return {
      data: response.data.data,
    }
  } catch (error) {
    console.log(error)
  }
}

// 내 문의글 조회
export const getQuestion = async (page: number) => {
  try {
    const response = await privateApi.get(`/question/inquiry/${page}`)
    return {
      data: response.data.data,
    }
  } catch (error) {
    console.log(error)
  }
}

// 문의글 상세 조회
export const getQuestionDetail = async (questionId: number) => {
  try {
    const response = await privateApi.get(`/question/${questionId}`)
    return {
      data: response.data.data,
    }
  } catch (error) {
    console.log(error)
  }
}

// 문의글 답변 조회
export const getQuestionAnswer = async (questionId: number) => {
  try {
    const response = await privateApi.get(`/question/answer/${questionId}`)
    return {
      data: response.data.data,
    }
  } catch (error) {
    console.log(error)
  }
}
