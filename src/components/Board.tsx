import theme from '@src/constants/theme'
import { COLORS, FONT } from '@src/globalStyles'
import { ThemeProvider, styled } from 'styled-components'

// 임시 type들 api 완성후 전부 빼겠습니다.
interface data {
  image: string
  stadium: string
  title: string
  price: number
  date: string
  view: number
  like: number
}

interface Props {
  data: data[]
}

// eslint-disable-next-line react/prop-types
const Board = ({ data }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <BoardContainer>
        <ul>
          {data.map((list, i) => (
            <li key={i}>
              <div className="imgae_wrap">
                <img src={list.image} alt="이미지" />
              </div>
              <div className="info_wrap">
                <p className="stadium">{list.stadium}</p>
                <p className="title">{list.title}</p>
                <p className="price">{list.price.toLocaleString()} 원</p>
                <div className="date">
                  <span>{list.date} </span>
                  <div className="view_like">
                    <span>조회수</span>
                    <span>{list.view}</span>
                    <span>하트</span>
                    <span>{list.like}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </BoardContainer>
    </ThemeProvider>
  )
}

export default Board

const BoardContainer = styled.div`
  padding: 20px;
  padding-right: 0;
  display: flex;
  justify-content: center;

  ul {
    @media ${({ theme }) => theme.device.laptop} {
      max-width: 100%;
    }
    max-width: calc(var(--screen-pc) + 16px);
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    li {
      width: calc(100% / 4 - 16px);
      @media ${({ theme }) => theme.device.laptop} {
        width: calc(100% / 3 - 16px);
      }
      @media ${({ theme }) => theme.device.tablet} {
        width: calc(100% / 2 - 16px);
      }
      @media ${({ theme }) => theme.device.mobile} {
        width: calc(100% - 16px);
      }
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 36px;

      .imgae_wrap {
        width: 100%;
        background: #ddd;
        border-radius: 20px;

        img {
          width: 100%;
        }

        &:after {
          content: '';
          display: block;
          padding-bottom: 100%;
        }
      }

      .info_wrap {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .stadium {
          color: ${COLORS.green};
          font-size: ${FONT.m};
          font-weight: 700;
        }
        .title {
          font-size: ${FONT.pc};
          font-weight: 400;
        }

        .price {
          font-size: ${FONT.pc};
          font-weight: 700;
        }

        .date {
          display: flex;
          justify-content: space-between;
          font-size: ${FONT.m};
          font-weight: 400;
        }

        .view_like {
          display: flex;
          gap: 4px;
          color: ${COLORS.gray40};
          font-size: ${FONT.m};
          font-weight: 400;
        }
      }
    }
  }
`
