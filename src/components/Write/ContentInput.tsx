import { COLORS, FONT } from '@src/globalStyles'
import styled from 'styled-components'

type PropsType = {
  writtenContent: string
  setWrittenContent: React.Dispatch<React.SetStateAction<string>>
}

const ContentInput = ({ writtenContent, setWrittenContent }: PropsType) => {
  return (
    <>
      <h2>본문내용</h2>
      <div>
        <ContentBox
          placeholder="양도 사유, 주차 가능 여부 등 내용을 최소 5자 이상 입력해주세요."
          required
          minLength={5}
          name="content"
          value={writtenContent}
          onChange={(e) => setWrittenContent(e.target.value)}
        />
      </div>
    </>
  )
}

const ContentBox = styled.textarea`
  color: ${COLORS.font};
  width: 328px;
  height: 140px;
  border: 1px solid ${COLORS.gray20};
  border-radius: 8px;
  padding: 0 10px;
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
  padding: 10px;

  &::placeholder {
    color: ${COLORS.gray40};
  }

  @media (min-width: 834px) {
    width: 100%;
    height: 180px;
    padding: 16px;
    font-size: ${FONT.pc};
  }
`

export default ContentInput
