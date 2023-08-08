import { publicApi, privateApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  if (values.startTime.slice(0, 10) === values.endTime.slice(0, 10)) {
    values.startTime = ''
    values.endTime = ''
  }

  return await publicApi
    .get(
      `/search/${page}?title=${values.title}&categoryName=${values.category}&startTime=${values.startTime}&endTime=${
        values.endTime
      }&districtNames=${values.district.join()}`
    )
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getPostDetail = async (userId: number) => {
  return await privateApi
    .get(`/detail/${userId}`)
    .then((res) => {
      console.log(res.data.data)
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

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
