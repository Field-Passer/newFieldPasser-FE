import { Harticon } from '@src/constants/icons'
import theme from '@src/constants/theme'
import { COLORS, FONT } from '@src/globalStyles'
import { dateFormat, handleImgError, randomImages } from '@src/utils/utils'
import { useNavigate } from 'react-router'
import { ThemeProvider, styled } from 'styled-components'

interface Props {
  data: POST_TYPE[] | IWishlistType[]
  message: string
}

const Board = ({ data, message }: Props) => {
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <BoardContainer>
        {data && data.length > 0 ? (
          <ul>
            {data.map((list, idx) => (
              <PostListBox
                key={idx}
                blind={list.transactionStatus}
                onClick={() => navigate(`/board-details/${list.boardId}`)}
              >
                <div className="imgae_wrap">
                  <img
                    src={list.imageUrl ? list.imageUrl : randomImages(list.categoryName, list.boardId)}
                    onError={(e) => handleImgError(e, list.categoryName, list.boardId)}
                    alt="이미지"
                  />
                </div>
                <div className="info_wrap">
                  <p className="title">{list.title}</p>
                  <p className="price">{list.price.toLocaleString()} 원</p>
                  <p className="date">
                    {list.districtName} {dateFormat(list.startTime)}
                  </p>
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
          <MessageBox>
            <p>{message}</p>
          </MessageBox>
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
        object-fit: cover;
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
  cursor: pointer;

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

const MessageBox = styled.div`
  min-height: 500px;
`
