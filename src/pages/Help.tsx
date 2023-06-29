import Inner from '@src/components/Inner'
import styled from 'styled-components'
import { useState } from 'react'
import { COLORS, FONT } from '@src/globalStyles'
import {
  memberAccountList,
  dealManagementList,
  useEctlist,
} from '@src/constants/helpList'
import Ask from '@src/components/Ask'
import { Mobile, PC, Tablet } from '@src/hooks/useScreenHook'

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
    <>
      <PC>
        <Inner padding="32px 16px">
          <TitleStyle screen="pc">자주 묻는 질문</TitleStyle>
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
          <AskListStyle screen="pc">
            {askList(activeMenu)?.map((list) => (
              <Ask
                key={list.listId}
                title={list.title}
                comment={list.comment}
                screen="pc"
              />
            ))}
          </AskListStyle>
          <OtherAskStyle>
            <span>원하는 답변이 없다면?</span>
            <button>등록하기</button>
          </OtherAskStyle>
        </Inner>
      </PC>
      <Tablet>
        <Inner padding="32px 16px">
          <TitleStyle screen="pc">자주 묻는 질문</TitleStyle>
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
          <AskListStyle screen="pc">
            {askList(activeMenu)?.map((list) => (
              <Ask
                key={list.listId}
                title={list.title}
                comment={list.comment}
                screen="pc"
              />
            ))}
          </AskListStyle>
          <OtherAskStyle>
            <span>원하는 답변이 없다면?</span>
            <button>등록하기</button>
          </OtherAskStyle>
        </Inner>
      </Tablet>
      <Mobile>
        <Inner width="100%">
          <TitleStyle screen="mobile">자주 묻는 질문</TitleStyle>
          <MobileMenuStyle>
            {menuLists.map((list, i) => (
              <li
                key={i}
                onClick={() => setActiveMenu(i)}
                style={{
                  color: `${activeMenu === i ? COLORS.green : '#d9d9d9'}`,
                  fontWeight: `${activeMenu === i ? 700 : 400}`,
                  borderBottom: `${
                    activeMenu === i ? `solid 2px ${COLORS.green}` : 'none'
                  }`,
                }}
              >
                {list}
              </li>
            ))}
          </MobileMenuStyle>
          <AskListStyle screen="mobile">
            {askList(activeMenu)?.map((list) => (
              <Ask
                key={list.listId}
                title={list.title}
                comment={list.comment}
                screen="mobile"
              />
            ))}
          </AskListStyle>
          <OtherAskStyle>
            <span>원하는 답변이 없다면?</span>
            <button>등록하기</button>
          </OtherAskStyle>
        </Inner>
      </Mobile>
    </>
  )
}

export default Help

interface StyleProps {
  screen: string
}

const TitleStyle = styled.h1<StyleProps>`
  font-size: ${({ screen }) => (screen === 'pc' ? '24px' : FONT['m-lg'])};
  text-align: center;
  font-family: 'NanumSquareNeo-Variable';
  font-weight: ${({ screen }) => (screen === 'pc' ? 700 : 500)};
  margin: ${({ screen }) => screen === 'mobile' && '11px 0 14px 0'};
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

const MobileMenuStyle = styled.menu`
  display: flex;
  gap: 2px;
  padding: 0px 16px;
  align-items: center;
  li {
    cursor: pointer;
    font-size: ${FONT.m};
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    color: var(--unnamed, #aaa);
    font-weight: 400;
    letter-spacing: -1.4px;
  }
  border-bottom: 1px solid var(--unnamed, #d9d9d9);
`

const AskListStyle = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ screen }) => (screen === 'pc' ? '24px' : '16px')};
  padding: ${({ screen }) => screen === 'mobile' && '16px'};
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
