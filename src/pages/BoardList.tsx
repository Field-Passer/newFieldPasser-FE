import Board from '@src/components/Board'
import SearchForm from '@src/components/SearchForm'
import { useEffect, useState } from 'react'
import { RootState } from '../store/config'
import { useSelector } from 'react-redux'
import { getSearchPostList } from '@src/api/getApi'

const BoardList = () => {
  const [postList, setPostList] = useState<POST_TYPE[]>([])

  const searchValue = useSelector((state: RootState) => {
    return {
      title: state.searchVlaue.title,
      startTime: state.searchVlaue.date.substr(0, 10) + 'T' + state.searchVlaue.startTime + ':00',
      endTime: state.searchVlaue.date.substr(0, 10) + 'T' + state.searchVlaue.endTime + ':59',
      district: state.searchVlaue.district,
      category: state.searchVlaue.category === '전체' ? '' : state.searchVlaue.category + '장',
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

  useEffect(() => {
    const getPostList = async () => {
      try {
        const postData = await getSearchPostList(searchValue)
        setPostList(postData)
      } catch (err) {
        console.log(err)
      }
    }
    getPostList()
  }, [title, date, distruct, category])

  return (
    <>
      <SearchForm />
      <Board data={postList} messege={'일치하는 조건의 게시글이 없습니다 !'} />
    </>
  )
}

export default BoardList
