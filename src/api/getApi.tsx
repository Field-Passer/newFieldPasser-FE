import { publicApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  console.log(values)
  values.startTime = ''
  values.endTime = ''

  return await publicApi
    .get(
      `/search/${page}?title=${values.title}&categoryName=${values.category}&startTime=${values.startTime}&endTime=${values.endTime
      }&districtNames=${values.district.join()}`
    )
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
