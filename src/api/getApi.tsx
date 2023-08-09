import { publicApi, privateApi } from './Instance'

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
// 백엔드 문의
// /admin/einoqstu - list / { page }

// 문의글 조회
export const getQuestion = async (page: number) => {
  try {
    const response = await privateApi.get(`/question/inquiry/${page}`)
    return {
      data: response.data,
    }
  } catch (error) {
    console.log(error)
  }
}