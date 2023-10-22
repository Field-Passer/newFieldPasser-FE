import { styled } from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import { useNavigate } from 'react-router'
import PATH from '@src/constants/pathConst'

interface IAsk {
  title: string
  comment: string
  screen: string
  info: QuestionGetTypes
}

const OneOnOne = ({ title, comment, screen, info }: IAsk) => {
  const navigate = useNavigate()
  return (
    <AskStyle screen={screen}>
      <div className="question">
        <h3 onClick={() => navigate(`${PATH.ASK}/${info.questionId}`)}>Q. {title}</h3>
        <span>{info.questionProcess}</span>
      </div>
      <div className="answer">{comment}</div>
    </AskStyle>
  )
}

export default OneOnOne

const AskStyle = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1024px;
  .question {
    display: flex;
    gap: 10px;
    h3 {
      font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
      font-size: ${({ screen }) => (screen === 'pc' ? FONT['pc-lg'] : FONT.pc)};
      cursor: pointer;
    }
    span {
      color: ${COLORS.gray40};
    }
  }

  .answer {
    padding: 16px 8px;
    background: #fafafa;
    border-radius: 8px;
    font-size: ${({ screen }) => screen === 'mobile' && '12px'};
  }
`
