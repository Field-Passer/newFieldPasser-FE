// import React from 'react'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { COLORS } from '@src/globalStyles'
// import { Link } from 'react-router-dom'
import { SocialLoginGoogleIcon, SocialLoginNaverIcon } from '@src/constants/icons'

const SocialLogin = () => {
  const socialLoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const LINK = `https://field-passer.store/oauth2/authorization/${e.currentTarget.dataset.name}`
    window.location.replace(LINK)
  }

  return (
    <SocialLoginWrap>
      <button type="button" className="btn_naverLogin" onClick={socialLoginHandler} data-name="naver">
        <SocialLoginNaverIcon size="18px" />
        <span>네이버로 계속하기</span>
      </button>

      <button type="button" className="btn_googleLogin" onClick={socialLoginHandler} data-name="google">
        <SocialLoginGoogleIcon size="18px" />
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
    background-color: #03c75a;
    span {
      color: #ffffff;
    }
  }
  .btn_googleLogin {
    border: 1px solid ${COLORS.gray30};
  }
`
export default SocialLogin
