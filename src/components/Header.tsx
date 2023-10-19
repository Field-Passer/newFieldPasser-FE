import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import { Mobile } from '@src/hooks/useScreenHook'
import type { RootState } from '@src/store/config'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@src/api/userApi'
import { getCookieToken } from '@src/storage/Cookie'
import { useEffect } from 'react'
import { SET_INFO, DELETE_INFO } from '@src/store/slices/infoSlice'
import PATH from '@src/constants/pathConst'
import { HamburgerIcon } from '@src/constants/icons'
import { OPEN_SIDEBAR } from '@src/store/slices/sidebarSlice'
import useLoginState from '@src/hooks/useLoginState'

const Header = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const openSidebar = () => {
    dispatch(OPEN_SIDEBAR())
  }
  const authenticated = useSelector((state: RootState) => state.accessToken.authenticated)
  const userRole = useSelector((state: RootState) => state.userInfo.role)
  const refreshToken = getCookieToken()
  const { accessAfterLoginAlert, logoutHandler } = useLoginState()

  useEffect(() => {
    const fetchData = async () => {
      if (refreshToken) {
        const response = await getUserInfo()
        dispatch(SET_INFO(response?.data))
      } else if (!refreshToken) {
        dispatch(DELETE_INFO())
      }
    }
    fetchData()
  }, [refreshToken])

  return (
    <>
      <Mobile>
        <MContainer>
          <div
            className="sidebar"
            onClick={() => {
              openSidebar()
            }}
          >
            <HamburgerIcon />
          </div>
          <img src="/logo.png" alt="logo" onClick={() => navigate(PATH.HOME)} />
        </MContainer>
      </Mobile>
      {!isMobile && (
        <Container>
          <Inner>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="logo" />
            </Link>
            <div className="menu">
              {authenticated && userRole === '관리자' && <Link to={PATH.BOARD_BLIND}>게시글 관리</Link>}
              <Link to="/help">고객센터</Link>
              {authenticated && <Link to={PATH.MYPAGE}>마이페이지</Link>}
              {!authenticated && <Link to={PATH.JOIN}>회원가입</Link>}
              {authenticated && <Link to={PATH.ASK}>1:1 문의</Link>}
              {authenticated ? <a onClick={logoutHandler}>로그아웃</a> : <Link to="/login">로그인</Link>}
              <button
                onClick={() => {
                  {
                    authenticated ? navigate(PATH.WRITE_POST) : accessAfterLoginAlert()
                  }
                }}
              >
                양도하기
              </button>
            </div>
          </Inner>
        </Container>
      )}
    </>
  )
}

const MContainer = styled.header`
  height: 48px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: white;
  border-bottom: 1px solid ${COLORS.gray20};

  .logo {
    width: 160px;
    height: 24px;
  }

  .sidebar {
    svg {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 12px;
      left: 16px;
      cursor: pointer;
    }
  }

  img {
    width: 160px;
    margin: auto auto;
    cursor: pointer;
  }
`

const Container = styled.header`
  padding: 12px 20px;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLORS.gray20};
`
const Inner = styled.div`
  max-width: var(--screen-pc);
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  .logo {
    margin: auto 0;
    cursor: pointer;
    img {
      width: 160px;
      height: 24px;
    }
  }

  .menu {
    display: flex;
    gap: 20px;
    height: 32px;
    align-items: center;
    font-size: 15px;
    gap: 10px;

    button {
      width: 100px;
      height: 32px;
      font-size: 15px;
      background-color: ${COLORS.green};
      color: white;
    }

    a {
      cursor: pointer;
    }
  }
`

export default Header
