import { Harticon } from '@src/constants/icons'
import theme from '@src/constants/theme'
import { COLORS, FONT } from '@src/globalStyles'
import { useEffect, useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'
interface Props {
  data: POST_TYPE[]
  messege: string
}

const dateFormat = (dateVal: string) => {
  const nowDate = new Date(dateVal)
  const month = nowDate.getMonth()
  const date = nowDate.getDate()
  const hours = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
  const minutes = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes()

  return `${month}월 ${date}일 ${hours}:${minutes}`
}

const Board = ({ data, messege }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <BoardContainer>
        {data && data.length > 0 ? (
          <ul>
            {data.map((list) => (
              <PostListBox key={list.boardId} blind={list.transactionStatus}>
                <div className="imgae_wrap">
                  <img src={list.imageUrl} alt="이미지" />
                </div>
                <div className="info_wrap">
                  <p className="title">{list.title}</p>
                  <p className="price">{list.price.toLocaleString()} 원</p>
                  <p className="date">{dateFormat(list.registerDate)}</p>
                  <p className="view_like">
                    <span>조회수</span>
                    <span>{list.viewCount}</span>
                    <span>
                      <Harticon size="16" />
                    </span>
                    <span>{list.wishCount}</span>
                  </p>
                </div>
                {list.transactionStatus === '판매 완료' && <div className="sold_out">판매 완료</div>}
              </PostListBox>
            ))}
          </ul>
        ) : (
          <p>{messege}</p>
        )}
      </BoardContainer>
    </ThemeProvider>
  )
}

export default Board

const BoardContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  @media ${({ theme }) => theme.device.laptop} {
    padding-left: 4px;
    padding-right: 4px;
  }

  ul {
    width: 100%;
    max-width: calc(var(--screen-pc) + 16px);
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding-left: 16px;

    .imgae_wrap {
      width: 100%;
      background: #fff;
      border-radius: 20px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 20px;
        object-fit: contain;
        background-color: #d9d9d935;
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
      gap: 8px;

      .title {
        font-size: ${FONT.pc};
        font-weight: 400;
      }

      .price {
        font-size: ${FONT.pc};
        font-weight: 700;
      }

      .date {
        font-size: ${FONT.m};
        font-weight: 400;
      }

      .view_like {
        display: flex;
        gap: 4px;
        color: ${COLORS.gray40};
        font-size: ${FONT.m};
        font-weight: 400;

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

    .sold_out {
      width: 95px;
      height: 35px;
      line-height: 35px;
      border-radius: 16px;
      background: ${COLORS.green};
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: ${FONT.pc};
      font-weight: 900;
      color: #fff;
      text-align: center;
      z-index: 1;
    }
  }
`

const PostListBox = styled.li<{ blind: string | null }>`
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
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.blind === '판매 완료' ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.5);
  }
`
