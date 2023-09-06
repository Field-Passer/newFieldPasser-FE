import { COLORS, FONT } from '@src/globalStyles'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { getMyReply } from '@src/api/authApi'
import ReactPaginate from 'react-paginate'

interface IProps {
  screen: string
}

const CommentLists = ({ screen }: IProps) => {
  const [comments, setComments] = useState<CommentTypes[]>([])
  const [totalPage, setTotalPage] = useState<number>(1)

  const fetchData = async (page = 1) => {
    const response = await getMyReply(page)
    setComments(response?.data)
    setTotalPage(response?.totalPages)
  }
  useEffect(() => {
    fetchData(1)
  }, [])

  const handlePage = (event: { selected: number }) => {
    fetchData(event.selected + 1)
  }
  return (
    <Container screen={screen}>
      {comments?.length ? (
        <>
          {comments?.map((comment) => (
            <CommentBox key={comment.commentId}>
              <BoardTitle screen={screen}>{comment.title}</BoardTitle>
              <Content screen={screen}>{comment.commentContent}</Content>
              <Des screen={screen}>
                <div>
                  <img src="/calendar.svg" alt="달력" />
                  <span>{comment.commentUpDate.slice(0, 10)}</span>
                </div>
                <div>
                  <img src="/chat_bubble.svg" alt="댓글" />
                  <span>{comment.children.length}</span>
                </div>
              </Des>
            </CommentBox>
          ))}
          <Paginate screen={screen}>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              onPageChange={handlePage}
              breakLabel="..."
              pageCount={totalPage}
              className="paginate"
            />
          </Paginate>
        </>
      ) : (
        <NoComment>댓글이 없습니다.</NoComment>
      )}
    </Container>
  )
}

export default CommentLists

const Container = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT.m)};
`

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid ${COLORS.gray10};
  padding: 16px;
`
const BoardTitle = styled.span<IProps>`
  font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT.m)};
  color: ${COLORS.gray40};
`

const Content = styled.span<IProps>`
  font-size: ${({ screen }) => (screen === 'pc' ? FONT.pc : FONT.m)};
`

const Des = styled.div<IProps>`
  display: flex;
  gap: 11px;
  div {
    display: flex;
    align-items: center;
    gap: 6px;
    span {
      color: ${COLORS.gray40};
      font-weight: 400;
      font-size: ${({ screen }) => (screen === 'pc' ? FONT.m : '12px ')};
    }
  }
`

const NoComment = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`

const Paginate = styled.div<StyleProps>`
  .paginate {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    color: ${COLORS.gray30};
    font-size: ${({ screen }) => (screen === 'pc' ? '20px' : '14px')};
    .previous {
      color: ${COLORS.green};
    }
    .next {
      color: ${COLORS.green};
    }
    .selected {
      color: ${COLORS.green};
    }
  }
`
