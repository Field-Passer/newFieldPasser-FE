import Inner from '@src/components/Inner'
import Title from '@src/components/Title'
import { COLORS, FONT } from '@src/globalStyles'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const HelpForm = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })
  return (
    <>
      {isPC ? (
        <Inner padding="64px 0">
          <Title screen="pc" name="1:1 문의하기" />
          <FormStyle>
            <FormDetailStyle screen="pc">
              <h2>제목</h2>
              <input type="text" />
            </FormDetailStyle>
            <FormDetailStyle screen="pc">
              <h2>내용</h2>
              <textarea cols={30} rows={10}></textarea>
            </FormDetailStyle>
            <ButtonStyle screen="pc">문의 등록</ButtonStyle>
          </FormStyle>
        </Inner>
      ) : (
        <Inner width="100%" padding="16px 0">
          <Title screen="mobile" name="1:1 문의하기" />
          <FormStyle>
            <FormDetailStyle screen="mobile">
              <h2>제목</h2>
              <input type="text" />
            </FormDetailStyle>
            <FormDetailStyle screen="mobile">
              <h2>내용</h2>
              <textarea cols={30} rows={10}></textarea>
            </FormDetailStyle>
            <ButtonStyle screen="mobile">문의 등록</ButtonStyle>
          </FormStyle>
        </Inner>
      )}
    </>
  )
}

export default HelpForm

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

const ButtonStyle = styled.div<StyleProps>`
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
