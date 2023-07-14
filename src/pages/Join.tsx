import styled from 'styled-components'
//import { Link, useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'

const Join = () => {
  //const navigate = useNavigate()

  return (
    <Container>
      <div className="text_wrap">
        <h3>이메일과 비밀번호를 입력해주세요</h3>
      </div>

      <div className="input_wrap">
        <label>이메일</label>
        <input type="text" placeholder="abc@gmail.com" />
        <label>비밀번호</label>
        <input type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
        <label>비밀번호</label>
        <input type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
        <label>닉네임</label>
        <input type="password" placeholder="김필드필드" />
      </div>

      <button className="btn_join">가입하기</button>
    </Container>
  )
}

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto 0;
  width: 328px;

  .text_wrap {
    margin-bottom: 60px;
    width: 170px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

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
    &::placeholder {
      color: ${COLORS.gray40};
    }
  }

  .btn_join {
    margin-top: 48px;
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

export default Join
