import { dateCalcFn } from '@src/components/SearchForm'
import { publicApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  if (new Date(values.startTime).getDate() === dateCalcFn().getDate()) {
    values.startTime = ''
    values.endTime = ''
    console.log('이전 날짜임')
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
