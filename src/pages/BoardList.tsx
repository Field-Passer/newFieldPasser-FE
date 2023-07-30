import Board from '@src/components/Board'
import SearchForm from '@src/components/SearchForm'
import { useEffect, useState, useCallback } from 'react'
import { RootState } from '../store/config'
import { useSelector } from 'react-redux'
import { getSearchPostList } from '@src/api/getApi'
import { useInView } from 'react-intersection-observer'

const BoardList = () => {
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  console.log(postList)
  const [ref, inView] = useInView()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const searchValue = useSelector((state: RootState) => {
    return {
      title: state.searchVlaue.title,
      startTime: state.searchVlaue.startDate.substr(0, 10) + 'T' + state.searchVlaue.startTime + ':00',
      endTime: state.searchVlaue.endDate.substr(0, 10) + 'T' + state.searchVlaue.endTime + ':59',
      district: state.searchVlaue.district,
      category: state.searchVlaue.category === '전체' ? '' : state.searchVlaue.category,
      startDate: state.searchVlaue.startTime,
      endDate: state.searchVlaue.endDate,
    }
  })

  const [title, startDate, endDate, district, category] = useSelector((state: RootState) => {
    return [state.searchVlaue.title, state.searchVlaue.startDate, state.searchVlaue.endDate, state.searchVlaue.district, state.searchVlaue.category]
  })

  const getPostList = useCallback(async () => {
    setIsLoading(true)
    try {
      const postData = await getSearchPostList(searchValue, page)
      if (page === 1) setPostList(postData.content)
      else setPostList(prevState => [...prevState, ...postData.content])

      if (postData.last) setLastPage(true)
      else if (!postData.last) setLastPage(false)

    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [page, title, startDate, endDate, district, category])

  useEffect(() => {
    getPostList()
  }, [getPostList]);

  useEffect(() => {
    setPage(1)
  }, [title, startDate, endDate, district, category])

  useEffect(() => {
    if (inView && !isLoading && !lastPage) {
      setPage((prev) => prev + 1)
    }
  }, [inView, isLoading]);

  return (
    <>
      <SearchForm />
      <Board data={postList} messege={'일치하는 조건의 게시글이 없습니다 !'} />
      <div ref={ref}></div>
    </>
  )
}

export default BoardList
