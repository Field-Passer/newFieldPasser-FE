import styled from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'

interface IProps {
  menuLists: string[]
  activeMenu: number
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>
}

const MobileMenu = ({ menuLists, activeMenu, setActiveMenu }: IProps) => {
  return (
    <MenuStyle>
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
    </MenuStyle>
  )
}

export default MobileMenu

const MenuStyle = styled.menu`
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
