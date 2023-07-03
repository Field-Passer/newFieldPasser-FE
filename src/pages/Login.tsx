// import { Mobile, Tablet, PC } from '@src/hooks/useScreenHook'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import { FormEvent, useState } from 'react'
import axios from 'axios'

// interface FormElements {
//   userId: string
//   userPw: string
// }

const Login = () => {
  //const navigate = useNavigate()

  // 첫 로그인 요청은 id, pw
  // 새 at 재발급 요청 시 rt 필요 (=at 만료되서 UNAUTHORIZED(401) 돌아오면)
  // 로그아웃 요청 시 유효한 at, rt 모두 필요
  axios({
    method: 'post',
    url: 'https://field-passer.store/auth/login',
    data: {
      memberId: 'test@test.com',
      password: 'a12341234',
    },
  }).then((res) => {
    console.log(res)
  })

  const [disabled, setDisabled] = useState(false)

  const onSubmit = async () => {
    console.log('onSubmit 작동..')
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div className="logo">
          <img src="/logo.png" alt="필드패서" />
        </div>

        <div className="input_wrap">
          <label>이메일</label>
          <input
            type="text"
            name="userId"
            pattern="^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
            placeholder="이메일을 적어주세요"
            title="올바른 형식의 이메일을 적어주세요"
            //required
          />
          <label>비밀번호</label>
          <input
            type="password"
            name="userPw"
            //minLength={8}
            //maxLength={16}
            //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
            placeholder="비밀번호를 적어주세요"
            title="최소 8자리, 최대 16자리 숫자, 영문, 특수문자를 1개 이상 포함해주세요"
            required
          />
        </div>

        <button type="submit" className="btn_login" disabled={disabled}>
          로그인
        </button>

        <div className="find_wrap">
          <Link to="/findpw">비밀번호 찾기</Link>
          <Link to="/join">회원가입하기</Link>
        </div>

        {/* <div>소셜 로그인 버튼 자리</div> */}
      </form>
    </Container>
  )
}

const Container = styled.div`
  // reset-css 적용되면 지우기
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
