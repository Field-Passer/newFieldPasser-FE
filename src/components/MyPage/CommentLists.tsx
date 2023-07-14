import { COLORS, FONT } from '@src/globalStyles'
import styled from 'styled-components'

interface IProps {
  screen: string
}

const CommentLists = ({ screen }: IProps) => {
  const comments = [
    {
      commentId: 0,
      boardTitle: '광나루 한강공원 농구장 양도',
      content: '저 양도 받을래요!',
      date: '23년 06월 19일',
      reply: 1,
    },
    {
      commentId: 1,
      boardTitle: '뚝섬한강공원 베드민턴장 양도',
      content: '저 양도 받을래요!',
      date: '23년 06월 19일',
      reply: 1,
    },
    {
      commentId: 2,
      boardTitle: '한강 농구장 양도',
      content: '저 양도 받을래요!',
      date: '23년 06월 19일',
      reply: 2,
    },
    {
      commentId: 3,
      boardTitle: '북산고 농구장 양도',
      content: '저 양도 받을래요!',
      date: '23년 06월 19일',
      reply: 5,
    },
    {
      commentId: 4,
      boardTitle: '북산고 농구장 양도',
      content: '양도 끝났나요?',
      date: '23년 06월 19일',
      reply: 0,
    },
  ]
  return (
    <Container screen={screen}>
      {comments.map((comment) => (
        <CommentBox key={comment.commentId}>
          <BoardTitle screen={screen}>{comment.boardTitle}</BoardTitle>
          <Content screen={screen}>{comment.content}</Content>
          <Des screen={screen}>
            <div>
              <img src="/calendar.svg" alt="달력" />
              <span>{comment.date}</span>
            </div>
            <div>
              <img src="/chat_bubble.svg" alt="댓글" />
              <span>{comment.reply}</span>
            </div>
          </Des>
        </CommentBox>
      ))}
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
