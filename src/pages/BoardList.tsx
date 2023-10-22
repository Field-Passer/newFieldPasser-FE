import Board from '@src/components/Board'
import SearchForm from '@src/components/SearchForm'
import { useEffect, useState } from 'react'
import { RootState } from '../store/config'
import { useSelector } from 'react-redux'
import useInfinityScroll from '@src/hooks/useInfinityScroll'
import Loading from '@src/components/common/loading'

const BoardList = () => {
  const searchValue = useSelector((state: RootState) => {
    return {
      title: state.searchVlaue.title,
      startTime: state.searchVlaue.startDate.substring(0, 10) + 'T' + state.searchVlaue.startTime + ':00',
      endTime: state.searchVlaue.endDate.substring(0, 10) + 'T' + state.searchVlaue.endTime + ':59',
      district: state.searchVlaue.district,
      category: state.searchVlaue.category === '전체' ? '' : state.searchVlaue.category,
      startDate: state.searchVlaue.startDate,
      endDate: state.searchVlaue.endDate,
      chkDate: state.searchVlaue.chkDate,
    }
  })

  const [title, startDate, endDate, district, category, startTime, endTime, chkDate] = useSelector(
    (state: RootState) => {
      return [
        state.searchVlaue.title,
        state.searchVlaue.startDate,
        state.searchVlaue.endDate,
        state.searchVlaue.district,
        state.searchVlaue.category,
        state.searchVlaue.startTime,
        state.searchVlaue.endTime,
        state.searchVlaue.chkDate,
      ]
    }
  )

  const [payload, setPayload] = useState({})

  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const { isLoading, getPostList, ref } = useInfinityScroll({ payload, page, setPostList, setPage })

  useEffect(() => {
    setPayload({
      title: searchValue.title,
      districtNames: searchValue.district.join(),
      startTime: searchValue.chkDate ? searchValue.startTime : '',
      endTime: searchValue.chkDate ? searchValue.endTime : '',
      categoryName: searchValue.category,
    })
  }, [title, startDate, endDate, district, category, startTime, endTime, chkDate])

  useEffect(() => {
    if (Object.keys(payload).length !== 0) getPostList(payload, page)
  }, [page, payload])

  return (
    <>
      <SearchForm />
      <Board data={postList} message={'일치하는 조건의 게시글이 없습니다.'} />
      {!isLoading && <div ref={ref}></div>}
      {isLoading && <Loading />}
    </>
  )
}

export default BoardList
