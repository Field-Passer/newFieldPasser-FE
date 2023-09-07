import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import React from 'react'
import { useNavigate } from 'react-router'
import useInput from '@src/hooks/useInputHook'
import { editUserPw } from '@src/api/authApi'
import { removeCookieToken } from '@src/storage/Cookie'
import { useDispatch } from 'react-redux'
import { DELETE_TOKEN } from '@src/store/slices/authSlice'
import { DELETE_INFO } from '@src/store/slices/infoSlice'

const ResetPw = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const newPwValidator = (newPw: string) => {
    const rNewPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    if (newPw === '' || !rNewPw.test(newPw)) return true
  }
  const [newPw, onChangeNewPw, newPwError] = useInput(newPwValidator, '')
  const [newConfirmPw, onChangeNewConfirmPw] = useInput(newPwValidator, '')

  const changePwHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (newPwError) return alert('비밀번호 양식을 다시 확인해주세요.')
    if (newPw !== newConfirmPw) return alert('입력한 비밀번호가 같지 않습니다.')
    const { status } = (await editUserPw({ newPw })) as IResponseType
    if (status === 200) {
      removeCookieToken()
      dispatch(DELETE_TOKEN())
      dispatch(DELETE_INFO())
      alert('비밀번호 변경에 성공했습니다. 다시 로그인 해주세요.')
      navigate('/login')
    }
  }

  return (
    <Container>
      <div className="text_wrap">
        <h3>비밀번호 새로 설정</h3>
      </div>

      <form>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>새롭게 사용할 비밀번호를 입력해주세요</label>
            <input
              type="password"
              name="newPw"
              onChange={onChangeNewPw}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={newPw}
              required
            />
            <p className="error_message">{newPwError && '8 ~ 10자 사이의 영문, 숫자 조합이어야 합니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>비밀번호 재확인</label>
            <input
              type="password"
              name="newComfirmPw"
              onChange={onChangeNewConfirmPw}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={newConfirmPw}
              required
            />
            <p className="error_message">{newPw !== newConfirmPw && '비밀번호가 같지 않습니다.'}</p>
          </div>
        </div>
        <button className="btn_verify" onClick={changePwHandler}>
          새로 설정하기
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

export default ResetPw
