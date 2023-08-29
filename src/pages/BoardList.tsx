import Board from '@src/components/Board'
import SearchForm from '@src/components/SearchForm'
import { useEffect, useState, useCallback } from 'react'
import { RootState } from '../store/config'
import { useSelector } from 'react-redux'
import { getSearchPostList } from '@src/api/boardApi'
import { useInView } from 'react-intersection-observer'

const BoardList = () => {
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const [ref, inView] = useInView()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const getPostList = useCallback(async () => {
    setIsLoading(true)
    const postData = await getSearchPostList(searchValue, page)
    setPostList((prevState) => [...prevState, ...postData.content])

    if (postData.last) setLastPage(true)
    else if (!postData.last) setLastPage(false)
    setIsLoading(false)
  }, [page])

  const changePostList = async () => {
    const postData = await getSearchPostList(searchValue, 1)
    setPostList(postData.content)

    if (postData.last) setLastPage(true)
    else if (!postData.last) setLastPage(false)
  }

  useEffect(() => {
    setPage(1)
    setLastPage(false)
    changePostList()
  }, [title, startDate, endDate, district, category, startTime, endTime, chkDate])

  useEffect(() => {
    if (page !== 1) {
      getPostList()
    }
  }, [getPostList])

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (inView && !isLoading && !lastPage) {
      setPage((prev) => prev + 1)
    }
  }, [inView, isLoading, lastPage])

  return (
    <>
      <SearchForm />
      <Board data={postList} message={'일치하는 조건의 게시글이 없습니다 !'} />
      <div ref={ref}></div>
    </>
  )
}

export default BoardList
