import {
  SearchIcon,
  SearchToggleIcon,
  CalendarIcon,
} from '@src/constants/icons'
import { FONT, COLORS } from '@src/globalStyles'
import { useState } from 'react'
import { styled } from 'styled-components'

const SearchForm = () => {
  const [searchStart, setSearchStart] = useState(false)
  const searchStartFn = () => {
    setSearchStart(true)
    document.querySelector('body')?.classList.add('stop-scrolling')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container>
      {searchStart ? (
        <SearchInform>
          <StadiumForm>
            <p>찾는 구장을 검색해주세요</p>
            <SearchIcon />
            <input type="text" placeholder="보라매공원" />
          </StadiumForm>
          <DateForm>
            <p>날짜</p>
            <div>
              <CalendarIcon />
              <div>-월 --일</div>
            </div>
          </DateForm>
          <DestrictForm>
            <p>지역을 선택해주세요</p>
          </DestrictForm>
          <CategoryForm>
            <p>종목을 선택해주세요</p>
            <select name="category" id="category">
              <option value="축구">축구</option>
              <option value="농구">농구</option>
              <option value="배드민턴">배드민턴</option>
              <option value="태니스">태니스</option>
              <option value="야구">야구</option>
            </select>
          </CategoryForm>
        </SearchInform>
      ) : (
        <SearchCorver onClick={() => searchStartFn()}>
          <SearchIcon />
          <div>
            <p>어떤 구장을 찾으세요?</p>
            <p>
              <span>어디든지</span>
              <span>원하는 시간</span>
              <span>가격</span>
            </p>
          </div>
          <SearchToggleIcon />
        </SearchCorver>
      )}
    </Container>
  )
}

export default SearchForm

const boxline = {
  border: '1px solid #e9e9e9',
  'border-radius': '16px',
  'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
}

const Container = styled.div`
  padding: 0 20px;
  max-width: var(--screen-pc);
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const SearchCorver = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${boxline}

  div {
    p:first-child {
      font-size: ${FONT.pc};
      font-weight: 900;
      height: 30px;
      line-height: 30px;
    }

    p:last-child {
      display: flex;
      gap: 10px;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      color: #777;
    }
  }
`

const SearchInform = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 20px;
  gap: 16px;
  position: fixed;
  top: 60px;
  z-index: 9999;
  background: #fff;
  box-sizing: border-box;

  & > div {
    padding: 10px;
  }

  p {
    font-size: ${FONT.m};
    font-weight: 900;
    color: ${COLORS.gray40};
  }
`

const StadiumForm = styled.div`
  ${boxline}
`

const DateForm = styled.div`
  ${boxline}
  display:flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    div {
      border: 1px solid #e9e9e9;
      border-radius: 16px;
    }
  }
`

const DestrictForm = styled.div`
  ${boxline}
`

const CategoryForm = styled.div`
  ${boxline}
`
