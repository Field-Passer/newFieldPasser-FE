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
import { useInView } from 'react-intersection-observer'

const MyPageDetail = () => {
  const [ref, inView] = useInView()
  const [postPage, setPostPage] = useState<number>(1)
  const [postLastPage, setPostLastPage] = useState<boolean>(false)
  const [wishlistPage, setWishlistPage] = useState<number>(1)
  const [wishlistLastPage, setWishilistLastPage] = useState<boolean>(false)
  const { state }: { state: number } = useLocation()
  const [activeMenu, setActiveMenu] = useState<number>(state)
  const [posts, setPosts] = useState<POST_TYPE[]>([])
  const [wishlists, setWishlists] = useState<IWishlistType[]>([])
  const menuLists = ['양도', '좋아요', '댓글']

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
    const postData = async () => {
      try {
        const postsResponse = await getMyPost(postPage)
        if (postPage === 1) setPosts(postsResponse?.data)
        else setPosts((prev) => [...prev, ...postsResponse?.data])
        setPostLastPage(postsResponse?.lastPage)
      } catch (error) {
        console.log(error)
      }
    }
    const wishlistData = async () => {
      try {
        const wishlistResponse = await getWishlist(1)
        if (wishlistPage === 1) setWishlists(wishlistResponse?.data)
        else setWishlists((prev) => [...prev, ...wishlistResponse?.data])
        setWishilistLastPage(wishlistResponse?.lastPage)
      } catch (error) {
        console.log(error)
      }
    }
    postData()
    wishlistData()
  }, [state, postPage, wishlistPage])

  useEffect(() => {
    if (inView && !postLastPage) {
      console.log('페이지 추가')
      setPostPage((prev) => prev + 1)
    }
    if (inView && !wishlistLastPage) {
      setWishlistPage((prev) => prev + 1)
    }
  }, [inView])
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
          <div ref={ref}></div>
        </Inner>
      )}
      <Mobile>
        <Title screen="mobile" name="작성 글 목록" />
        <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {activeList(activeMenu, 'mobile')}
        <div ref={ref}></div>
      </Mobile>
    </>
  )
}

export default MyPageDetail
