import Board from '@src/components/Board'
import { useState, useEffect, useCallback } from 'react'
import { getAdminBlind } from '@src/api/getApi'
import { useInView } from 'react-intersection-observer'

const BoradBlind = () => {
  const [blind, setBlind] = useState<POST_TYPE[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await getAdminBlind(page)
      if (page === 1) setBlind(response?.data)
      // eslint-disable-next-line no-unsafe-optional-chaining
      else setBlind((prev) => [...prev, ...response?.data])

      if (response?.last) setLastPage(true)
      else setLastPage(false)
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
    setPage(1)
  }, [])

  useEffect(() => {
    if (inView && !isLoading && !lastPage) {
      setPage((prev) => prev + 1)
    }
  }, [inView, isLoading])
  return (
    <>
      <Board data={blind} message={'일치하는 조건의 게시글이 없습니다!'} />
      {!isLoading && <div ref={ref}></div>}
    </>
  )
}

export default BoradBlind
