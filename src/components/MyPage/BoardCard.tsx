import { COLORS, FONT } from '@src/globalStyles'
import { IoIosHeartEmpty } from 'react-icons/io'
import styled from 'styled-components'

interface IProps {
  type: string
  list: {
    cardId: number
    address: string
    title: string
    price: number
    date: string
    time: string
    like: number
    done: boolean
  }
}

const BoardCard = ({ type, list }: IProps) => {
  return (
    <CardStyle done={type === 'handOver' && list.done}>
      <img src="/test_image.png" alt="썸네일" />
      <DesStyle>
        <DesTitle>
          <span>{list.address}</span>
          {type === 'like' && <img src="/fill_heart.svg" alt="좋아요" />}
        </DesTitle>
        <span>{list.title}</span>
        <Price>{list.price}원</Price>
        <DesContainer>
          <DesContent>
            <span>{list.date}</span>
            <span>{list.time}</span>
            <div>
              <IoIosHeartEmpty /> {list.like}
            </div>
          </DesContent>
          {type === 'handOver' && list.done && <Done>거래 완료</Done>}
        </DesContainer>
      </DesStyle>
    </CardStyle>
  )
}

export default BoardCard

interface StyleProps {
  done: boolean
}

const CardStyle = styled.div<StyleProps>`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 16px;
  font-size: ${FONT.m};
  opacity: ${({ done }) => (done ? 0.5 : 1)};
  img {
    width: 86px;
    height: 86px;
  }
`

const DesStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 0;
`

const DesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLORS.green};
  font-weight: 700;
  font-size: 12px;
  img {
    height: 17px;
    width: 17px;
  }
`

const Price = styled.span`
  font-weight: 700;
`

const DesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DesContent = styled.div`
  display: flex;
  gap: 8px;
  span {
    font-size: 12px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    span {
      font-size: 12px;
    }
  }
`

const Done = styled.div`
  background: ${COLORS.green};
  color: white;
  width: 40px;
  height: 12px;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  opacity: 1;
`
