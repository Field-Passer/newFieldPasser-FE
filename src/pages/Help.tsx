import Inner from '@src/components/Inner'
import styled from 'styled-components'
import { useState } from 'react'
import { COLORS } from '@src/globalStyles'
import { memberAccountList, dealManagementList, useEctlist } from '@src/constants/helpList'
import Ask from '@src/components/Ask'
import { Mobile } from '@src/hooks/useScreenHook'
import MobileMenu from '@src/components/MobileMenu'
import Title from '@src/components/Title'
import { useMediaQuery } from 'react-responsive'

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
  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  return (
    <>
      {isPC && (
        <Inner padding="32px 16px">
          <Title screen="pc" name="자주 묻는 질문" />
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
              <Ask key={list.listId} title={list.title} comment={list.comment} screen="pc" />
            ))}
          </AskListStyle>
          <OtherAskStyle>
            <span>원하는 답변이 없다면?</span>
            <button>등록하기</button>
          </OtherAskStyle>
        </Inner>
      )}
      <Mobile>
        <Inner width="100%">
          <Title screen="mobile" name="자주 묻는 질문" />
          <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <AskListStyle screen="mobile">
            {askList(activeMenu)?.map((list) => (
              <Ask key={list.listId} title={list.title} comment={list.comment} screen="mobile" />
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
