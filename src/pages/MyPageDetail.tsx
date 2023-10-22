import MobileMenu from '@src/components/Style/MobileMenu'
import CommentLists from '@src/components/MyPage/CommentLists'
import Title from '@src/components/Style/Title'
import { Mobile } from '@src/hooks/useScreenHook'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import Inner from '@src/components/Style/Inner'
import Board from '@src/components/Board'
import { getMyPost, getWishlist } from '@src/api/authApi'
import styled from 'styled-components'
import MBoardList from '@src/components/MyPage/MBoardList'
import ReactPaginate from 'react-paginate'
import { COLORS } from '@src/globalStyles'

const MyPageDetail = () => {
  const { state }: { state: number } = useLocation()
  const [activeMenu, setActiveMenu] = useState<number>(state)
  const [posts, setPosts] = useState<POST_TYPE[]>([])
  const [postTotalPage, setPostTotalPage] = useState<number>(1)
  const [wishTotalPage, setWishTotalPage] = useState<number>(1)
  const [wishlists, setWishlists] = useState<IWishlistType[]>([])
  const menuLists = ['양도', '좋아요', '댓글']

  const activeList = (activeMenu: number, screen: string) => {
    if (activeMenu === 0 && screen === 'mobile') {
      return (
        <>
          <PostContainer>
            {posts?.length ? (
              posts.map((post) => <MBoardList key={post.boardId} post={post} />)
            ) : (
              <NoData>작성한 게시물이 없습니다.</NoData>
            )}
          </PostContainer>
          {posts?.length > 0 && (
            <Paginate screen="mobile">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePage}
                breakLabel="..."
                pageCount={postTotalPage}
                className="paginate"
              />
            </Paginate>
          )}
        </>
      )
    } else if (activeMenu === 1 && screen === 'mobile') {
      return (
        <>
          <PostContainer>
            {wishlists?.length ? (
              wishlists.map((post) => <MBoardList key={post.boardId} post={post} />)
            ) : (
              <NoData>게시물이 없습니다.</NoData>
            )}
          </PostContainer>
          {wishlists?.length > 0 && (
            <Paginate screen="mobile">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePage}
                breakLabel="..."
                pageCount={wishTotalPage}
                className="paginate"
              />
            </Paginate>
          )}
        </>
      )
    } else if (activeMenu === 2 && screen === 'mobile') {
      return (
        <>
          <CommentLists screen="mobile" />
        </>
      )
    } else if (activeMenu === 0 && screen === 'pc') {
      return (
        <>
          <Board data={posts} message="작성한 게시글이 없습니다." />
          {posts?.length > 0 && (
            <Paginate screen="pc">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePage}
                breakLabel="..."
                pageCount={postTotalPage}
                className="paginate"
              />
            </Paginate>
          )}
        </>
      )
    } else if (activeMenu === 1 && screen === 'pc') {
      return (
        <>
          <Board data={wishlists} message="게시물이 없습니다." />{' '}
          {wishlists?.length > 0 && (
            <Paginate screen="pc">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePage}
                breakLabel="..."
                pageCount={wishTotalPage}
                className="paginate"
              />
            </Paginate>
          )}
        </>
      )
    } else if (activeMenu === 2 && screen === 'pc') {
      return (
        <>
          <CommentLists screen="pc" />
        </>
      )
    }
  }

  const postData = async (page = 1) => {
    try {
      const postsResponse = await getMyPost(page)
      setPosts(postsResponse?.data)
      setPostTotalPage(postsResponse?.totalPages)
    } catch (error) {
      console.log(error)
    }
  }
  const wishlistData = async (page = 1) => {
    try {
      const wishlistResponse = await getWishlist(page)
      setWishlists(wishlistResponse?.data)
      setWishTotalPage(wishlistResponse?.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(state === 0 || state === 1 || state === 2) && setActiveMenu(state)
    postData()
    wishlistData()
  }, [state])

  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })

  const handlePage = (event: { selected: number }) => {
    postData(event.selected + 1)
    wishlistData(event.selected + 1)
  }

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

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
`

const NoData = styled.div`
  display: flex;
  justify-content: center;
`

const Paginate = styled.div<StyleProps>`
  .paginate {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    color: ${COLORS.gray30};
    font-size: ${({ screen }) => (screen === 'pc' ? '20px' : '14px')};
    .previous {
      color: ${COLORS.green};
    }
    .next {
      color: ${COLORS.green};
    }
    .selected {
      color: ${COLORS.green};
    }
  }
`
