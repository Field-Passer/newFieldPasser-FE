import { SearchIcon, SearchToggleIcon, CalendarIcon } from '@src/constants/icons'
import { categoryOptions, districtOptions } from '@src/constants/options'
import theme from '@src/constants/theme'
import { FONT, COLORS } from '@src/globalStyles'
import { useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

const SearchForm = () => {
  // searchbox open check
  const [searchStart, setsearchStart] = useState(false)
  // inputText focus check
  const [InputFocus, setInputFocus] = useState(false)
  // select click check
  const [selectOpen, setSelectOpen] = useState(false)
  // district form open check
  const [districtOpen, setDistrictOpen] = useState(false)
  // time value change check
  const [timeOpen, setTimeOpen] = useState(false)
  // time value change check
  const [dateChange, setDateChange] = useState(false)

  // category value state
  const [selectValue, setSelectValue] = useState('전체')
  // district value state
  const [districtValue, setDistrictValue] = useState<string[]>([])

  // start,end TimeValues state
  const [startTimeValue, setStartTimeValue] = useState<string | undefined>('00:00')
  const [endTimeValue, setEndTimeValue] = useState<string | undefined>('00:00')

  // DateValue state
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  // searchbox click function
  const searchStartFn = () => {
    setsearchStart(true)
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
  const districtValueFn = (element: React.MouseEvent<HTMLButtonElement>, value: string) => {
    const idx = districtValue.indexOf(value)
    const target = element.target as HTMLButtonElement

    // 선택 최대 갯수 처리
    if (districtValue.length === 5 && idx === -1) {
      return alert('최대 5개 선택 가능합니다.')
    }

    // 선택시 state 배열 변경
    if (idx === -1) {
      target.classList.add('selected')
      return setDistrictValue([...districtValue, value])
    } else {
      target.classList.remove('selected')
      districtValue.splice(idx, 1)
      return setDistrictValue([...districtValue])
    }
  }

  // time input change function
  const timeChangeFn = (element: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (!timeOpen) setTimeOpen(true)

    if (type === 'start') {
      return setStartTimeValue(element.target.value)
    } else {
      return setEndTimeValue(element.target.value)
    }
  }

  // changedate function
  const changedateFn = () => {
    if (!dateChange) return setDateChange(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container searchstart={searchStart.toString()}>
        {searchStart ? (
          <SearchInform>
            <StadiumForm>
              <p className={InputFocus ? 'focused' : ''}>찾는 구장을 검색해주세요</p>
              <input type="text" placeholder="보라매공원" onFocus={inputFocusFn} onBlur={inputBlurFn} />
              <SearchIcon size="16px" color={COLORS.font} />
            </StadiumForm>
            <FlexContainer>
              <DateForm datechange={dateChange.toString()}>
                <p className={dateChange ? 'focused' : ''}>날짜</p>
                <CalendarIcon color={dateChange ? COLORS.green : '#AAA'} />
                <DatePicker
                  locale={ko}
                  dateFormat="MM.dd" // 날짜 형태
                  shouldCloseOnSelect={false}
                  minDate={new Date()}
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date)
                    changedateFn()
                  }}
                />
              </DateForm>
              <TimeForm timeopen={timeOpen.toString()}>
                <p className={timeOpen ? 'focused' : ''}>시간</p>
                <div>
                  <div>
                    <label htmlFor="startTime">{startTimeValue}</label>
                    <input
                      type="time"
                      name="startTime"
                      onChange={(e) => {
                        timeChangeFn(e, 'start')
                      }}
                    />
                    <span>시</span>
                    <span className="medium">~</span>
                  </div>
                  <div>
                    <label htmlFor="endTime">{endTimeValue}</label>
                    <input
                      type="time"
                      name="endTime"
                      onChange={(e) => {
                        timeChangeFn(e, 'end')
                      }}
                    />
                    <span>시</span>
                  </div>
                </div>
              </TimeForm>
            </FlexContainer>
            <DistrictForm>
              <p onClick={districtOpenFn} className={districtOpen ? 'focused' : ''}>
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
            <SearchBtnContainer>
              <button>전체 삭제</button>
              <SearchIcon size="15" color="#FFF" />
              <button>검색</button>
            </SearchBtnContainer>
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
    </ThemeProvider>
  )
}

export default SearchForm

const boxline = {
  border: '1px solid #e9e9e9',
  'border-radius': '16px',
  'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
}

const Container = styled.div<{ searchstart: string }>`
  padding: 0 20px;
  max-width: var(--screen-pc);
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  background: #fff;
  height: ${(props) => (props.searchstart === 'false' ? '' : '100vh')};
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
  max-width: var(--screen-pc);
  width: 100%;
  padding: 20px 0;
  padding-bottom: 82px;
  gap: 16px;
  position: fixed;
  top: 60px;
  z-index: 9999;
  background: #fff;
  overflow: auto;
  height: 100%;

  @media ${({ theme }) => theme.device.mobile} {
    top: 48px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    padding: 20px;
    padding-bottom: 130px;
  }

  & > div {
    padding: 16px 18px;

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
  ${boxline}
  min-height: 120px;
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

const DateForm = styled.div<{ datechange: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;

  svg {
    position: absolute;
    top: 23px;
    right: 105px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;

    .react-datepicker__triangle::before,
    .react-datepicker__triangle::after {
      display: none;
    }

    .react-datepicker-popper {
      width: 100% !important;
      position: relative !important;
      inset: 0 !important;
      transform: none !important;
    }

    .react-datepicker-ignore-onclickoutside,
    input[type='text'] {
      padding: 8px 12px;
      border: 1px solid ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray20)};
      border-radius: 10px;
      font-size: 13px;
      color: ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray40)};
      width: 80px;
      background: ${(props) => (props.datechange === 'true' ? COLORS.green : '#fff')};
    }
  }

  .react-datepicker__tab-loop {
    width: 100% !important;
    display: block !important;
  }

  .react-datepicker {
    width: 100%;
    border: 0;
  }

  .react-datepicker__header {
    background: none;
  }

  .react-datepicker__current-month {
    text-align: left;
    padding-left: 35px;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__day-name {
    margin-top: 50px;
    font-size: 12px;
    color: #979797;
  }

  .react-datepicker__day {
    color: #434343;

    &:hover {
      background: none;
    }
  }

  .react-datepicker__day--disabled,
  .react-datepicker__day--outside-month {
    color: #aaaaaa;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: calc((100% / 7) - (0.166rem * 2));
    line-height: 3;
  }

  .react-datepicker__day--selected {
    border-radius: 50%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: relative;
    color: #fff;

    &::before {
      content: '';
      width: calc(38.39px - 0.166rem);
      height: calc(38.39px - 0.166rem);
      display: block;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      background-color: ${COLORS.green};
      z-index: -1;
      border-radius: 50%;
    }
  }

  .react-datepicker__navigation--next {
    left: 105px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${COLORS.green};
  }

  .react-datepicker__month-container,
  .react-datepicker {
    background-color: rgba(0, 0, 0, 0);
  }
`

const DistrictForm = styled.div`
  ${boxline}

  & > div {
    margin-top: 16px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    max-width: 800px;
    margin: 0 auto;

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
  ${boxline}

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

const TimeForm = styled.div<{ timeopen: string }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;

  .react-datepicker__input-container :focus {
    outline: none;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    span {
      padding: 0 3px;
      font-size: 10px;
      color: ${(props) => (props.timeopen === 'true' ? COLORS.green : COLORS.gray40)};
    }

    .medium {
      font-size: 16px;
    }

    label {
      display: inline-block;
      height: 27px;
      line-height: 27px;
      width: 63px;
      background: ${(props) => (props.timeopen === 'true' ? COLORS.green : 'rgba(0,0,0,0)')};
      text-align: center;
      border-radius: 10px;
      color: ${(props) => (props.timeopen === 'true' ? '#fff' : COLORS.gray40)};
      border: 1px solid ${(props) => (props.timeopen === 'true' ? '#fff' : '#d9d9d9')};
      font-size: 12px;
      letter-spacing: 1.5px;
    }

    input {
      position: absolute;
      background: rgba(0, 0, 0, 0);
      width: 63px;
      height: 100%;
      border: none;
      left: 0;
    }

    input:first-child {
      left: 0;
    }

    input[type='time']::-webkit-inner-spin-button {
      display: none;
    }
    input[type='time']::-webkit-calendar-picker-indicator {
      opacity: 0;
      width: 100%;
    }
  }
`

const SearchBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  border: 0px !important;
  border-top: 1px solid #d9d9d9 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: #fff;

  svg {
    position: absolute;
    right: 75px;
    top: 24px;
    z-index: 100;
  }

  button:last-child {
    width: 88px;
    height: 38px;
    padding: 8px 16px;
    text-align: right;
    background: ${COLORS.green};
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    border-radius: 16px;
    position: relative;
    z-index: -1;
  }
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 0 !important;

  & > div {
    ${boxline}
    padding: 16px 18px;
    width: 50%;
  }

  & > div:last-child {
    flex-grow: 0;
    max-height: 67px;
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-wrap: wrap;
    padding: 0 !important;
    border: none !important;
    border-radius: none !important;
    box-shadow: none !important;

    & > div {
      width: 100%;
    }
  }
`
