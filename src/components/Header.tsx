import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import { Mobile } from '@src/hooks/useScreenHook'
import { FiMenu } from 'react-icons/fi'
import type { RootState } from '@src/store/config'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '@src/api/authApi'
import { removeCookieToken } from '@src/storage/Cookie'
type PropsType = {
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ setSideOpen }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const navigate = useNavigate()
  const openSidebar = () => {
    setSideOpen(true)
  }
  const dispatch = useDispatch()

  const authenticated = useSelector((state: RootState) => state.accessToken.authenticated) // 스토어에 저장된 로그인 상태

  const logoutHandler = async () => {
    const { status }: any = await userLogout()
    if (status === 200) {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      return navigate('/login')
    }
  }

  const clickWithoutLogin = () => {
    navigate('/login')
    alert('로그인 후 이용 가능합니다.')
  }

  return (
    <>
      <Mobile>
        <MContainer>
          <FiMenu
            onClick={() => {
              openSidebar()
            }}
            className="sidebar"
          />
          <img src="/logo.png" alt="logo" onClick={() => navigate('/')} />
        </MContainer>
      </Mobile>
      {!isMobile && (
        <Container>
          <Inner>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="필드패서" />
            </Link>
            <div className="menu">
              <Link to="/help">고객센터</Link>
              {authenticated && <Link to="/mypage">마이페이지</Link>}
              {!authenticated && <Link to="/join">회원가입</Link>}
              {authenticated ? <a onClick={logoutHandler}>로그아웃</a> : <Link to="/login">로그인</Link>}
              <button
                onClick={() => {
                  {
                    authenticated ? navigate('/write') : clickWithoutLogin()
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

  .sidebar {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 12px;
    left: 16px;
    cursor: pointer;
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
