import Inner from '@src/components/Inner'
import Title from '@src/components/Title'
import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { useState } from 'react'
import { postQuestion, postAdmintQuestion } from '@src/api/postApi'
import { useNavigate } from 'react-router'
import PATH from '@src/constants/pathConst'
import Modal from '@components/Modal'

interface Props {
  type: string
  questionId?: number
}
const HelpNAskForm = ({ type, questionId }: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalIsConfirm, setModalIsConfirm] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string[]>([])
  const [modalNavigate, setModalNavigate] = useState<string>('')
  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (type === 'help') {
      try {
        setModalOpen(true)
        setModalIsConfirm(true)
        setModalText(['문의 작성이 완료되었습니다. 메인으로 이동합니다.'])
        setModalNavigate(PATH.HOME)
      } catch (error) {
        setModalOpen(true)
        setModalIsConfirm(true)
        setModalText(['문의 작성 오류가 있습니다.'])
      }
    } else if (type === 'ask') {
      try {
        setModalOpen(true)
        setModalIsConfirm(true)
        setModalText(['문의 답변을 작성하였습니다. 문의 목록으로 돌아갑니다.'])
        setModalNavigate(PATH.ASK)
      } catch (error) {
        setModalOpen(true)
        setModalIsConfirm(true)
        setModalText(['문의 작성 오류가 있습니다.'])
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
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          content={modalText}
          isConfirm={modalIsConfirm}
          navigateOption={modalNavigate}
          confirmFn={() => {
            if (type === 'help') {
              const data = {
                questionTitle: title,
                questionContent: content,
                questionCategory: 'TRANSACTION',
              }
              postQuestion(data)
            } else if (type === 'ask') {
              const data = {
                answerTitle: title,
                answerContent: content,
              }
              postAdmintQuestion(Number(questionId), data)
            }
          }}
        ></Modal>
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
