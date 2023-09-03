// import { Mobile, Tablet, PC } from '@src/hooks/useScreenHook'
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
import SocialLogin from '@src/components/SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })
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
    const { status, tokens } = (await userLogin({
      userEmail,
      userPw,
    })) as IResponseType
    if (status === 200) {
      removeCookieToken()
      dispatch(SET_TOKEN(tokens.accessToken))
      setRefreshToken(tokens.refreshToken)
      console.log('로그인함', new Date())
      window.onpopstate = () => {
        console.log('뒤로가기 클릭')
        return navigate('/')
      }
      return navigate('/', { replace: true })
    } else {
      alert('아이디와 비밀번호를 다시 확인해주세요.')
    }
  }

  return (
    <Container>
      <form onSubmit={onSubmitHandler}>
        {isPC && (
          <div className="logo">
            <img src="/logo.png" alt="필드패서" />
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

        {/* <div className="socialLogin_wrap"> */}
        {/* <button type="button" className="btn_naverLogin">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" version="1.1">
              <path fill="#ffffff" d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z" />
            </svg>
            <span>네이버로 계속하기</span>
          </button> */}

        {/* <button type="button" className="btn_googleLogin" onClick={googleLogin}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.64 9.20425C17.64 8.56607 17.5827 7.95243 17.4764 7.36334H9V10.8447H13.8436C13.635 11.9697 13.0009 12.9229 12.0477 13.5611V15.8193H14.9564C16.6582 14.2524 17.64 11.9452 17.64 9.20425Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99976 17.9998C11.4298 17.9998 13.467 17.1938 14.9561 15.8193L12.0475 13.5611C11.2416 14.1011 10.2107 14.4202 8.99976 14.4202C6.65567 14.4202 4.67158 12.837 3.96385 10.7097H0.957031V13.0416C2.43794 15.9829 5.48158 17.9998 8.99976 17.9998Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.96409 10.7101C3.78409 10.1701 3.68182 9.59325 3.68182 9.00007C3.68182 8.40689 3.78409 7.83007 3.96409 7.29007V4.95825H0.957273C0.347727 6.17325 0 7.5478 0 9.00007C0 10.4523 0.347727 11.8269 0.957273 13.0419L3.96409 10.7101Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99976 3.57909C10.3211 3.57909 11.5075 4.03318 12.4402 4.925L15.0216 2.34363C13.4629 0.891361 11.4257 -0.000457764 8.99976 -0.000457764C5.48158 -0.000457764 2.43794 2.01636 0.957031 4.95773L3.96385 7.28955C4.67158 5.16227 6.65567 3.57909 8.99976 3.57909Z"
                fill="#EA4335"
              />
            </svg>
            <span>구글로 계속하기</span>
          </button> */}
        {/* </div> */}
        <SocialLogin></SocialLogin>
      </form>
    </Container>
  )
}

const Container = styled.div`
  // reset-css에 border-box 추가?
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

  /* .socialLogin_wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 47px;
      font-size: 15px;
      border: 1px solid ${COLORS.gray30};
      svg {
        flex-shrink: 0;
        margin-left: 14px;
      }
      span {
        flex-grow: 1;
        margin-left: -14px;
      }
    }
    .btn_naverLogin {
      border: none;
      background-color: #03c75a;
      span {
        color: #ffffff;
      }
    }
  } */
`

export default Login
