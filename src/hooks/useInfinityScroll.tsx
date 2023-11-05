import { getMainPostList } from '@src/api/boardApi'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useModal from './useModal'

const useInfinityScroll = ({ payload, page, setPostList, setPage }: IInfinityScrollProps) => {
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)
  const { openModal } = useModal()

  const getPostList = useCallback(
    async (payload: IMainListPayload, page: number) => {
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
      } catch (error) {
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['게시글 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'],
        })
      } finally {
        setIsLoading(false)
      }
    },
    [page, payload]
  )

  useEffect(() => {
    setPage(1)
    setPostList([])
  }, [payload])

  useEffect(() => {
    if (inView && !lastPage) {
      setPage((prev: number) => prev + 1)
    }
  }, [inView, lastPage])

  return { lastPage, isLoading, setPostList, getPostList, ref }
}

export default useInfinityScroll
