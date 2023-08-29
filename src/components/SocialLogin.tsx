// import React from 'react'
// import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { COLORS } from '@src/globalStyles'
// import { Link } from 'react-router-dom'

const SocialLogin = () => {
  //const navigate = useNavigate()
  // const NAVER_URI = 'https://field-passer.store/oauth2/authorization/naver'
  // const GOOGLE_URI = 'https://field-passer.store/oauth2/authorization/google'

  const socialLoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // if (!(e.target instanceof HTMLDivElement)) return
    const LINK = `https://field-passer.store/oauth2/authorization/${e.currentTarget.dataset.name}`
    window.location.assign(LINK)
  }

  return (
    <SocialLoginWrap>
      <button type="button" className="btn_naverLogin" onClick={socialLoginHandler} data-name="naver">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" version="1.1">
          <path fill="#ffffff" d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z" />
        </svg>
        <span>네이버로 계속하기</span>
      </button>

      <button type="button" className="btn_googleLogin" onClick={socialLoginHandler} data-name="google">
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
      </button>
    </SocialLoginWrap>
  )
}

const SocialLoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  > button {
    /* button { */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 47px;
    border-radius: 10px;
    font-size: 15px;
    svg {
      flex-shrink: 0;
      margin-left: 14px;
    }
    span {
      flex-grow: 1;
      margin-left: -14px;
      pointer-events: none;
    }
  }
  .btn_naverLogin {
    /* border: none; */
    background-color: #03c75a;
    span {
      color: #ffffff;
    }
  }
  .btn_googleLogin {
    border: 1px solid ${COLORS.gray30};
  }
  /* } */
`
export default SocialLogin
