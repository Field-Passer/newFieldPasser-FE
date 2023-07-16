import { districtOptions } from '@src/constants/options'
import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { ReactElement, useState } from 'react'
import { BadmintonIcon, BasketballIcon, FutsalIcon, SoccerIcon, TennisIcon } from '@src/constants/icons'
import SearchForm from '@src/components/SearchForm'

interface ICategories {
  category: string
  name: string
  icon: ReactElement
}

const Main = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const categories: ICategories[] = [
    {
      category: 'futsal',
      name: '풋살',
      icon: <FutsalIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'soccer',
      name: '축구',
      icon: <SoccerIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'basketball',
      name: '농구',
      icon: <BasketballIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'tennis',
      name: '테니스',
      icon: <TennisIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'badminton',
      name: '배드민턴',
      icon: <BadmintonIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
  ]

  const sortOptions = ['가장 최신 순', '인기순', '낮은 가격 순', '높은 가격 순']

  return (
    <Container>
      <SearchForm />
      <ListSection>
        <Category>
          {categories.map((item) => {
            return (
              <div key={item.category} className="icon">
                {item.icon}
                <span>{item.name}</span>
              </div>
            )
          })}
        </Category>
        <Options>
          <select name="district" required defaultValue="지역">
            <option value="지역" disabled className="default">
              지역
            </option>
            {districtOptions.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select name="sort" required defaultValue="정렬">
            <option value="정렬" disabled className="default">
              정렬
            </option>
            {sortOptions.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </Options>
      </ListSection>
    </Container>
  )
}

const Container = styled.main`
  display: block;
  font-size: ${FONT.m};
  width: 360px;
  margin: auto;
`

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`
const Category = styled.div`
  height: 70px;
  display: flex;
  gap: 16px;
  border-bottom: 1px solid ${COLORS.gray20};

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 52px;
    height: 70px;
    align-items: center;
    margin: auto;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }
  }
`

const Options = styled.div`
  display: flex;
  gap: 14px;

  select {
    width: 100px;
    height: 32px;
    border: 1px solid ${COLORS.green};
    border-radius: 8px;
    color: ${COLORS.green};
    padding: 4px 8px;
  }
`

export default Main
