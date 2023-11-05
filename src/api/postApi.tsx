import { privateApi } from '@src/hooks/useAxiosInterceptor'

// 게시글 작성
export const requestWrite = async (formData: FormData) => {
  const response = await privateApi('/board/register', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: formData,
  })
  if (response.data.state === 200) {
    return 200
  }
}

// 게시글 수정
export const requestEdit = async (formData: FormData, postId: number) => {
  const response = await privateApi(`/board/edit/${postId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: formData,
  })
  if (response.data.state === 200) {
    return 200
  }
}

// 관리자 문의글 답변 등록
export const postAdmintQuestion = async (questionId: number, data: QuestionTypes) => {
  const response = await privateApi.post(`/admin/answer/register?questionId=${questionId}`, data)
  return {
    status: response.status,
  }
}

// 문의글 등록
export const postQuestion = async (data: QuestionPostType) => {
  const response = await privateApi.post('/question/register', data)
  return {
    status: response.status,
  }
}
