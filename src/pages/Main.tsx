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
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const [district, setDistrict] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [background, setBackground] = useState<string>('')
  const searchValue = {
    title: '',
    startTime: '',
    endTime: '',
    district: [district],
    category: category,
    date: '',
  }
  const [isActive, setIsActive] = useState({
    futsal: true,
    soccer: false,
    basketball: false,
    badminton: false,
    tennis: false,
  })

  useEffect(() => {
    setBackground(`/banner${Math.floor(Math.random() * 5)}.png`)
  }, [])

  useEffect(() => {
    // api재요청 / 무한스크롤이면?
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
      name: '풋살',
      icon: <FutsalIcon color={isActive.futsal ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'soccer',
      name: '축구',
      icon: <SoccerIcon color={isActive.soccer ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'basketball',
      name: '농구',
      icon: <BasketballIcon color={isActive.basketball ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'badminton',
      name: '배드민턴',
      icon: <BadmintonIcon color={isActive.badminton ? COLORS.green : '#00000099'} />,
    },
    {
      category: 'tennis',
      name: '테니스',
      icon: <TennisIcon color={isActive.tennis ? COLORS.green : '#00000099'} />,
    },
  ]

  const sortOptions = ['가장 최신 순', '인기순', '낮은 가격 순', '높은 가격 순']

  const handleClickCategory = (category: string) => {
    switch (category) {
      case 'futsal':
        setIsActive({
          futsal: true,
          soccer: false,
          basketball: false,
          badminton: false,
          tennis: false,
        })
        setCategory('풋살장')
        break
      case 'soccer':
        setIsActive({
          futsal: false,
          soccer: true,
          basketball: false,
          badminton: false,
          tennis: false,
        })
        setCategory('축구장')
        break
      case 'basketball':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: true,
          badminton: false,
          tennis: false,
        })
        setCategory('농구장')
        break
      case 'badminton':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: false,
          badminton: true,
          tennis: false,
        })
        setCategory('배드민턴장')
        break
      case 'tennis':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: false,
          badminton: false,
          tennis: true,
        })
        setCategory('테니스장')
        break
    }
  }

  return (
    <Container>
      {!isMobile && (
        <section className="banner-section" style={{ backgroundImage: `url(${background})` }}>
          <div className="text">
            <div className="first">
              <span>아까운</span> <span>양도수수료</span>
            </div>
            <div className="second">이제 버리지 말고 양도 하세요!</div>
            <div className="third">간단한 가입절차와 상세한 게시글 필터 기능으로 간편하게 체육시설을 양도/양수해보세요!</div>
          </div>
        </section>
      )}
      <section className="search-section">
        <SearchForm />
      </section>
      <ListSection>
        <Category className={isMobile ? 'mobile' : 'pc'}>
          {categories.map((item) => {
            return (
              <div
                key={item.category}
                className="icon"
                onClick={() => {
                  handleClickCategory(item.category)
                }}
              >
                {item.icon}
                <span className={isActive[item.category] ? 'green' : ''}>{item.name}</span>
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
  max-width: 1024px;

  .banner-section {
    width: 100%;
    height: 312px;
    max-width: 1024px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .search-section {
    margin: auto;
    max-width: 560px;
  }
`

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const Category = styled.div`
  height: 70px;
  display: flex;
  border-bottom: 1px solid ${COLORS.gray20};
  margin: auto;
  gap: 16px;

  @media (max-width: 599px) {
    width: 100%;
  }

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

    .green {
      color: ${COLORS.green};
    }
  }
`

const Options = styled.div`
  display: flex;
  gap: 14px;
  padding: 0 16px;

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
