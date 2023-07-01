import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

type PropsType = {
  sideOpen: boolean
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ sideOpen, setSideOpen }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 450px)',
  })

  const closeSidebar = () => {
    setSideOpen(false)
  }

  return (
    <>
      {!isMobile && closeSidebar()}
      <SideContainer className={sideOpen && isMobile ? 'open' : ''}>
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
            <Link to="/">
              <img src="/logo.png" alt="로고" className="logo" />
            </Link>
          </div>
          <div className="name">
            <span>로그인하고 양도하기!</span>
          </div>
          {/* <div className="name">
          <span>필드패서</span>
          <span>님</span>
        </div> */}
          {/* <Link to="/board_form">
          <button
          onClick={() => {
            closeSidebar()
          }}
          >
          양도하기
          </button>
        </Link> */}
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
        </FirstSection>
        <MiddleSection>
          <Link
            to="/mypage"
            className="block"
            onClick={() => {
              closeSidebar()
            }}
          >
            <img src="/my_page.svg" alt="마이페이지" />
            <span>마이페이지</span>
          </Link>
          <Link
            to="/mypage"
            className="block"
            onClick={() => {
              closeSidebar()
            }}
          >
            <img src="/my_heart.svg" alt="내 좋아요 목록" />
            <span>내 좋아요 목록</span>
          </Link>
          <Link
            to="/mypage"
            className="block"
            onClick={() => {
              closeSidebar()
            }}
          >
            <img src="/my_comment.svg" alt="내가 남긴 댓글" />
            <span>내가 남긴 댓글</span>
          </Link>
          <Link
            to="/mypage"
            className="block"
            onClick={() => {
              closeSidebar()
            }}
          >
            <img src="/my_post.svg" alt="나의 양도글" />
            <span>나의 양도글</span>
          </Link>
        </MiddleSection>
        <MiddleSection>
          <Link
            to="/help"
            onClick={() => {
              closeSidebar()
            }}
          >
            <span>고객센터</span>
          </Link>
          <Link
            to="/mypage"
            onClick={() => {
              closeSidebar()
            }}
          >
            1:1 문의하기
          </Link>
        </MiddleSection>
        <LastSection>
          <div onClick={() => console.log('로그아웃')}>로그아웃</div>
          <div className="blur" onClick={() => console.log('회원탈퇴')}>
            회원탈퇴
          </div>
        </LastSection>
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
  z-index: 10;
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

  :hover {
    font-weight: 900;
  }

  .block {
    display: flex;
    gap: 10px;
    line-height: 20px;
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
