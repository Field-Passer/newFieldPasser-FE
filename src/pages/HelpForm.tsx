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
            <FormDetailStyle>
              <h2>제목</h2>
              <input type="text" />
            </FormDetailStyle>
            <FormDetailStyle>
              <h2>내용</h2>
              <textarea cols={30} rows={10}></textarea>
            </FormDetailStyle>
          </FormStyle>
          <ButtonStyle>문의 등록</ButtonStyle>
        </Inner>
      ) : (
        <Inner>
          <Title screen="mobile" name="1:1 문의하기"></Title>
        </Inner>
      )}
    </>
  )
}

export default HelpForm

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
`

const FormDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h2 {
    font-size: ${FONT['pc-lg']};
  }
  input {
    padding: 16px 8px;
    border-radius: 8px;
    border: 1px solid ${COLORS.gray30};
    font-size: ${FONT.pc};
  }
  textarea {
    padding: 16px 8px;
    border-radius: 8px;
    border: 1px solid ${COLORS.gray30};
    font-size: ${FONT.pc};
    &:focus {
      border: 1px solid ${COLORS.gray30};
      outline: none;
    }
  }
`

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.green};
  color: #fff;
  width: 328px;
  height: 48px;
  font-size: ${FONT['pc-lg']};
  margin: 46px auto;
  border-radius: 8px;
`
