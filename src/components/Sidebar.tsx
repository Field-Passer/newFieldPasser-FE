import { COLORS, FONT } from '@src/globalStyles'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <SideContainer>
      <FirstSection>
        <div
          onClick={() => {
            console.log('사이드바 닫기')
          }}
        >
          <img src="/close.svg" alt="닫기" className="close" />
        </div>
        <div>
          <Link to="/">
            <img src="/logo.png" alt="로고" className="logo" />
          </Link>
        </div>
        <div className="name">
          <span>필드패서</span>
          <span>님</span>
        </div>
        <Link to="/board_form">
          <button>양도하기</button>
        </Link>
      </FirstSection>
      <MiddleSection>
        <Link to="/mypage" className="block">
          <img src="/my_page.svg" alt="마이페이지" />
          <span>마이페이지</span>
        </Link>
        <Link to="/mypage" className="block">
          <img src="/my_heart.svg" alt="내 좋아요 목록" />
          <span>내 좋아요 목록</span>
        </Link>
        <Link to="/mypage" className="block">
          <img src="/my_comment.svg" alt="내가 남긴 댓글" />
          <span>내가 남긴 댓글</span>
        </Link>
        <Link to="/mypage" className="block">
          <img src="/my_post.svg" alt="나의 양도글" />
          <span>나의 양도글</span>
        </Link>
      </MiddleSection>
      <MiddleSection>
        <Link to="/help">
          <span>고객센터</span>
        </Link>
        <Link to="/mypage">1:1 문의하기</Link>
      </MiddleSection>
      <LastSection>
        <div onClick={() => console.log('로그아웃')}>로그아웃</div>
        <div className="blur" onClick={() => console.log('회원탈퇴')}>
          회원탈퇴
        </div>
      </LastSection>
    </SideContainer>
  )
}

const SideContainer = styled.div`
  position: relative;
  width: 240px;
  height: 100%;
  padding: 32px 0;
  border-right: 1px solid ${COLORS.gray20};
  font-size: ${FONT.m};
  z-index: 10;
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
    border-radius: 4px;
    font-size: ${FONT['m-lg']};
  }
`
const MiddleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  border-bottom: 1px solid ${COLORS.gray20};

  :hover {
    color: ${COLORS.green};
  }

  .block {
    display: flex;
    gap: 10px;
    line-height: 20px;
  }
`
const LastSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px 0;

  div {
    cursor: pointer;
  }

  .blur {
    color: ${COLORS.gray40};
  }

  :hover {
    color: ${COLORS.green};
  }
`

export default Sidebar
