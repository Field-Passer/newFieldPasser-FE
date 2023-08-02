import { privateApi } from './Instance'

// 게시글 작성
export const requestWrite = async (formData: FormData) => {
  try {
    const response = await privateApi('/board/register', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
    console.log(response)
    if (response.data.state === 200) {
      return 200
    }
  } catch (error) {
    console.log(error)
  }
}

// 게시글 수정
export const requestEdit = async (formData: FormData, postId: number) => {
  try {
    const response = await privateApi(`/board/edit/${postId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
    console.log(response)
    if (response.data.state === 200) {
      return 200
    }
  } catch (error) {
    console.log(error)
  }
}
