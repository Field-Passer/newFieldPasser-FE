import MobileMenu from '@src/components/MobileMenu'
import CommentLists from '@src/components/MyPage/CommentLists'
import CardLists from '@src/components/MyPage/CardLists'
import Title from '@src/components/Title'
import { Mobile } from '@src/hooks/useScreenHook'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import Inner from '@src/components/Inner'
import PCCardLists from '@src/components/MyPage/PCCardLists'

const MyPageDetail = () => {
  const [activeMenu, setActiveMenu] = useState(0)
  const menuLists = ['양도', '좋아요', '댓글']
  const activeList = (activeMenu: number, screen: string) => {
    if (activeMenu === 0 && screen === 'mobile') {
      return <CardLists type="handOver" />
    } else if (activeMenu === 1 && screen === 'mobile') {
      return <CardLists type="like" />
    } else if (activeMenu === 2 && screen === 'mobile') {
      return <CommentLists screen="mobile" />
    } else if (activeMenu === 0 && screen === 'pc') {
      return <PCCardLists />
    } else if (activeMenu === 1 && screen === 'pc') {
      return <PCCardLists />
    } else if (activeMenu === 2 && screen === 'pc') {
      return <CommentLists screen="pc" />
    }
  }

  const { state }: { state: number } = useLocation()

  useEffect(() => {
    state && setActiveMenu(state)
  }, [])

  const isPC = useMediaQuery({
    query: '(min-width: 834px)',
  })
  return (
    <>
      {isPC && (
        <Inner padding="64px 0">
          <Title screen="pc" name="작성 글 목록" />
          <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {activeList(activeMenu, 'pc')}
        </Inner>
      )}
      <Mobile>
        <Title screen="mobile" name="작성 글 목록" />
        <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {activeList(activeMenu, 'mobile')}
      </Mobile>
    </>
  )
}

export default MyPageDetail
