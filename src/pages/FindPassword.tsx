import styled from 'styled-components'
import { COLORS } from '@src/globalStyles'
import { useState } from 'react'
import Verification from '@src/components/ResetPassword/Verification'
import TemporaryPw from '@src/components/ResetPassword/TemporaryPw'

const FindPassword = () => {
  const [step, setStep] = useState(1)
  const activeStep = (step: number) => {
    if (step === 1) return <Verification setStep={setStep} />
    if (step === 2) return <TemporaryPw />
  }

  return <Container>{activeStep(step)}</Container>
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
`

export default FindPassword
