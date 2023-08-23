import MobileMenu from '@src/components/MobileMenu'
import CommentLists from '@src/components/MyPage/CommentLists'
import Title from '@src/components/Title'
import { Mobile } from '@src/hooks/useScreenHook'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import Inner from '@src/components/Inner'
import Board from '@src/components/Board'
import { getMyPost, getWishlist } from '@src/api/authApi'

const MyPageDetail = () => {
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const { state }: { state: number } = useLocation()
  const [activeMenu, setActiveMenu] = useState<number>(state)
  const [posts, setPosts] = useState<POST_TYPE[]>([])
  const menuLists = ['양도', '좋아요', '댓글']
  const [wishlists, setWishlists] = useState([])

  const activeList = (activeMenu: number, screen: string) => {
    if (activeMenu === 0 && screen === 'mobile') {
      return <Board data={posts} message="글이 없습니다." />
    } else if (activeMenu === 1 && screen === 'mobile') {
      return <Board data={wishlists} message="글이 없습니다." />
    } else if (activeMenu === 2 && screen === 'mobile') {
      return <CommentLists screen="mobile" />
    } else if (activeMenu === 0 && screen === 'pc') {
      return <Board data={posts} message="글이 없습니다." />
    } else if (activeMenu === 1 && screen === 'pc') {
      return <Board data={wishlists} message="글이 없습니다." />
    } else if (activeMenu === 2 && screen === 'pc') {
      return <CommentLists screen="pc" />
    }
  }

  useEffect(() => {
    state && setActiveMenu(state)
    const fetchData = async () => {
      const postsResponse = await getMyPost(1)
      setPosts(postsResponse?.data)
      const wishlistResponse = await getWishlist(1)
      setWishlists(wishlistResponse?.data)
      setTotalPage(Math.ceil(wishlistResponse?.element / 10))
    }
    fetchData()
  }, [state])

  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })
  return (
    <>
      {isPC && (
        <Inner padding="64px 0">
          <Title screen="pc" name="작성 글 목록" />
          <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {activeList(activeMenu, 'pc')}
        </Inner>
      )}
      <Mobile>
        <Title screen="mobile" name="작성 글 목록" />
        <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {activeList(activeMenu, 'mobile')}
      </Mobile>
    </>
  )
}

export default MyPageDetail
