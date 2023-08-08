import { styled } from 'styled-components'

interface IAsk {
  title: string
  comment: string
  screen: string
}

const Ask = ({ title, comment, screen }: IAsk) => {
  return (
    <AskStyle screen={screen}>
      <h3>Q. {title}</h3>
      <div>A. {comment}</div>
    </AskStyle>
  )
}

export default Ask

const AskStyle = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h3 {
    font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
  }
  div {
    padding: 16px 8px;
    background: #fafafa;
    border-radius: 8px;
    font-size: ${({ screen }) => screen === 'mobile' && '12px'};
  }
`
