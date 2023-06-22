import { styled } from 'styled-components'

interface IAsk {
  title: string
  comment: string
}

const Ask = ({ title, comment }: IAsk) => {
  return (
    <AskStyle>
      <h3>Q. {title}</h3>
      <div>A. {comment}</div>
    </AskStyle>
  )
}

export default Ask

const AskStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h3 {
    font-weight: 700;
  }
  div {
    padding: 16px 8px;
    background: #fafafa;
    border-radius: 8px;
  }
`
