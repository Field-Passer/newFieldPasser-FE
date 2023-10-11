import { getMainPostList } from '@src/api/boardApi'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const useInfinityScroll = (payload: IMainListPayload, page: number, setPage, setPostList) => {
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  const getPostList = useCallback(
    async (payload, page) => {
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
        console.log(isLoading)
      }
    },
    [page, payload]
  )

  return { lastPage, isLoading, setPostList, getPostList, ref, inView }
}

export default useInfinityScroll
