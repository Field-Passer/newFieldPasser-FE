import {
  SearchIcon,
  SearchToggleIcon,
  CalendarIcon,
} from '@src/constants/icons'
import { categoryOptions, districtOptions } from '@src/constants/options'
import { FONT, COLORS } from '@src/globalStyles'
import { useState } from 'react'
import { styled } from 'styled-components'

const SearchForm = () => {
  const [searchStart, setSearchStart] = useState(false)
  const [InputFocus, setInputFocus] = useState(false)
  const [selectValue, setSelectValue] = useState('전체')
  const [districtValue, setDistrictValue] = useState<string[]>([])
  const [selectOpen, setSelectOpen] = useState(false)
  const [districtOpen, setDistrictOpen] = useState(false)

  // searchbox click function
  const searchStartFn = () => {
    setSearchStart(true)
    document.querySelector('body')?.classList.add('stop-scrolling')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // input focus function
  const inputFocusFn = () => {
    setInputFocus(true)
  }
  const inputBlurFn = () => {
    setInputFocus(false)
  }

  // category select function
  const selectOpenFn = (value?: string) => {
    selectOpen ? setSelectOpen(false) : setSelectOpen(true)
    value && setSelectValue(value)
  }

  // district select function
  const districtOpenFn = () => {
    setDistrictOpen(true)
  }

  const districtValueFn = (
    element: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    const idx = districtValue.indexOf(value)
    const target = element.target as HTMLButtonElement

    // 선택 최대 갯수 처리
    if (districtValue.length === 5 && idx === -1) {
      return console.log('5개 까지 선택 가능')
    }

    // 선택시 state 배열 변경
    if (idx === -1) {
      setDistrictValue([...districtValue, value])
      target.classList.add('selected')
    } else {
      districtValue.splice(idx, 1)
      setDistrictValue([...districtValue])
      target.classList.remove('selected')
    }
  }

  return (
    <Container>
      {searchStart ? (
        <SearchInform>
          <StadiumForm>
            <p className={InputFocus ? 'focused' : ''}>
              찾는 구장을 검색해주세요
            </p>
            <input
              type="text"
              placeholder="보라매공원"
              onFocus={inputFocusFn}
              onBlur={inputBlurFn}
            />
            <SearchIcon size="16px" color={COLORS.font} />
          </StadiumForm>
          <DateForm>
            <p>날짜</p>
            <div>
              <CalendarIcon />
              <div>-월 --일</div>
            </div>
          </DateForm>
          <DistrictForm>
            <p
              onClick={districtOpenFn}
              className={districtOpen ? 'focused' : ''}
            >
              지역을 선택해주세요
            </p>
            {districtOpen && (
              <div>
                <ul>
                  {districtOptions.map((v, i) => (
                    <li key={i}>
                      <button
                        onClick={(e) => {
                          districtValueFn(e, v)
                        }}
                      >
                        {v}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DistrictForm>
          <CategoryForm>
            <p className={selectOpen ? 'focused' : ''}>종목을 선택해주세요</p>
            <ul onClick={() => selectOpenFn()}>
              <p>{selectValue}</p>
              {selectOpen && (
                <>
                  {categoryOptions.map((v, i) => (
                    <li key={i}>
                      <button onClick={() => selectOpenFn(v)}>{v}</button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </CategoryForm>
        </SearchInform>
      ) : (
        <SearchCorver onClick={() => searchStartFn()}>
          <SearchIcon size="24px" />
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
  padding: '16px 18px !important',
}

const Container = styled.div`
  padding: 0 20px;
  max-width: var(--screen-pc);
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;

  * {
    box-sizing: border-box;
  }

  .focused {
    color: ${COLORS.font};
  }
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
  height: calc(100vh - 60px);
  max-width: var(--screen-pc);
  width: 100%;
  padding: 20px;
  gap: 16px;
  position: fixed;
  top: 48px;
  z-index: 9999;
  background: #fff;
  overflow: auto;

  & > div {
    ${boxline}

    & > p {
      height: 26px;
      line-height: 26px;
    }
  }

  p {
    font-size: ${FONT.m};
    font-weight: 900;
    color: ${COLORS.gray40};
  }
`

const StadiumForm = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  svg {
    position: absolute;
    bottom: 28px;
    left: 26px;
  }

  input {
    width: 100%;
    height: 42px;
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    padding-left: 32px;
    font-size: 12px;
    color: ${COLORS.gray40};
  }

  input:focus {
    color: ${COLORS.font};
  }
`

const DateForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 5px;

    div {
      padding: 8px 12px;
      border: 1px solid ${COLORS.gray20};
      border-radius: 10px;
      font-size: 13px;
      color: ${COLORS.gray40};
    }
  }
`

const DistrictForm = styled.div`
  & > div {
    margin-top: 16px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

    li {
      button {
        padding: 5px 8px;
        background: #e9e9e9;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        font-size: 12px;
        color: ${COLORS.font};

        &.selected {
          background: ${COLORS.green};
          color: #fff;
        }
      }
    }
  }
`

const CategoryForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  ul {
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    cursor: pointer;

    * {
      font-size: 12px;
      color: ${COLORS.gray40};
    }

    p {
      font-weight: 300;
      padding: 8px;
      height: 40px;
      line-height: 24px;
    }

    li {
      height: 40px;
      line-height: 24px;
    }

    button {
      width: 100%;
      height: 100%;
      text-align: left;
      padding: 8px;
    }
  }

  ul.open {
    color: ${COLORS.font};

    p {
      color: ${COLORS.font};
    }
  }
`
