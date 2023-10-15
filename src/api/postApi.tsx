import { privateApi } from './Instance'

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
  try {
    const response = await privateApi(`/admin/answer/register?questionId=${questionId}`, {
      method: 'POST',
      data,
    })
    return {
      status: response.status,
    }
  } catch (error) {
    console.log(error)
  }
}

// 문의글 등록
export const postQuestion = async (data: QuestionPostType) => {
  try {
    const response = await privateApi('/question/register', {
      method: 'POST',
      data,
    })
    return {
      status: response.status,
    }
  } catch (error) {
    console.log(error)
  }
}
