import axios from 'axios'
import { privateApi, publicApi } from './Instance'
import store from '@src/store/config'

//게시글 작성
export const requestWrite = async (formData: FormData) => {
  // // privateApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'

  const entries = formData.entries()
  for (const pair of entries) {
    console.log(pair[0] + ', ' + pair[1])
  }

  // try {
  //   const response = await privateApi('/board/register', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //     data: formData,
  //   })
  //   console.log(response)
  //   // return response.state===200 ? alert('작성완료) : alert('작성실패)
  // } catch (error) {
  //   console.log(error)
  //   return {
  //     //message: error,
  //   }
  // }

  const access_token = store.getState().accessToken.accessToken
  try {
    const res = await fetch('https://field-passer.store/board/register', {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}` },
      body: formData,
    })
    const response = await res.json()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
