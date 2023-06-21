import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '@src/globalStyles'

const Header = () => {
  // 모바일버전에는 없음
  // pc, tab 폰트사이즈 확인

  const navigate = useNavigate()

  return (
    <Container>
      <Inner>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="필드패서" />
        </Link>
        <div className="menu">
          <Link to="/">회원가입</Link>
          <Link to="/">로그인</Link>
          <button>양도하기</button>
        </div>
      </Inner>
    </Container>
  )
}

const Container = styled.header`
  padding: 12px 20px;
  height: 60px;
  box-sizing: border-box;
`
const Inner = styled.div`
  display: flex;
  justify-content: space-between;

  .logo {
    img {
      width: 160px;
      height: 24px;
    }
  }

  .menu {
    display: flex;
    gap: 20px;
    align-items: center;

    button {
      width: 100px;
      height: 32px;
      background-color: ${COLORS.green};
      color: white;
    }
  }
`

export default Header
