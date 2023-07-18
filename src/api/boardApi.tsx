import axios from 'axios'
import { privateApi, publicApi } from './Instance'
import store from '@src/store/config'

//게시글 작성
export const requestWrite = async (formData: FormData) => {
  // // privateApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'

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
