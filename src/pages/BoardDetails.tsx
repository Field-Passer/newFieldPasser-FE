import { getPostDetail } from '@src/api/getApi'
import { BigHart, Harticon, MoreIcon } from '@src/constants/icons'
import theme from '@src/constants/theme'
import { dateFormat, handleImgError, randomImages } from '@src/hooks/utils'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ThemeProvider, styled } from 'styled-components'

const BoardDetails = () => {
  const boardId = useParams()
  const navigate = useNavigate()
  const [detailData, setDetailData] = useState<POST_TYPE>()
  const [moreBtnChk, setMoreBtnChk] = useState(false);

  const getDetailData = async () => {
    try {
      const postDetailData = await getPostDetail(Number(boardId.boardId))
      setDetailData(postDetailData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDetailData()
  }, [boardId])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleBox>
          <div>
            <p className="title">{detailData?.title}</p>
            <button>
              <BigHart size="20" />
            </button>
          </div>
          <div>
            <p className="date">예약일 {dateFormat(detailData?.startTime || '')}</p>
            <p className="price">{detailData?.price}</p>
          </div>
          <div>
            <p>
              <span className="user_name">{detailData?.memberName}</span>
              <span className="view">조회수 {detailData?.viewCount}</span>
              <span className="like"><Harticon size="14" /> {detailData?.wishCount}</span>
            </p>
            {
              // detailData?.myBoard && (
              <button onClick={() => moreBtnChk ? setMoreBtnChk(false) : setMoreBtnChk(true)}>
                <MoreIcon />
              </button>
              // )
            }
            {
              moreBtnChk && (
                <ul className='more_menu'>
                  <li><button>양도 완료하기</button></li>
                  <li><button>삭제</button></li>
                  <li><button>수정</button></li>
                </ul>
              )
            }
          </div>
        </TitleBox>
        <ContentBox>
          <div className="image_box">
            <img src={detailData?.imageUrl ? detailData?.imageUrl : randomImages(detailData?.categoryName || '', detailData?.boardId || 0)} onError={(e) => handleImgError(e, detailData?.categoryName || '', detailData?.boardId || 0)} alt="" />
          </div>
          <div className="content_text">
            <p>{detailData?.content}</p>
          </div>
        </ContentBox>
      </Container>

      <button onClick={() => navigate(`/edit/${boardId.boardId}`, { state: { data: detailData } })}>수정 test btn</button>
    </ThemeProvider>
  )
}
const Container = styled.div`
  max-width: calc(var(--screen-pc) + 40px);
  margin:32px auto 0;
`
const TitleBox = styled.div`
  padding: 0 20px;
  display:flex;
  flex-direction: column;
  gap:10px;
  margin-bottom:16px;

  div { 
    display:flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: bold;
    }

    .date {
      font-size: 16px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
    }

    .like {
      display:flex;
      align-items:center;
      gap:4px;
    }
  }
  
  div:last-child{
    position:relative;

    p {
      display:flex;
      align-items: center;
      gap:8px;
    }

    svg{
      cursor: pointer;
    }
  }

  .more_menu {
    position:absolute;
    top:35px;
    right:0;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    background:#fff;
    border:1px solid #ddd;
    width:120px;
    height:120px;
    padding:20px;
    box-sizing:border-box;
    font-size:14px;

    button {
      width:100%;
      text-align:left;
    }

    li:first-child button{
      font-weight: bold;
    }
  }
`

const ContentBox = styled.div`
  padding: 0 20px;

  .image_box {
    width:100%;
    margin-bottom:48px;

    img {
      width:100%;
    }
  }  

  .content_text {
    min-height:200px;
    font-size:16px;
    line-height:1.6;
    word-wrap:break-word;
  }
`

export default BoardDetails
