import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  // 모바일버전에는 없음
  const isMobile = useMediaQuery({
    query: '(max-width: 380px)',
  })
  const navigate = useNavigate()

  return (
    <>
      {!isMobile && (
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
      )}
    </>
  )
}

const Container = styled.header`
  padding: 12px 20px;
  height: 60px;
  box-sizing: border-box;
`
const Inner = styled.div`
  max-width: var(--screen-pc);
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  .logo {
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

    button {
      width: 100px;
      height: 32px;
      font-size: ${FONT.pc};
      background-color: ${COLORS.green};
      color: white;
    }
  }
`

export default Header
