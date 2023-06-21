import Inner from '@src/components/Inner'
import styled from 'styled-components'

const Help = () => {
  return (
    <Inner>
      <TitleStyle>자주 묻는 질문</TitleStyle>
      <MenuStyle>
        <li>회원 / 계정</li>
        <li>거래 분쟁 / 운영 정책</li>
        <li>이용 방법 / 기타</li>
      </MenuStyle>
    </Inner>
  )
}

export default Help

const TitleStyle = styled.h1`
  font-size: 24px;
  text-align: center;
`

const MenuStyle = styled.menu``
