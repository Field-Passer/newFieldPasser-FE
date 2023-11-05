import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'
import { SET_TOKEN } from '@src/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { removeCookieToken, setRefreshToken } from '@src/storage/Cookie'
import { userLogin } from '@src/api/authApi'
import SocialLogin from '@src/components/SocialLogin/SocialLogin'
import PATH from '@src/constants/pathConst'
import useModal from '@src/hooks/useModal'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })

  const { openModal } = useModal()

  const [inputs, setInputs] = useState({
    userEmail: '',
    userPw: '',
  })
  const { userEmail, userPw } = inputs

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await userLogin({
        userEmail,
        userPw,
      })
      if (response.status === 200) {
        removeCookieToken()
        dispatch(SET_TOKEN(response.data.data.accessToken))
        setRefreshToken(response.data.data.refreshToken)
        return navigate(PATH.HOME, { replace: true })
      }
    } catch (error) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['잘못된 로그인 정보입니다. 아이디와 비밀번호를 다시 확인해주세요.'],
      })
    }
  }

  return (
    <Container>
      <form onSubmit={onSubmitHandler}>
        {isPC && (
          <div className="logo">
            <img src="/logo.webp" alt="필드패서" />
          </div>
        )}

        <div className="input_wrap">
          <label>이메일</label>
          <input
            type="text"
            name="userEmail"
            placeholder="field-passer@gmail.com"
            title="올바른 형식의 이메일을 적어주세요"
            onChange={onChangeHandler}
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            name="userPw"
            placeholder="********"
            title="최소 8자리, 최대 16자리 숫자, 영문, 특수문자를 1개 이상 포함해주세요"
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit" className="btn_login">
          로그인
        </button>

        <div className="find_wrap">
          <Link to="/find-password">비밀번호 찾기</Link>
          <Link to="/join">회원가입하기</Link>
        </div>
        <SocialLogin></SocialLogin>
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
    margin-bottom: 50px;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    gap: 40px;
    width: 100%;
    font-size: 12px;
  }
`

export default Login
