import Board from '@src/components/Board'
import Inner from '@src/components/Inner'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import MBoardList from '@src/components/MBoardList'
import { useState, useEffect } from 'react'
import { getUserPost } from '@src/api/authApi'
import { useLocation } from 'react-router'
import { useInView } from 'react-intersection-observer'

const Profile = () => {
  const { state } = useLocation()
  const { pathname } = useLocation()
  const memberName = state.memberName
  const memberId = pathname.slice(9)

  const [posts, setPosts] = useState<POST_TYPE[]>([])

  const [ref, inView] = useInView()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  const getPost = async () => {
    try {
      setIsLoading(true)
      const response = await getUserPost(page, memberId)
      if (page === 1) setPosts(response?.data)
      else setPosts((prev) => [...prev, ...response?.data])

      if (response?.lastPage) setLastPage(true)
      else setLastPage(false)
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPost()
  }, [page])

  useEffect(() => {
    if (inView && !isLoading && !lastPage) {
      console.log('페이지 추가')
      setPage((prev) => prev + 1)
    }
  }, [inView, isLoading])

  const isPC = useMediaQuery({ query: '(min-width: 834px' })
  return (
    <>
      {isPC ? (
        <Inner>
          <TopStyle screen="pc">
            <div className="title">
              <span>{memberName}</span> 님의 게시물
            </div>
            <RoleButton screen="pc">관리자 등록</RoleButton>
          </TopStyle>
          <Board data={posts} message={'작성한 게시물이 없습니다.'} />
        </Inner>
      ) : (
        <div>
          <TopStyle screen="mobile">
            <div className="title">
              <span>{memberName}</span> 님의 게시물
            </div>
            <RoleButton screen="mobile">관리자 등록</RoleButton>
          </TopStyle>
          <PostContainer>
            {posts?.length ? (
              posts.map((post) => <MBoardList key={post.boardId} post={post} />)
            ) : (
              <div>작성한 게시물이 없습니다.</div>
            )}
            <div ref={ref}></div>
          </PostContainer>
        </div>
      )}
    </>
  )
}

export default Profile

const TopStyle = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ screen }) => (screen === 'pc' ? '64px 0 32px 0' : '16px')};
  .title {
    font-size: ${({ screen }) => (screen === 'pc' ? FONT['pc-lg'] : FONT.pc)};
    span {
      font-weight: 700;
    }
  }
`

const RoleButton = styled.button<StyleProps>`
  color: ${COLORS.error};
  font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT.m)};
  width: ${({ screen }) => (screen === 'pc' ? '120px' : '100px')};
  height: ${({ screen }) => (screen === 'pc' ? '40px' : '32px')};
  padding: 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${COLORS.error};
  background-color: #fff;
`

const PostContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
`
