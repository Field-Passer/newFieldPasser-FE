import Board from '@src/components/Board'
import SearchForm from '@src/components/SearchForm'
import { useEffect, useRef, useState, useCallback } from 'react'
import { RootState } from '../store/config'
import { useSelector } from 'react-redux'
import { getSearchPostList } from '@src/api/getApi'

const BoardList = () => {
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const [page, setPage] = useState(1)
  const preventRef = useRef(true) // 옵저버 중복 실행 방지
  const endRef = useRef(false) // 모든 글 로드 확인
  const target = useRef<HTMLDivElement>(null)

  const searchValue = useSelector((state: RootState) => {
    return {
      title: state.searchVlaue.title,
      startTime: state.searchVlaue.date.substr(0, 10) + 'T' + state.searchVlaue.startTime + ':00',
      endTime: state.searchVlaue.date.substr(0, 10) + 'T' + state.searchVlaue.endTime + ':59',
      district: state.searchVlaue.district,
      category: state.searchVlaue.category === '전체' ? '' : state.searchVlaue.category,
      date: state.searchVlaue.date,
    }
  })

  const title = useSelector((state: RootState) => {
    return state.searchVlaue.title
  })
  const date = useSelector((state: RootState) => {
    return state.searchVlaue.date
  })
  const distruct = useSelector((state: RootState) => {
    return state.searchVlaue.district
  })
  const category = useSelector((state: RootState) => {
    return state.searchVlaue.category
  })

  const getPostList = async (page: number) => {
    try {
      const postData = await getSearchPostList(searchValue, page)
      if (page === 1) setPostList(postData.content)
      else setPostList([...postList, ...postData.content])

      preventRef.current = true
      if (postData.last) endRef.current = true
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setPage(1)
    getPostList(page)
    endRef.current = false
    preventRef.current = true
  }, [title, date, distruct, category])

  // useEffect(() => {
  //   if (page !== 1) getPostList(page)
  //   preventRef.current = true
  // }, [page])

  // useEffect(() => {
  //   //옵저버 생성
  //   const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 })
  //   if (target.current) observer.observe(target.current)
  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [])

  // const obsHandler = (entries: IntersectionObserverEntry[]) => {
  //   const target = entries[0]
  //   if (!endRef.current && target.isIntersecting && preventRef.current) {
  //     preventRef.current = false
  //     setPage((prev) => prev + 1)
  //   }
  // }

  return (
    <>
      <SearchForm />
      <Board data={postList} messege={'일치하는 조건의 게시글이 없습니다 !'} />
      <div ref={target}></div>
    </>
  )
}

export default BoardList
