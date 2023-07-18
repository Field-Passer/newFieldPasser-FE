import { privateApi } from './Instance'

//게시글 작성
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
