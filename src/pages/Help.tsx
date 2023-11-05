import styled from 'styled-components'
import { useState } from 'react'
import { COLORS } from '@src/globalStyles'
import { memberAccountList, dealManagementList, useEctlist } from '@src/constants/helpList'
import Ask from '@src/components/AskAndHelp/Ask'
import { Mobile } from '@src/hooks/useScreenHook'
import MobileMenu from '@src/components/Style/MobileMenu'
import Title from '@src/components/Style/Title'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import PATH from '@src/constants/pathConst'

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

  const navigate = useNavigate()

  return (
    <>
      {isPC ? (
        <Container>
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
            <button onClick={() => navigate(PATH.HELP_FORM)}>등록하기</button>
          </OtherAskStyle>
        </Container>
      ) : (
        <Mobile>
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
        </Mobile>
      )}
    </>
  )
}

export default Help

const Container = styled.div`
  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto;
  max-width: 1024px;
  padding: 0 16px;
`

const MenuStyle = styled.menu`
  display: flex;
  justify-content: center;
  gap: 3em;
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
