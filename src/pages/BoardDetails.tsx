import { getPostDetail } from '@src/api/getApi'
import { dateFormat } from '@src/components/Board'
import { Harticon } from '@src/constants/icons'
import theme from '@src/constants/theme'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ThemeProvider, styled } from 'styled-components'

const BoardDetails = () => {
  const boardId = useParams()
  const [detailData, setDetailData] = useState<POST_TYPE>()

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

  const hartClor = 'ddd'

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleBox>
          <div>
            <p className="title">{detailData?.title}</p>
            <Harticon size="20" color={hartClor} />
          </div>
          <div>
            <p className="date">예약일 {dateFormat(detailData?.startTime || '')}</p>
            <p className="price">{detailData?.price}</p>
          </div>
          <p>
            <span className="user_name">{detailData?.memberName}</span>
            <span className="view">조회수 {detailData?.viewCount}</span>
            <Harticon size="14" />
            <span className="like">{detailData?.wishCount}</span>
          </p>
        </TitleBox>
        <ContentBox>
          <div className="image_box">
            <img src={detailData?.imageUrl} alt="" />
          </div>
          <div className="content_text">
            <p>{detailData?.content}</p>
          </div>
        </ContentBox>
      </Container>

      <button>수정 test btn</button>
    </ThemeProvider>
  )
}
const Container = styled.div``
const TitleBox = styled.div`
  padding: 0 20px;
`

const ContentBox = styled.div`
  padding: 0 20px;
`

export default BoardDetails
