import Board from '@src/components/Board'
import Inner from '@src/components/Style/Inner'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import MBoardList from '@src/components/MyPage/MBoardList'
import { useState, useEffect } from 'react'
import { getUserPost } from '@src/api/userApi'
import { useLocation } from 'react-router'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store/config'
import { promoteUser, demoteUser } from '@src/api/userApi'
import useModal from '@src/hooks/useModal'

const Profile = () => {
  const { pathname } = useLocation()
  const memberId = pathname.slice(9)
  const { openModal } = useModal()

  const [posts, setPosts] = useState<POST_TYPE_INFO[]>([])

  const [ref, inView] = useInView()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)
  const [memberName, setMemberName] = useState('')

  const getPost = async () => {
    try {
      setIsLoading(true)
      const response = await getUserPost(page, memberId)
      setMemberName(response?.data[0].memberName)
      if (page === 1) {
        setPosts(response?.data)
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
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
    if (inView && !lastPage) {
      setPage((prev) => prev + 1)
    }
  }, [inView, lastPage])

  const isPC = useMediaQuery({ query: '(min-width: 834px' })

  const userInfo = useSelector((state: RootState) => state.userInfo)

  // 회원 상태 확인
  const checkRole = (role: string) => {
    if (role === 'USER') {
      return (
        <RoleButton screen="pc" onClick={() => promoteFn(posts[0].memberRole)}>
          관리자 등록
        </RoleButton>
      )
    } else {
      return (
        <RoleButton screen="pc" onClick={() => promoteFn(posts[0].memberRole)}>
          관리자 해제
        </RoleButton>
      )
    }
  }

  // 등급 조정 함수
  const promoteFn = (role: string) => {
    if (role === 'USER') {
      openModal({
        isModalOpen: true,
        isConfirm: true,
        content: ['관리자로 승급하시겠습니까?'],
        confirmAction: () => {
          promoteUser(memberId)
        },
      })
    } else {
      openModal({
        isModalOpen: true,
        isConfirm: true,
        content: ['일반회원으로 승급하시겠습니까?'],
        confirmAction: () => {
          demoteUser(memberId)
        },
      })
    }
  }

  return (
    <>
      {isPC ? (
        <Inner>
          <TopStyle screen="pc">
            <div className="title">
              <span>{memberName.length > 0 ? memberName : '필드패서'}</span> 님의 게시물
            </div>
            {userInfo.role === '관리자' && checkRole(posts[0]?.memberRole)}
          </TopStyle>
          <Board data={posts} message={'작성한 게시물이 없습니다.'} />
          {!isLoading && <div ref={ref}></div>}
        </Inner>
      ) : (
        <div>
          <TopStyle screen="mobile">
            <div className="title">
              <span>{memberName.length > 0 ? memberName : '필드패서'}</span> 님의 게시물
            </div>
            {userInfo.role === '관리자' && checkRole(posts[0]?.memberRole)}
          </TopStyle>
          <PostContainer>
            {posts?.length ? (
              posts.map((post) => <MBoardList key={post.boardId} post={post} />)
            ) : (
              <div>작성한 게시물이 없습니다.</div>
            )}
            {!isLoading && <div ref={ref}></div>}
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
