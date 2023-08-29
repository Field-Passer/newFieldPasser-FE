import Inner from '@src/components/Inner'
import Title from '@src/components/Title'
import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { useState } from 'react'
import { postQuestion, postAdmintQuestion } from '@src/api/postApi'
import { useNavigate } from 'react-router'
import PATH from '@src/constants/pathConst'

interface Props {
  type: string
  questionId?: number
}
const HelpNAskForm = ({ type, questionId }: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (type === 'help') {
      const data = {
        questionTitle: title,
        questionContent: content,
        questionCategory: 'TRANSACTION',
      }
      try {
        postQuestion(data)
        const confirm = window.confirm('문의 작성이 완료되었습니다. 메인으로 이동합니다.')
        if (confirm) {
          navigate('/')
        }
      } catch (error) {
        alert('오류가 발생하였습니다.')
      }
    } else if (type === 'ask') {
      const data = {
        answerTitle: title,
        answerContent: content,
      }
      try {
        postAdmintQuestion(Number(questionId), data)
        const confirm = window.confirm('문의 답변을 작성하였습니다. 문의 목록으로 돌아갑니다.')
        if (confirm) {
          navigate(PATH.ASK)
        }
      } catch (error) {
        alert('오류가 발생하였습니다.')
      }
    }
  }
  return (
    <>
      {isPC ? (
        <Inner padding="64px 0">
          <Title screen="pc" name="1:1 문의하기" />
          <FormStyle onSubmit={handleSubmit}>
            <FormDetailStyle screen="pc">
              <h2>제목</h2>
              <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </FormDetailStyle>
            <FormDetailStyle screen="pc">
              <h2>내용</h2>
              <textarea
                cols={30}
                rows={10}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </FormDetailStyle>
            <ButtonStyle screen="pc" type="submit">
              문의 등록
            </ButtonStyle>
          </FormStyle>
        </Inner>
      ) : (
        <Inner width="100%" padding="16px 0">
          <Title screen="mobile" name="1:1 문의하기" />
          <FormStyle onSubmit={handleSubmit}>
            <FormDetailStyle screen="mobile">
              <h2>제목</h2>
              <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </FormDetailStyle>
            <FormDetailStyle screen="mobile">
              <h2>내용</h2>
              <textarea
                cols={30}
                rows={10}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </FormDetailStyle>
            <ButtonStyle screen="mobile" type="submit">
              문의 등록
            </ButtonStyle>
          </FormStyle>
        </Inner>
      )}
    </>
  )
}

export default HelpNAskForm

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
`

const FormDetailStyle = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h2 {
    font-size: ${({ screen }) => (screen === 'pc' ? FONT['pc-lg'] : FONT.m)};
  }
  input {
    padding: 16px 8px;
    border-radius: 8px;
    border: 1px solid ${COLORS.gray30};
    font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT['m-sm'])};
  }
  textarea {
    padding: 16px 8px;
    border-radius: 8px;
    border: 1px solid ${COLORS.gray30};
    font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT['m-sm'])};
    &:focus {
      border: 1px solid ${COLORS.gray30};
      outline: none;
    }
  }
`

const ButtonStyle = styled.button<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.green};
  color: #fff;
  width: ${({ screen }) => (screen === 'pc' ? '486px' : '100%')};
  height: 48px;
  font-size: ${FONT['pc-lg']};
  margin: 46px auto;
  border-radius: 8px;
`
