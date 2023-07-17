import axios from 'axios'
import { privateApi, publicApi } from './Instance'

//게시글 작성
export const requestWrite = async (formData: FormData) => {
  // privateApi.defaults.headers.common['Content-Type'] = 'application/json'

  const entries = formData.entries()
  for (const pair of entries) {
    console.log(pair[0] + ', ' + pair[1])
  }

  try {
    const response = await privateApi('/board/register', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
    console.log(response)
    // return response.state===200 ? alert('작성완료) : alert('작성실패)
  } catch (error) {
    console.log(error)
    return {
      //message: error,
    }
  }
}
