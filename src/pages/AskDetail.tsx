import { getQuestionDetail, getQuestionAnswer } from '@src/api/getApi'
import Title from '@src/components/Title'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { COLORS } from '@src/globalStyles'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store/config'
import Inner from '@src/components/Inner'
import PATH from '@src/constants/pathConst'

const AskDetail = () => {
  const [question, setQuestion] = useState<QuestionGetTypes>()
  const [answer, setAnswer] = useState<QuestionAnswerTypes>()
  const { pathname } = useLocation()
  const questionId = Number(pathname.slice(5))

  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getQuestionDetail(questionId)
      setQuestion(response?.data)
      const answerResponse = await getQuestionAnswer(questionId)
      setAnswer(answerResponse?.data)
    }
    fetchData()
  }, [])

  const navigate = useNavigate()

  const userInfo = useSelector((state: RootState) => state.userInfo)
  return (
    <>
      {isPC ? (
        <Container>
          <Title screen="pc" name="내 문의 목록" />
          <QuestionContent screen="pc">
            <span>Q. {question?.questionTitle}</span>
            <div>{question?.questionContent}</div>
          </QuestionContent>
          {answer ? (
            <AnswerContent screen="pc">
              <div className="answerTitle">
                <span>A. {answer.answerTitle}</span>
                <span>{answer.answerRegisterDate.slice(0, 10)}</span>
              </div>
              <div className="answerContent">{answer.answerContent}</div>
            </AnswerContent>
          ) : (
            <AnswerContent screen="pc">
              <div className="answerTitle">
                <span>A. 답변 전입니다.</span>
                <span>{''}</span>
                {userInfo.role === '관리자' && <button onClick={() => navigate(PATH.ASK_ANSWER_FORM, { state: questionId })}>답변</button>}
              </div>
              <div className="answerContent">답변 전입니다.</div>
            </AnswerContent>
          )}
        </Container>
      ) : (
        <Inner width="100%" padding="16px 0">
          <Title screen="mobile" name="내 문의 목록" />
          <MobileContainer>
            <QuestionContent screen="mobile">
              <span>Q. {question?.questionTitle}</span>
              <div>{question?.questionContent}</div>
            </QuestionContent>
            {answer ? (
              <AnswerContent screen="mobile">
                <div className="answerTitle">
                  <span>A. {answer.answerTitle}</span>
                  <span>{answer.answerRegisterDate.slice(0, 10)}</span>
                </div>
                <div className="answerContent">{answer.answerContent}</div>
              </AnswerContent>
            ) : (
              <AnswerContent screen="mobile">
                <div className="answerTitle">
                  <span>A. 답변 전입니다.</span>
                  <span>{''}</span>
                  {userInfo.role === '관리자' && <button>답변</button>}
                </div>
                <div className="answerContent">답변 전입니다.</div>
              </AnswerContent>
            )}
          </MobileContainer>
        </Inner>
      )}
    </>
  )
}

export default AskDetail

const Container = styled.div`
  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const QuestionContent = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1024px;
  span {
    font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
  }
  div {
    padding: 16px 8px;
    background: #fafafa;
    border-radius: 8px;
    font-size: ${({ screen }) => screen === 'mobile' && '12px'};
  }
`

const AnswerContent = styled.div<StyleProps>`
  .answerTitle {
    display: flex;
    gap: 10px;
    align-items: center;
    span:first-child {
      font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
    }
    span:last-child {
      color: ${COLORS.gray40};
    }
    button {
      border-radius: 8px;
      background-color: ${COLORS.green};
      color: #fff;
      width: 60px;
      padding: 4px 16px;
    }
  }
  .answerContent {
    padding: 16px 8px;
    background: #fafafa;
    border-radius: 8px;
    font-size: ${({ screen }) => screen === 'mobile' && '12px'};
  }
`
