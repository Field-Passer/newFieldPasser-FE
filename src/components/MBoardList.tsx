import { Harticon } from '@src/constants/icons'
import { randomImages, handleImgError } from '@src/hooks/utils'
import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import { useNavigate } from 'react-router'

interface Props {
  post: POST_TYPE | IWishlistType
}

const MBoardList = ({ post }: Props) => {
  const navigate = useNavigate()
  return (
    <ListContainer onClick={() => navigate(`/board-details/${post.boardId}`)}>
      <ImgWrap>
        <img
          src={post.imageUrl ? post.imageUrl : randomImages(post.categoryName, post.boardId)}
          onError={(e) => handleImgError(e, post.categoryName, post.boardId)}
          alt="이미지"
        />
      </ImgWrap>
      <DesContainer>
        <span className="title">{post.title}</span>
        <span className="price">{post.price.toLocaleString()} 원</span>
        <span className="time">
          {post.startTime.slice(0, 10)} {post.startTime.slice(11, 16)}
        </span>
        <div className="count-box">
          <span className="count">조회수 {post.viewCount}</span>
          <span className="wish">
            <Harticon size="16" /> {post.wishCount}
          </span>
        </div>
        <StatusBadge>판매 완료</StatusBadge>
        {post.transactionStatus === '판매 완료' && <StatusBadge>판매 완료</StatusBadge>}
      </DesContainer>
    </ListContainer>
  )
}

export default MBoardList

const ListContainer = styled.li`
  width: 100%;
  height: 86px;
  display: flex;
  gap: 16px;
  cursor: pointer;
`

const ImgWrap = styled.div`
  img {
    width: 84px;
    height: 84px;
    object-fit: cover;
    border-radius: 8px;
  }
`

const DesContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: ${FONT.pc};
  justify-content: space-between;
  .price {
    font-weight: 700;
  }
  .count-box {
    display: flex;
    align-items: center;
    gap: 13px;
    .wish {
      display: flex;
      align-items: center;
    }
  }
`

const StatusBadge = styled.div`
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${COLORS.green};
  position: absolute;
  color: #fff;
  right: 0px;
  bottom: 0px;
`
