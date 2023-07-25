import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import React, { useEffect, useState } from 'react'
// import { checkDuplicateEmail, join } from '@src/api/authApi'
import useInput from '@src/hooks/useInputHook'

const FindPassword = () => {
  // 인풋 유효성 검사
  const emailValidator = (userEmail: string) => {
    //setRequestVerifyNum(false)
    const rUserEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (userEmail === '' || !rUserEmail.test(userEmail)) return true
  }
  const [userEmail, onChangeUserEmail, userEmailError] = useInput(emailValidator, '')
  const [userVerify, onChangeUserVerify, userVerifyError] = useInput(emailValidator, '')

  const verifyNumHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <Container>
      <div className="text_wrap">
        <h3>비밀번호 찾기</h3>
      </div>

      <form>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>이메일</label>
            <input type="email" name="userEmail" onChange={onChangeUserEmail} placeholder="field-passer@naver.com" value={userEmail} required />
            <button type="button" onClick={verifyNumHandler} className="btn_verifyNum">
              요청
            </button>
            <p className="error_message">{userEmailError && '올바른 이메일 형식이 아닙니다.'}</p>
            {/* <p className="help_message">{checkEmail && '가입하지 않은 이메일 입니다.'}</p> */}
          </div>
        </div>
      </form>

      <form>
        <div className="input_wrap_inner">
          <label>메일로 전송된 인증번호를 입력해주세요</label>
          <input type="email" name="userEmail" onChange={onChangeUserVerify} placeholder="field-passer@naver.com" value={userVerify} required />
          <p className="error_message">{userVerifyError && '인증번호를 다시 확인해주세요.'}</p>
        </div>

        <button className="btn_verify" disabled={true}>
          인증하기
        </button>
      </form>
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

  .input_wrap {
    &_inner {
      position: relative;
      margin: 8px 0;
      height: 88px;
      button {
        position: absolute;
        top: 24px;
        right: 0;
        margin: 8px;
        padding: 8px;
        border: 1px solid;
        border-radius: 8px;
        border-color: ${COLORS.green};
        font-size: ${FONT['m-sm']};
        font-weight: 700;
        color: ${COLORS.green};
      }
      .btn_verifyNum {
        background-color: ${COLORS.green};
        color: white;
      }
    }
  }

  input {
    margin: 8px 0 6px;
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

  .error_message {
    font-size: 12px;
    color: ${COLORS.error};
  }

  .help_message {
    font-size: 12px;
    color: ${COLORS.green};
  }

  .btn_verify {
    margin-top: 48px;
    width: 100%;
    height: 47px;
    background-color: ${COLORS.green};
    font-size: ${FONT.pc};
    font-weight: 700;
    color: white;
    &:disabled {
      background-color: ${COLORS.gray20};
      color: ${COLORS.gray40};
    }
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

export default FindPassword
