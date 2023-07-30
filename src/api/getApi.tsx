import { publicApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  if (new Date(values.startTime).getDate() === new Date(values.endTime).getDate()) {
    values.startTime = ''
    values.endTime = ''
  }
  console.log(values)

  return await publicApi
    .get(
      `/search/${page}?title=${values.title}&categoryName=${values.category}&startTime=${values.startTime}&endTime=${
        values.endTime
      }&districtNames=${values.district.join()}`
    )
    .then((res) => {
      console.log(res.data.data)
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
