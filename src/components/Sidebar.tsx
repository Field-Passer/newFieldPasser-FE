import { userLogout } from '@src/api/authApi'
import { COLORS, FONT } from '@src/globalStyles'
import { removeCookieToken } from '@src/storage/Cookie'
import { RootState } from '@src/store/config'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

type PropsType = {
  sideOpen: boolean
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ sideOpen, setSideOpen }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const navigate = useNavigate()

  const closeSidebar = () => {
    setSideOpen(false)
  }

  const dispatch = useDispatch()

  const authenticated = useSelector((state: RootState) => state.accessToken.authenticated) // 스토어에 저장된 로그인 상태

  const logoutHandler = async () => {
    const { status }: any = await userLogout()
    if (status === 200) {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      alert('로그아웃 되었습니다.')
      return navigate('/')
    }
  }

  const clickWithoutLogin = () => {
    navigate('/login')
    alert('로그인 후 이용 가능합니다.')
  }

  return (
    <>
      {!isMobile && closeSidebar()}
      <SideContainer id="sidebar" className={sideOpen && isMobile ? 'open' : ''}>
        <FirstSection>
          <div>
            <img
              src="/close.svg"
              alt="닫기"
              className="close"
              onClick={() => {
                closeSidebar()
              }}
            />
          </div>
          <div>
            <Link to="/" onClick={() => closeSidebar()}>
              <img src="/logo.png" alt="로고" className="logo" />
            </Link>
          </div>
          {authenticated ? (
            <>
              <div className="name">
                <span>필드패서</span>
                <span>님</span>
              </div>
              <Link to="/board_form">
                <button
                  onClick={() => {
                    closeSidebar()
                  }}
                >
                  양도하기
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="name">
                <span>로그인하고 양도하기!</span>
              </div>
              <div className="not-member">
                <Link to="/login">
                  <button
                    className="login"
                    onClick={() => {
                      closeSidebar()
                    }}
                  >
                    로그인
                  </button>
                </Link>
                <Link to="/join">
                  <button
                    className="join"
                    onClick={() => {
                      closeSidebar()
                    }}
                  >
                    회원가입
                  </button>
                </Link>
              </div>
            </>
          )}
        </FirstSection>
        <MiddleSection>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/mypage') : clickWithoutLogin()
            }}
          >
            <img src="/my_page.svg" alt="마이페이지" />
            <span>마이페이지</span>
          </div>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/mypage') : clickWithoutLogin()
            }}
          >
            <img src="/my_heart.svg" alt="내 좋아요 목록" />
            <span>내 좋아요 목록</span>
          </div>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/mypage') : clickWithoutLogin()
            }}
          >
            <img src="/my_comment.svg" alt="내가 남긴 댓글" />
            <span>내가 남긴 댓글</span>
          </div>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/mypage') : clickWithoutLogin()
            }}
          >
            <img src="/my_post.svg" alt="나의 양도글" />
            <span>나의 양도글</span>
          </div>
        </MiddleSection>
        <MiddleSection>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/help') : clickWithoutLogin()
            }}
          >
            <span>고객센터</span>
          </div>
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              authenticated ? navigate('/mypage') : clickWithoutLogin()
            }}
          >
            1:1 문의하기
          </div>
        </MiddleSection>
        {authenticated && (
          <LastSection>
            <div
              onClick={() => {
                logoutHandler()
              }}
            >
              로그아웃
            </div>
            <div className="blur" onClick={() => console.log('회원탈퇴')}>
              회원탈퇴
            </div>
          </LastSection>
        )}
      </SideContainer>
    </>
  )
}

const SideContainer = styled.div`
  position: fixed;
  width: 240px;
  height: 100%;
  padding: 32px 0;
  border-right: 1px solid ${COLORS.gray20};
  font-size: ${FONT.m};
  z-index: 1000;
  background-color: white;
  left: -150%;
  transition: 0.3s ease;

  &.open {
    left: 0;
  }
`
const FirstSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-bottom: 1px solid ${COLORS.gray20};
  padding: 0 16px 32px;

  .name {
    display: flex;
    gap: 8px;
    font-size: ${FONT['m-lg']};
  }

  .logo {
    width: 116px;
  }

  .close {
    width: 24px;
    cursor: pointer;
  }

  button {
    width: 208px;
    height: 32px;
    background-color: ${COLORS.green};
    color: #fff;
    border-radius: 8px;
    font-size: ${FONT['m-lg']};

    :hover {
      background-color: black;
    }
  }

  .not-member {
    display: flex;
    gap: 8px;

    button {
      width: 100px;
    }

    .login {
      background-color: white;
      color: ${COLORS.green};
      border: 1px solid ${COLORS.green};
    }
  }
`
const MiddleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  border-bottom: 1px solid ${COLORS.gray20};

  .block {
    display: flex;
    gap: 10px;
    line-height: 20px;
    cursor: pointer;

    :hover {
      font-weight: 900;
    }
  }
`
const LastSection = styled.section`
  position: fixed;
  width: 240px;
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  border-top: 1px solid ${COLORS.gray20};

  div {
    cursor: pointer;
  }

  .blur {
    color: ${COLORS.gray40};
  }

  :hover {
    font-weight: 900;
  }
`

export default Sidebar
