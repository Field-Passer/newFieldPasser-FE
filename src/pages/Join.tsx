import styled from 'styled-components'
import {
  // Link,
  useNavigate,
} from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import { useState } from 'react'
import { join } from '@src/api/authApi'

const Join = () => {
  const navigate = useNavigate()
  const [duplicateEmail, setDuplicateEmail] = useState('')
  const [checkDuplicateEmail, setCheckDuplicateEmail] = useState(false)
  const [inputs, setInputs] = useState({
    userEmail: '',
    userPw: '',
    userName: '',
    userPhone: '',
  })
  const { userEmail, userPw, userName, userPhone } = inputs

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(userEmail, userPw, userName)
    if (!checkDuplicateEmail) return
    const { status, result, message } = await join({
      userEmail,
      userPw,
      userName,
      userPhone,
    })
    console.log(status, result, message) // 잘 오는구만
    navigate('/login')
  }

  return (
    <Container>
      <div className="text_wrap">
        <h3>이메일과 비밀번호를 입력해주세요</h3>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>이메일</label>
            <input type="text" name="userEmail" onChange={onChangeHandler} placeholder="abc@gmail.com" />
            <button type="button">이메일 중복검사</button>
          </div>
          <div></div>
          <label>비밀번호</label>
          <input type="password" name="userPw" onChange={onChangeHandler} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
          <label>비밀번호 확인</label>
          <input type="password" name="userPw" onChange={onChangeHandler} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
          <label>이름</label>
          <input type="text" name="userName" onChange={onChangeHandler} placeholder="김필드" />
          <label>전화번호</label>
          <input type="text" name="userPhone" onChange={onChangeHandler} placeholder="010-1234-5678" />
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
