import styled from 'styled-components'
import BoardCard from '@src/components/MyPage/BoardCard'

interface IProps {
  type: string
}

const CardLists = ({ type }: IProps) => {
  const lists = [
    {
      cardId: 0,
      address: '광나루 한강공원 농구장',
      title: '강동구 한강공원 농구장 양도',
      price: 30000,
      date: '06월 05일',
      time: '19:00',
      like: 3,
      done: true,
    },
    {
      cardId: 1,
      address: '북산고등학교 농구장',
      title: '북산고 농구장 양도',
      price: 50000,
      date: '05월 08일',
      time: '14:00',
      like: 14,
      done: false,
    },
    {
      cardId: 2,
      address: '의정부 생활 체육관',
      title: '민락동 축구장 양도',
      price: 10000,
      date: '07월 05일',
      time: '13:00',
      like: 1,
      done: false,
    },
  ]
  return (
    <Container>
      {lists.map((list) => (
        <BoardCard key={list.cardId} list={list} type={type} />
      ))}
    </Container>
  )
}

export default CardLists

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 16px;
`
