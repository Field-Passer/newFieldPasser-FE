import { districtOptions, sortOptions } from '@src/constants/options'
import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import {
  BadmintonIcon,
  BasketballIcon,
  DownwardArrowIcon,
  FutsalIcon,
  SoccerIcon,
  TennisIcon,
} from '@src/constants/icons'
import SearchForm from '@src/components/SearchForm'
import { useMediaQuery } from 'react-responsive'
import Board from '@src/components/Board'
import useInfinityScroll from '@src/hooks/useInfinityScroll'
import { categoryNamesList } from '@src/constants/options'
import Loading from '@src/components/Style/loading'

const Main = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false)
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false)
  const [selectedSortOption, setSelectedSortOption] = useState<string>('정렬')
  const [isActive, setIsActive] = useState({
    futsal: true,
    soccer: false,
    basketball: false,
    badminton: false,
    tennis: false,
  })
  const [payload, setPayload] = useState({
    districtName: '',
    categoryName: '풋살장',
  })
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<POST_TYPE[]>([])
  const { isLoading, getPostList, ref } = useInfinityScroll({ payload, page, setPostList, setPage })

  useEffect(() => {
    getPostList(payload, page)
  }, [page, payload])

  useEffect(() => {
    setSelectedSortOption('정렬')
  }, [payload])

  useEffect(() => {
    switch (selectedSortOption) {
      case '인기순':
        setPostList([...postList.sort((a, b) => b.viewCount - a.viewCount)])
        break
      case '가장 최신 순':
        setPostList([...postList.sort((a, b) => +b.boardId - +a.boardId)])
        break
      case '낮은 가격 순':
        setPostList([...postList.sort((a, b) => a.price - b.price)])
        break
      case '높은 가격 순':
        setPostList([...postList.sort((a, b) => b.price - a.price)])
        break
      default:
        setPostList([...postList.sort((a, b) => +b.boardId - +a.boardId)])
        break
    }
  }, [selectedSortOption])

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
        setPayload({ categoryName: '풋살장', districtName: payload.districtName })
        break
      case 'soccer':
        setIsActive({
          futsal: false,
          soccer: true,
          basketball: false,
          badminton: false,
          tennis: false,
        })
        setPayload({ categoryName: '축구장', districtName: payload.districtName })
        break
      case 'basketball':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: true,
          badminton: false,
          tennis: false,
        })
        setPayload({ categoryName: '농구장', districtName: payload.districtName })
        break
      case 'badminton':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: false,
          badminton: true,
          tennis: false,
        })
        setPayload({ categoryName: '배드민턴장', districtName: payload.districtName })
        break
      case 'tennis':
        setIsActive({
          futsal: false,
          soccer: false,
          basketball: false,
          badminton: false,
          tennis: true,
        })
        setPayload({ categoryName: '테니스장', districtName: payload.districtName })
        break
    }
  }
  return (
    <Container>
      {!isMobile && (
        <section
          className="banner-section"
          style={{ backgroundImage: `url('/banner${Math.floor(Math.random() * 5)}.png')` }}
        >
          <div className="background"></div>
          <div className="text">
            <div className="big">
              <span>아까운</span>
              <span className="highlight">양도수수료</span>
            </div>
            <div>이제 버리지 말고 양도 하세요!</div>
            <div className="small">
              <span>간단한 가입절차와 상세한 게시글 필터 기능으로</span>
              <span>간편하게 체육시설을 양도/양수해보세요!</span>
            </div>
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
                <span className={isActive[item.category as typeof categoryNamesList] ? 'green' : ''}>{item.name}</span>
              </div>
            )
          })}
        </Category>
        <Options>
          <div className="select-cover">
            {isDistrictOpen ? (
              <div
                className="select-open district"
                onClick={() => {
                  setIsDistrictOpen(false)
                }}
              >
                <div
                  className="default option"
                  onClick={() => setPayload({ districtName: '', categoryName: payload.categoryName })}
                >
                  지역
                </div>
                {districtOptions.map((item) => {
                  return (
                    <div
                      key={item}
                      className="option"
                      onClick={() => {
                        setPayload({ districtName: item, categoryName: payload.categoryName })
                      }}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            ) : (
              <button
                className={payload.districtName !== '' ? 'select-close selected' : 'select-close'}
                onClick={() => {
                  setIsDistrictOpen(true)
                }}
              >
                {payload.districtName ? payload.districtName : '지역'}
                <DownwardArrowIcon />
              </button>
            )}
          </div>
          <div className="select-cover">
            {isSortOpen ? (
              <div
                className="select-open sort"
                onClick={() => {
                  setIsSortOpen(false)
                }}
              >
                <div
                  className="default option"
                  onClick={() => {
                    setSelectedSortOption('정렬')
                  }}
                >
                  정렬
                </div>
                {sortOptions.map((item) => {
                  return (
                    <div
                      key={item}
                      className="option"
                      onClick={() => {
                        setSelectedSortOption(item)
                      }}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            ) : (
              <button
                className={selectedSortOption !== '정렬' ? 'select-close selected' : 'select-close'}
                onClick={() => {
                  setIsSortOpen(true)
                }}
              >
                {selectedSortOption}
                <DownwardArrowIcon />
              </button>
            )}
          </div>
        </Options>
        <Board data={postList} message={'일치하는 조건의 게시글이 없습니다.'} />
        {!isLoading && <div ref={ref}></div>}
        {isLoading && <Loading />}
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
    position: relative;
    width: 100%;
    height: 312px;
    max-width: 1024px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    font-size: 30px;
    font-weight: 900;
    line-height: 40px;

    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #000000e9, #52525213);
    }

    .text {
      position: absolute;
      padding: 96px 0 0 15px;
    }

    .big {
      display: flex;
      gap: 10px;

      .highlight {
        color: black;
        text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
      }
    }
    .small {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      font-size: 15px;
      font-weight: 400;
      margin-top: 20px;
    }
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
  position: relative;
  display: flex;
  gap: 14px;
  padding: 0 16px;
  height: 32px;

  .select-cover {
    position: relative;
    width: 100px;

    .default {
      color: ${COLORS.green};
    }

    .option {
      width: 100px;
      height: 32px;
      line-height: 22px;
      cursor: pointer;
      padding: 4px 8px;
      box-sizing: border-box;
    }

    .select-close {
      width: 100px;
      height: 32px;
      font-size: 14px;
      border: 1px solid ${COLORS.green};
      border-radius: 8px;
      color: ${COLORS.green};
      text-align: start;
      padding: 4px 8px;

      svg {
        position: absolute;
        right: 10%;
      }
    }

    .selected {
      background-color: ${COLORS.green};
      color: white;
    }

    .select-open {
      position: absolute;
      cursor: pointer;
      border: 1px solid ${COLORS.green};
      border-radius: 8px;
      width: 100px;
      overflow: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
      z-index: 10;
      background-color: white;

      &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리, 오페라, 엣지 */
      }
      scrollbar-width: none; /* 파이어폭스 */

      &.district {
        height: 228px;
      }
    }
  }
`

export default Main
