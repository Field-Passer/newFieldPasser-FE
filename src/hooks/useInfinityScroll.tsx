import { getMainPostList } from '@src/api/boardApi'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const useInfinityScroll = (payload: IMainListPayload) => {
  const [ref, inView] = useInView()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)
  const [postList, setPostList] = useState<POST_TYPE[]>([])

  const getPostList = useCallback(async () => {
    try {
      setIsLoading(true)
      const postData = await getMainPostList(payload, page)
      if (!postData) {
        setLastPage(true)
        setPostList([])
        return setIsLoading(false)
      }
      setPostList((prevList) => [...prevList, ...postData.content])
      postData.last ? setLastPage(true) : setLastPage(false)
      console.log('post', page)
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, payload])

  useEffect(() => {
    setPostList([])
    getPostList()
    setPage(1)
  }, [payload])

  useEffect(() => {
    if (inView && !lastPage) {
      setPage((prev) => prev + 1)
    }
  }, [inView, lastPage])

  return { ref, page, isLoading, postList, setPostList }
}

export default useInfinityScroll
