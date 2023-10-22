import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import { Link } from 'react-router-dom'

const TemporaryPw = () => {
  return (
    <Container>
      <div className="text_wrap">
        <h3>임시 비밀번호 발급 완료</h3>
      </div>
      <div className="">
        <p>인증한 메일로 임시 비밀번호가 발급되었습니다.</p>
        <p>해당 임시 비밀번호로 로그인 후 비밀번호를 변경해주세요!</p>
      </div>
      <Link to="/login" className="btn_login">
        로그인하러 가기
      </Link>
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

  form {
    margin-top: 44px;
  }

  .text_wrap {
    margin-bottom: 60px;
    width: 170px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  .error_message {
    font-size: 12px;
    color: ${COLORS.error};
  }

  .help_message {
    font-size: 12px;
    color: ${COLORS.green};
  }

  .btn_login {
    display: inline-block;
    margin-top: 48px;
    width: 100%;
    height: 47px;
    line-height: 47px;
    border-radius: 10px;
    background-color: ${COLORS.green};
    font-size: ${FONT.pc};
    font-weight: 700;
    text-align: center;
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

export default TemporaryPw
