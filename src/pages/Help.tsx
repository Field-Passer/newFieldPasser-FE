import Inner from '@src/components/Inner'
import styled from 'styled-components'
import { useState } from 'react'
import { COLORS } from '@src/globalStyles'
import {
  memberAccountList,
  dealManagementList,
  useEctlist,
} from '@src/constants/helpList'
import Ask from '@src/components/Ask'

const Help = () => {
  const menuLists = ['회원 / 계정', '거래 분쟁 / 운영 정책', '이용 방법 / 기타']
  const [activeMenu, setActiveMenu] = useState(0)
  const askList = (activeMenu: number) => {
    if (activeMenu === 0) {
      return memberAccountList
    } else if (activeMenu === 1) {
      return dealManagementList
    } else if (activeMenu === 2) {
      return useEctlist
    }
  }
  return (
    <Inner padding="32px 16px">
      <TitleStyle>자주 묻는 질문</TitleStyle>
      <MenuStyle>
        {menuLists.map((list, i) => (
          <li
            key={i}
            onClick={() => setActiveMenu(i)}
            style={{
              color: `${activeMenu === i ? COLORS.green : COLORS.font}`,
              fontWeight: `${activeMenu === i ? 700 : 400}`,
            }}
          >
            {list}
          </li>
        ))}
      </MenuStyle>
      <AskListStyle>
        {askList(activeMenu)?.map((list) => (
          <Ask key={list.listId} title={list.title} comment={list.comment} />
        ))}
      </AskListStyle>
      <OtherAskStyle>
        <span>원하는 답변이 없다면?</span>
        <button>등록하기</button>
      </OtherAskStyle>
    </Inner>
  )
}

export default Help

const TitleStyle = styled.h1`
  font-size: 24px;
  text-align: center;
  font-family: 'NanumSquareNeo-Variable';
  font-weight: 700;
`

const MenuStyle = styled.menu`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 64px 0;
  li {
    cursor: pointer;
    font-size: 20px;
  }
`

const AskListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const OtherAskStyle = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  button {
    display: flex;
    width: 328px;
    padding: 16px 56px;
    justify-content: center;
    background-color: ${COLORS.green};
    color: white;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Pretendard-Regular';
  }
`
