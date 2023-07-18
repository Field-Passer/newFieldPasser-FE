import { dateCalcFn } from '@src/components/SearchForm'
import { publicApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  if (new Date(values.startTime).getDate() === dateCalcFn().getDate()) {
    values.startTime = ''
    values.endTime = ''
  }
  console.log(values)

  return await publicApi
    .get(
      `/search/${page}?title=${values.title}&categoryName=${values.category}&startTime=${values.startTime}&endTime=${values.endTime}&districtIds=${values.district}`
    )
    .then((res) => {
      return res.data.data.content
    })
    .catch((err) => {
      console.log(err)
    })
}
