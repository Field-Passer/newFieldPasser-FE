import Inner from '@src/components/Inner'
import Title from '@src/components/Title'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import { useState, useEffect } from 'react'
import { getQuestion, getAdminQuestion } from '@src/api/getApi'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store/config'
import OneOneOne from '@components/OneOnOne'
import PATH from '@src/constants/pathConst'

const Ask = () => {
  const [questions, setQuestions] = useState<QuestionGetTypes[]>([])
  const [adminQuestions, setAdminQuestions] = useState<QuestionGetTypes[]>([])
  const userInfo = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getQuestion(1)
      setQuestions(response?.data.content)
      if (userInfo.role === '관리자') {
        const adminResponse = await getAdminQuestion(1)
        setAdminQuestions(adminResponse?.data.content)
      }
    }
    fetchData()
  }, [])

  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  const navigate = useNavigate()

  return (
    <>
      {isPC ? (
        <Container>
          <Title screen="pc" name="내 문의 목록" />
          <QuestionContainer screen="pc">
            {userInfo.role === '관리자' ? (
              adminQuestions.length ? (
                adminQuestions.map((list) => (
                  <OneOneOne
                    key={list.questionId}
                    title={list.questionTitle}
                    comment={list.questionContent}
                    screen="pc"
                    info={list}
                  />
                ))
              ) : (
                <NoQuestionStyle>문의 내용이 없습니다.</NoQuestionStyle>
              )
            ) : questions.length ? (
              questions.map((list) => (
                <OneOneOne
                  key={list.questionId}
                  title={list.questionTitle}
                  comment={list.questionContent}
                  screen="pc"
                  info={list}
                />
              ))
            ) : (
              <NoQuestionStyle>문의 내용이 없습니다.</NoQuestionStyle>
            )}
          </QuestionContainer>
          <OtherAskStyle>
            <span>원하는 답변이 없다면?</span>
            <button onClick={() => navigate(PATH.HELP_FORM)}>1:1 질문하기</button>
          </OtherAskStyle>
        </Container>
      ) : (
        <Inner width="100%" padding="16px 0">
          <Title screen="mobile" name="내 문의 목록" />
          <QuestionContainer screen="mobile">
            {userInfo.role === '관리자' ? (
              adminQuestions.length ? (
                adminQuestions.map((list) => (
                  <OneOneOne
                    key={list.questionId}
                    title={list.questionTitle}
                    comment={list.questionContent}
                    screen="mobile"
                    info={list}
                  />
                ))
              ) : (
                <NoQuestionStyle>문의 내용이 없습니다.</NoQuestionStyle>
              )
            ) : questions.length ? (
              questions.map((list) => (
                <OneOneOne
                  key={list.questionId}
                  title={list.questionTitle}
                  comment={list.questionContent}
                  screen="mobile"
                  info={list}
                />
              ))
            ) : (
              <NoQuestionStyle>문의 내용이 없습니다.</NoQuestionStyle>
            )}
          </QuestionContainer>
          <MobileOtherAsk>
            <span>원하는 답변이 없다면?</span>
            <button onClick={() => navigate(PATH.HELP_FORM)}>1:1 질문하기</button>
          </MobileOtherAsk>
        </Inner>
      )}
    </>
  )
}

export default Ask

const Container = styled.div`
  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto;
  max-width: 1024px;
`

const QuestionContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ screen }) => (screen === 'pc' ? '24px' : '16px')};
`

const OtherAskStyle = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  button {
    display: flex;
    width: 328px;
    padding: 16px 56px;
    justify-content: center;
    background-color: ${COLORS.green};
    color: white;
    font-size: ${FONT['pc-lg']};
    font-weight: 600;
    font-family: 'Pretendard-Regular';
  }
`

const NoQuestionStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 64px;
`

const MobileOtherAsk = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${COLORS.gray30};
  button {
    display: flex;
    width: 328px;
    padding: 16px 56px;
    justify-content: center;
    background-color: ${COLORS.green};
    color: white;
    font-size: ${FONT['m-lg']};
    font-weight: 600;
    font-family: 'Pretendard-Regular';
  }
`
