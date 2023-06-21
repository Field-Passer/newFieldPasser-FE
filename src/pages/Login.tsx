// import { Mobile, Tablet, PC } from '@src/hooks/useScreenHook'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <div className="logo">
        <img src="/logo.png" alt="필드패서" />
      </div>

      <div className="input_wrap">
        <label>이메일</label>
        <input type="text" placeholder="아이디를 적어주세요" />
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 적어주세요" />
      </div>

      <button className="btn_login">로그인</button>

      <div className="find_wrap">
        <Link to="/findpw">비밀번호 찾기</Link>
        <Link to="/join">회원가입하기</Link>
      </div>

      {/* <div>소셜 로그인 버튼 자리</div> */}
    </Container>
  )
}

const Container = styled.div`
  // reset css 적용되면 지우기
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${COLORS.font};
  }

  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto 0;
  width: 328px;

  .logo {
    margin-bottom: 60px;
    text-align: center;
    img {
      width: 160px;
      height: 24px;
    }
  }

  input {
    margin: 8px 0 16px;
    padding: 16px 8px;
    width: 100%;
    height: 47px;
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    font-weight: 500;
    font-size: 12px;
  }

  .btn_login {
    width: 100%;
    height: 47px;
    background-color: ${COLORS.green};
    font-size: ${FONT.pc};
    font-weight: 700;
    color: white;
  }

  .find_wrap {
    padding: 16px 0;
    display: flex;
    justify-content: center;
    gap: 40px;
    width: 100%;
    font-size: 12px;
  }
`

export default Login
