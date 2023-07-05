import { districtOptions } from '@src/constants/options'
import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { FiSearch } from 'react-icons/fi'

const Main = () => {
  const categories = [
    ['futsal', '풋살'],
    ['soccer', '축구'],
    ['basketball', '농구'],
    ['tennis', '테니스'],
    ['badminton', '배드민턴'],
  ]

  const sortOptions = ['가장 최신 순', '인기순', '낮은 가격 순', '높은 가격 순']

  return (
    <Container>
      <SearchSection>
        <div className="searchbox">
          <FiSearch className="search-icon" />
          <div className="search-input">
            <input type="search" placeholder="어떤 구장을 찾으세요?" />
            <div className="option">
              <span>어디든지</span>
              <span>원하는 시간</span>
              <span>가격</span>
            </div>
          </div>
          <img src="/search_option.svg" alt="검색 옵션" />
        </div>
      </SearchSection>
      <ListSection>
        <Category>
          {categories.map((item) => {
            return (
              <div key={item[0]} className="icon">
                <img src={`/${item[0]}.svg`} alt={item[1]} />
                <span>{item[1]}</span>
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

const SearchSection = styled.section`
  .searchbox {
    width: 320px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${COLORS.gray20};
    border-radius: 16px;
    box-shadow: 0px 4px 4px 0px #00000040;
    padding: 4px 16px;
    box-sizing: border-box;
    margin: 16px;

    .search-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .search-input {
      display: flex;
      flex-direction: column;
      gap: 13px;

      .option {
        display: flex;
        gap: 20px;
        font-size: 12px;
        color: #777;
      }

      input {
        height: 16px;
        font-size: ${FONT['m-lg']};
        color: #000000b2;
        border: none;

        ::placeholder {
          color: black;
        }
      }
    }
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
  gap: 16px;
  border-bottom: 1px solid ${COLORS.gray20};

  :hover {
    color: ${COLORS.green};
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
