import MobileMenu from '@src/components/MobileMenu'
import CommentLists from '@src/components/MyPage/CommentLists'
import CardLists from '@src/components/MyPage/CardLists'
import Title from '@src/components/Title'
import { Mobile } from '@src/hooks/useScreenHook'
import { useState } from 'react'

const MyPageDetail = () => {
  const [activeMenu, setActiveMenu] = useState(0)
  const menuLists = ['양도', '좋아요', '댓글']
  const activeList = (activeMenu: number) => {
    if (activeMenu === 0) {
      return <CardLists type="handOver" />
    } else if (activeMenu === 1) {
      return <CardLists type="like" />
    } else if (activeMenu === 2) {
      return <CommentLists />
    }
  }
  return (
    <Mobile>
      <Title screen="mobile" name="작성 글 목록" />
      <MobileMenu menuLists={menuLists} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {activeList(activeMenu)}
    </Mobile>
  )
}

export default MyPageDetail
