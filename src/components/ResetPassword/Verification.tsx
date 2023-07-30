import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import React, { useState } from 'react'
import { temporaryPassword, verifyUserEmail, verifyUserNum } from '@src/api/authApi'
import useInput from '@src/hooks/useInputHook'

interface propsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Verification = ({ setStep }: propsType) => {
  // 인풋 유효성 검사
  const emailValidator = (userEmail: string) => {
    setPersonalVerify(false)
    const rUserEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (userEmail === '' || !rUserEmail.test(userEmail)) return true
  }
  const verifyNumValidator = (userVerifyNum: string) => {
    const rUserVerifyNum = /^[0-9]{1,6}$/
    if (userVerifyNum === null || !rUserVerifyNum.test(userVerifyNum)) return true
  }

  const [userEmail, onChangeUserEmail, userEmailError] = useInput(emailValidator, '')
  const [userVerifyNum, onChangeUserVerifyNum, userVerifyNumError] = useInput(verifyNumValidator, '')

  const [mailLoading, setMailLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [personalVerify, setPersonalVerify] = useState(false)

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const verifyMailHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMailLoading(true)
    const { status } = (await verifyUserEmail({
      userEmail,
    })) as IResponseType
    if (status === 200) {
      setPersonalVerify(true)
      alert('인증 메일 발송이 완료되었습니다!')
    } else alert('가입된 메일이 아닙니다! 다시 확인해주세요.')
    setMailLoading(false)
  }

  const verifyNumHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setVerifyLoading(true)
    const { status } = (await verifyUserNum({
      userEmail,
      userVerifyNum,
    })) as IResponseType
    if (status === 200) {
      const { status } = (await temporaryPassword({
        userEmail,
      })) as IResponseType
      if (status === 200) {
        setVerifyLoading(false)
        alert('인증에 성공했습니다!')
        setStep(2)
      }
    } else alert('인증에 실패하였습니다. 입력한 정보를 다시 확인해주세요.')
    setVerifyLoading(false)
  }
  return (
    <>
      <div className="text_wrap">
        <h3>비밀번호 찾기</h3>
      </div>
      <Form onSubmit={onSubmitHandler}>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>이메일</label>
            <input type="email" name="userEmail" onChange={onChangeUserEmail} placeholder="field-passer@naver.com" value={userEmail} required />
            <button type="button" onClick={verifyMailHandler} className="btn_verifyNum" disabled={userEmailError || personalVerify}>
              요청
            </button>
            <p className="error_message">{userEmailError && '올바른 이메일 형식이 아닙니다.'}</p>
            <p className="help_message">{mailLoading && '인증 메일 발송중... 잠시 기다려주세요.'}</p>
          </div>
        </div>
      </Form>

      <Form onSubmit={onSubmitHandler}>
        <div className="input_wrap_inner">
          <label>메일로 전송된 인증번호를 입력해주세요</label>
          <input
            type="text"
            name="userVerifyNum"
            onChange={onChangeUserVerifyNum}
            placeholder="field-passer@naver.com"
            value={userVerifyNum}
            maxLength={6}
            required
          />
          <p className="error_message">{userVerifyNumError && '인증번호는 총 여섯자리 숫자 입니다.'}</p>
          <p className="help_message">{verifyLoading && '인증 번호 확인중... 잠시 기다려주세요.'}</p>
        </div>

        <button className="btn_verify" onClick={verifyNumHandler} disabled={verifyLoading}>
          요청하기
        </button>
      </Form>
    </>
  )
}

const Form = styled.form`
  margin-top: 44px;

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
        border-radius: 8px;
        border-color: ${COLORS.green};
        font-size: ${FONT['m-sm']};
        font-weight: 700;
        color: ${COLORS.green};
      }
      .btn_verifyNum {
        background-color: ${COLORS.green};
        color: white;
        &:disabled {
          background-color: ${COLORS.gray20};
          color: ${COLORS.gray40};
          :hover {
            cursor: default;
          }
        }
      }
    }
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
`

export default Verification
