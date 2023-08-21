import { PlusIcon } from '@src/constants/icons'
import { COLORS, FONT } from '@src/globalStyles'
import styled from 'styled-components'

interface Props {
  title: string
  posts: POST_TYPE[]
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const PCBoardCard = ({ title, posts, onClick }: Props) => {
  return (
    <Container>
      <Title onClick={onClick}>
        <span>{title}</span>
        <PlusIcon color={COLORS.gray40} />
      </Title>
      <Text>{posts?.length ? posts.slice(0, 3).map((post, idx) => <span key={idx}>{post.title}</span>) : <span>게시글이 없습니다.</span>}</Text>
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
  cursor: pointer;
  span {
    font-weight: 700;
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
