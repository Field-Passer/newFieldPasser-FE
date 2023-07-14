import { PlusIcon } from '@src/constants/icons'
import { COLORS, FONT } from '@src/globalStyles'
import styled from 'styled-components'

interface Props {
  title: string
}

const PCBoardCard = ({ title }: Props) => {
  return (
    <Container>
      <Title>
        <span>{title}</span>
        <PlusIcon color={COLORS.gray40} />
      </Title>
      <Text>
        <span>강동구 광나루 한강공원 농구장 양도</span>
        <span>중구 광나루 한강공원 축구장 양도</span>
      </Text>
    </Container>
  )
}

export default PCBoardCard

const Container = styled.div`
  background-color: ${COLORS.gray10};
  width: 257px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  color: ${COLORS.gray40};
  span {
    font-size: ${FONT.pc};
    font-weight: 400;
  }
`
