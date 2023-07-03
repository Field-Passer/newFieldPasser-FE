import styled from 'styled-components'
import { FONT } from '@src/globalStyles'

interface IProps {
  screen: string
  name: string
}

const Title = ({ screen, name }: IProps) => {
  return <TitleStyle screen={screen}>{name}</TitleStyle>
}

export default Title

interface StyleProps {
  screen: string
}

const TitleStyle = styled.h1<StyleProps>`
  font-size: ${({ screen }) => (screen === 'pc' ? '24px' : FONT['m-lg'])};
  text-align: center;
  font-family: 'NanumSquareNeo-Variable';
  font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
  margin: ${({ screen }) => screen === 'mobile' && '11px 0 14px 0'};
`
