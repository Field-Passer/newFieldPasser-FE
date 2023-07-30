import { districtOptions } from '@src/constants/options'
import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { ReactElement, useEffect, useState } from 'react'
import { BadmintonIcon, BasketballIcon, FutsalIcon, SoccerIcon, TennisIcon } from '@src/constants/icons'
import SearchForm from '@src/components/SearchForm'
import { useMediaQuery } from 'react-responsive'
import Board from '@src/components/Board'
import { getSearchPostList } from '@src/api/getApi'

const Main = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const [district, setDistrict] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const searchValue = {
    title: '',
    startTime: '',
    endTime: '',
    district: [district],
    category: category,
    date: '',
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  useEffect(() => {
    const getPostList = async () => {
      try {
        const postData = await getSearchPostList(searchValue)
        console.log(postData)
        setPostList(postData)
      } catch (err) {
        console.log(err)
      }
    }
    getPostList()
  }, [district, category])

  const categories: ICategories[] = [
    {
      category: 'futsal',
      name: '풋살장',
      icon: <FutsalIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'soccer',
      name: '축구장',
      icon: <SoccerIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'basketball',
      name: '농구장',
      icon: <BasketballIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'badminton',
      name: '배드민턴장',
      icon: <BadmintonIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'tennis',
      name: '테니스장',
      icon: <TennisIcon color={isActive ? COLORS.green : '#00000099'} />,
    },
  ]

  const sortOptions = ['가장 최신 순', '인기순', '낮은 가격 순', '높은 가격 순']

  return (
    <Container>
      <section className="search-section">
        <SearchForm />
      </section>
      <ListSection>
        <Category className={isMobile ? 'mobile' : 'pc'}>
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
        <Board data={postList} messege={'일치하는 조건의 게시글이 없습니다.'} />
      </ListSection>
    </Container>
  )
}

const Container = styled.main`
  display: block;
  font-size: ${FONT.m};
  margin: auto;
  max-width: 834px;

  .search-section {
    margin: auto;
    max-width: 560px;
  }
`

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
`
const Category = styled.div`
  height: 70px;
  display: flex;
  border-bottom: 1px solid ${COLORS.gray20};
  margin: auto;
  gap: 16px;

  @media (min-width: 600px) {
    gap: 28px;
    height: 102px;
    font-size: ${FONT.pc};
    border: none;
  }

  @media (min-width: 834px) {
    gap: 40px;
  }

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

    @media (min-width: 600px) {
      width: 80px;

      img {
        width: 32px;
        height: 32px;
      }
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
