import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import React, { useEffect, useState } from 'react'
import { checkDuplicateEmail, join } from '@src/api/authApi'
import useInput from '@src/hooks/useInputHook'

const Join = () => {
  // 인풋 유효성 검사
  const emailValidator = (userEmail: string) => {
    setCheckEmail(false)
    const rUserEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (userEmail === '' || !rUserEmail.test(userEmail)) return true
  }
  const pwValidator = (userPw: string) => {
    const rUserPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    if (userPw === '' || !rUserPw.test(userPw)) return true
  }
  const nameValidator = (userName: string) => {
    if (userName === '' || userName.length < 0 || userName.length > 5) return true
  }
  const nickNameValidator = (userNickName: string) => {
    if (userNickName === null || userNickName.length > 12) return true
  }

  const navigate = useNavigate()
  const [userEmail, onChangeUserEmail, userEmailError] = useInput(emailValidator, '')
  const [userPw, onChangeUserPw, userPwError] = useInput(pwValidator, '')
  const [userConfirmPw, onChangeUserConfirmPw, userConfirmPwError] = useInput(pwValidator, '')
  const [userName, onChangeUserName, userNameError] = useInput(nameValidator, '')
  const [userNickName, onChangeUserNickName, userNickNameError] = useInput(nickNameValidator, '')
  const [checkEmail, setCheckEmail] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [userPhone, setUserPhone] = useState('')

  const onChangeUserPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(e.target.value)
  }

  const checkEmailHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!userEmail) return alert('이메일을 입력해주세요.')
    if (userEmailError) return alert('올바른 이메일 형식이 아닙니다.')
    const { status } = (await checkDuplicateEmail({ userEmail })) as IResponseType
    if (status === 200) {
      setCheckEmail(true)
    } else return alert('사용할 수 없는 이메일 입니다.')
  }

  const joinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!checkEmail) return alert('이메일 중복확인을 해주세요.')
    if (userEmailError || userPwError || userConfirmPwError || userNameError || userNickNameError || phoneError) return alert('양식을 다시 확인해주세요.')
    const { status } = (await join({
      userEmail,
      userPw,
      userName,
      userNickName,
      userPhone,
    })) as IResponseType
    if (status === 200) {
      alert('회원가입에 성공했습니다!')
      navigate('/login')
    }
  }

  useEffect(() => {
    setUserPhone(
      userPhone
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    )
    if (userPhone.length >= 1 && userPhone.length <= 8) setPhoneError(true)
    if (userPhone.length >= 11) setPhoneError(false)
  }, [userPhone])

  return (
    <Container>
      <div className="text_wrap">
        <h3>이메일과 비밀번호를 입력해주세요</h3>
      </div>

      <form onSubmit={joinHandler}>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>이메일</label>
            <input type="email" name="userEmail" onChange={onChangeUserEmail} placeholder="field-passer@naver.com" value={userEmail} required />
            <button type="button" onClick={checkEmailHandler}>
              이메일 중복확인
            </button>
            <p className="error_message">{userEmailError && '올바른 이메일 형식이 아닙니다.'}</p>
            <p className="help_message">{checkEmail && '사용가능한 이메일 입니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>비밀번호</label>
            <input type="password" name="userPw" onChange={onChangeUserPw} placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={userPw} required />
            <p className="error_message">{userPwError && '8 ~ 10자 사이의 영문, 숫자 조합이어야 합니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="userPw"
              onChange={onChangeUserConfirmPw}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={userConfirmPw}
              required
            />
            <p className="error_message">{userConfirmPwError}</p>
            <p className="error_message">{userPw !== userConfirmPw && '비밀번호가 같지 않습니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>이름</label>
            <input type="text" name="userName" onChange={onChangeUserName} placeholder="김필드" required />
            <p className="error_message">{userNameError && '이름은 다섯글자를 넘을 수 없습니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>닉네임</label>
            <input type="text" name="userNickName" onChange={onChangeUserNickName} placeholder="김필드패서" required />
            <p className="error_message">{userNickNameError && '닉네임은 열두글자를 넘을 수 없습니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>전화번호</label>
            <input
              type="text"
              name="userPhone"
              onChange={onChangeUserPhone}
              placeholder="- 없이 숫자만 입력해주세요."
              value={userPhone}
              maxLength={13}
              required
            />
            <p className="error_message">{phoneError && '전화번호를 정확히 입력해주세요.'}</p>
          </div>
        </div>

        <button className="btn_join">가입하기</button>
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
