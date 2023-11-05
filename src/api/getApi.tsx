import { privateApi } from '@src/hooks/useAxiosInterceptor'

// 관리자 문의글 전체 조회
export const getAdminQuestion = async (page: number) => {
  const response = await privateApi.get(`/admin/question-list/${page}`)
  return response.data.data
}

// 내 문의글 조회
export const getQuestion = async (page: number) => {
  const response = await privateApi.get(`/question/inquiry/${page}`)
  return response.data.data
}

// 문의글 상세 조회
export const getQuestionDetail = async (questionId: number) => {
  const response = await privateApi.get(`/question/${questionId}`)
  return response.data.data
}

// 문의글 답변 조회
export const getQuestionAnswer = async (questionId: number) => {
  const response = await privateApi.get(`/question/answer/${questionId}`)
  return response.data.data
}

// 관리자 블라인드 게시글 조회
export const getAdminBlind = async (page: number) => {
  const response = await privateApi.get(`admin/board/blind/lookup/${page}`)
  return {
    data: response.data.data.content,
    last: response.data.data.last,
  }
}
