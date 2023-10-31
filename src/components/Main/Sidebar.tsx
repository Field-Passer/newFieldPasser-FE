import { COLORS, FONT } from '@src/globalStyles'
import { getCookieToken } from '@src/storage/Cookie'
import { RootState } from '@src/store/config'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import PATH from '@src/constants/pathConst'
import useSidebar from '@src/hooks/useSidebar'
import useLoginState from '@src/hooks/useLoginState'
import { BoldCloseIcon, MyCommentIcon, MyHeartIcon, MyPageIcon, MyPostIcon } from '@src/constants/icons'
import { userWithdrawal } from '@src/api/authApi'
import useModal from '@src/hooks/useModal'

const Sidebar = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const navigate = useNavigate()
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar)
  const { closeSidebar } = useSidebar()
  const { accessAfterLoginAlert, logoutHandler } = useLoginState()
  const { openModal } = useModal()

  useEffect(() => {
    if (!isMobile) {
      closeSidebar()
    }
  }, [isMobile])

  const userName = useSelector((state: RootState) => state.userInfo.memberName)
  const userRole = useSelector((state: RootState) => state.userInfo.role)
  const refreshToken = getCookieToken()

  const deleteAccount = async () => {
    try {
      const response = await userWithdrawal()
      if (response.status === 200) {
        logoutHandler()
        openModal({
          isModalOpen: true,
          isConfirm: false,
          content: ['회원탈퇴에 성공했습니다.'],
          navigateOption: PATH.HOME,
        })
      }
    } catch (error) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['회원탈퇴에 실패했습니다. 고객센터로 문의해주세요.'],
      })
    }
  }

  return (
    <SideContainer id="sidebar" className={isSidebarOpen && isMobile ? 'open' : ''}>
      <FirstSection>
        <div
          className="close"
          onClick={() => {
            closeSidebar()
          }}
        >
          <BoldCloseIcon />
        </div>
        <div>
          <Link to={PATH.HOME} onClick={() => closeSidebar()}>
            <img src="/logo.webp" alt="로고" className="logo" />
          </Link>
        </div>
        {refreshToken ? (
          <>
            <div className="name">
              <span>{userName}</span>
              <span>님</span>
            </div>
            <Link to={PATH.WRITE_POST}>
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
              <Link to={PATH.LOGIN}>
                <button
                  className="login"
                  onClick={() => {
                    closeSidebar()
                  }}
                >
                  로그인
                </button>
              </Link>
              <Link to={PATH.JOIN}>
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
            refreshToken ? navigate(PATH.MYPAGE) : accessAfterLoginAlert()
          }}
        >
          <MyPageIcon />
          <span>마이페이지</span>
        </div>
        <div
          className="block"
          onClick={() => {
            closeSidebar()
            refreshToken ? navigate(PATH.MYPAGE_DETAIL, { state: 1 }) : accessAfterLoginAlert()
          }}
        >
          <MyHeartIcon />
          <span>내 좋아요 목록</span>
        </div>
        <div
          className="block"
          onClick={() => {
            closeSidebar()
            refreshToken ? navigate(PATH.MYPAGE_DETAIL, { state: 2 }) : accessAfterLoginAlert()
          }}
        >
          <MyCommentIcon />
          <span>내가 남긴 댓글</span>
        </div>
        <div
          className="block"
          onClick={() => {
            closeSidebar()
            refreshToken ? navigate(PATH.MYPAGE_DETAIL, { state: 0 }) : accessAfterLoginAlert()
          }}
        >
          <MyPostIcon />
          <span>나의 양도글</span>
        </div>
      </MiddleSection>
      <MiddleSection>
        <div
          className="block"
          onClick={() => {
            closeSidebar()
            refreshToken ? navigate(PATH.HELP) : accessAfterLoginAlert()
          }}
        >
          <span>고객센터</span>
        </div>
        <div
          className="block"
          onClick={() => {
            closeSidebar()
            refreshToken ? navigate(PATH.ASK) : accessAfterLoginAlert()
          }}
        >
          1:1 문의하기
        </div>
        {userRole === '관리자' && (
          <div
            className="block"
            onClick={() => {
              closeSidebar()
              navigate(PATH.BOARD_BLIND)
            }}
          >
            게시글 관리
          </div>
        )}
      </MiddleSection>
      {refreshToken && (
        <LastSection>
          <div
            onClick={() => {
              logoutHandler()
            }}
          >
            로그아웃
          </div>
          <div className="blur" onClick={() => deleteAccount()}>
            회원탈퇴
          </div>
        </LastSection>
      )}
    </SideContainer>
  )
}

const SideContainer = styled.div`
  position: fixed;
  width: 240px;
  height: 100%;
  padding: 32px 0;
  border-right: 1px solid ${COLORS.gray20};
  font-size: ${FONT.m};
  z-index: 100;
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
    width: 132px;
    height: 20px;
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
