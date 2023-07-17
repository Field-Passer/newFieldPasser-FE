import { SearchIcon, SearchToggleIcon, CalendarIcon } from '@src/constants/icons'
import { categoryOptions, districtOptions } from '@src/constants/options'
import { useDispatch, useSelector } from 'react-redux'
import theme from '@src/constants/theme'
import { FONT, COLORS } from '@src/globalStyles'
import { useRef, useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import { useLocation, useNavigate } from 'react-router-dom'
import { createSearchValue } from '@src/store/slices/searchVlaueSlice'
import { RootState } from '../store/config'

export const dateCalcFn = () => {
  const today = new Date()
  return new Date(today.setDate(today.getDate() - 1))
}

const SearchForm = () => {
  // 기존 선택된 value 값
  const selectVal = useSelector((state: RootState) => {
    return {
      title: state.searchVlaue.title,
      date: state.searchVlaue.date,
      district: state.searchVlaue.district,
      category: state.searchVlaue.category,
      startTime: state.searchVlaue.startTime,
      endTime: state.searchVlaue.endTime,
    }
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const urlPathname = location.pathname
  const navigate = useNavigate()

  // text Input element
  const textEl = useRef<HTMLInputElement>(null)

  // value state
  const [categoryValue, setCategoryValue] = useState(selectVal.category && selectVal.category !== '전체' ? selectVal.category : '전체')
  const [districtValue, setDistrictValue] = useState<string[]>(selectVal.district ? selectVal.district : [])
  const [startTimeValue, setStartTimeValue] = useState<string>(selectVal.startTime ? selectVal.startTime : '00:00')
  const [endTimeValue, setEndTimeValue] = useState<string>(selectVal.endTime ? selectVal.endTime : '23:59')
  const [selectedDate, setSelectedDate] = useState<Date>(selectVal.date ? new Date(selectVal.date) : dateCalcFn())
  const [searchTextValue, setSearchTextValue] = useState(selectVal.title ? selectVal.title : '')

  // cheak State
  const [searchStart, setsearchStart] = useState(false)
<<<<<<< HEAD
  const [inputFocus, setInputFocus] = useState(searchTextValue ? true : false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categorySelect, setCategorySelect] = useState(selectVal.category !== '전체' && categoryValue !== '전체' ? true : false)
  const [districtOpen, setDistrictOpen] = useState(districtValue.length > 0 ? true : false)
  const [districtSelect, setDistrictSelect] = useState(selectVal.district.length > 0 || districtValue.length > 0 ? true : false)
  const [timeOpen, setTimeOpen] = useState(selectVal.startTime !== '00:00' ? true : false)
  const [dateChange, setDateChange] = useState(selectedDate.getDate() !== dateCalcFn().getDate() ? true : false)
=======
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
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081

  // searchbox click function
  const searchStartFn = (check: string) => {
    if (check === 'open') {
      setsearchStart(true)
      document.querySelector('body')?.classList.add('stop-scrolling')
    } else {
      setsearchStart(false)
      document.querySelector('body')?.classList.remove('stop-scrolling')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // input focus function
  const inputFocusFn = (type: string) => {
    if (type === 'focus') {
      setInputFocus(true)
    } else {
      setInputFocus(false)
    }
  }

  // category select function
  const selectOpenFn = (value?: string) => {
    categoryOpen ? setCategoryOpen(false) : setCategoryOpen(true)
    categoryValue ? setCategorySelect(true) : setCategorySelect(false)
    value && setCategoryValue(value)
  }

  // district select function
  const districtOpenFn = () => {
    districtOpen ? setDistrictOpen(false) : setDistrictOpen(true)
    districtValue.length === 0 ? setDistrictSelect(false) : setDistrictSelect(true)
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
<<<<<<< HEAD
    if (selectedDate.getDate() === dateCalcFn().getDate()) return alert('날짜 먼저 선택해 주세요.')
=======
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
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

  // form reset function
  const formResetFn = () => {
    setStartTimeValue('00:00')
    setEndTimeValue('23:59')
    setDistrictValue([])
    setCategoryValue('전체')
    setSelectedDate(dateCalcFn())
    setSearchTextValue('')
    setTimeOpen(false)
    setDateChange(false)
    setDistrictOpen(false)

    const input = textEl.current as HTMLInputElement
    input.value = ''

    const selected = document.querySelectorAll('.selected')
    for (const x of selected) {
      x.classList.remove('selected')
    }
    const focused = document.querySelectorAll('.focused')
    for (const x of focused) {
      x.classList.remove('focused')
    }
  }

  // search text input function
  const searchTextFn = (element: React.ChangeEvent<HTMLInputElement>) => {
    const debounce = setTimeout(() => {
      return setSearchTextValue(element.target.value)
    }, 500)

    return () => clearTimeout(debounce)
  }

  // search value dispatch function
  const dispatchSearchValue = () => {
    const valueState = {
      title: searchTextValue,
      date: selectedDate.toISOString(),
      startTime: startTimeValue,
      endTime: endTimeValue,
      district: districtValue,
      category: categoryValue,
    }

    if (valueState.startTime > valueState.endTime) return alert('시간을 확인해주세요')
    return dispatch(createSearchValue(valueState)), navigate('/board_list'), searchStartFn('close')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container searchstart={searchStart.toString()} path={urlPathname}>
        {searchStart ? (
          <SearchInform>
            <StadiumForm>
<<<<<<< HEAD
              <p className={inputFocus || searchTextValue ? 'focused' : ''}>찾는 구장을 검색해주세요</p>
              <input
                type="text"
                placeholder={selectVal.title ? selectVal.title : '보라매 공원'}
                onFocus={() => inputFocusFn('focus')}
                onBlur={() => inputFocusFn('blur')}
                onChange={(e) => searchTextFn(e)}
                ref={textEl}
              />
=======
              <p className={InputFocus ? 'focused' : ''}>찾는 구장을 검색해주세요</p>
              <input type="text" placeholder="보라매공원" onFocus={inputFocusFn} onBlur={inputBlurFn} />
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
              <SearchIcon size="16px" color={COLORS.font} />
            </StadiumForm>
            <FlexContainer>
              <DateForm datechange={dateChange.toString()}>
                <p className={dateChange ? 'focused' : ''}>날짜</p>
                <CalendarIcon color={dateChange ? COLORS.green : '#AAA'} />
                <DatePicker
                  locale={ko}
                  dateFormat="MM.dd"
                  shouldCloseOnSelect={false}
                  minDate={new Date()}
                  selected={selectedDate}
                  onChange={(date: Date) => {
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
<<<<<<< HEAD
              <p onClick={districtOpenFn} className={districtOpen || districtSelect ? 'focused' : ''}>
=======
              <p onClick={districtOpenFn} className={districtOpen ? 'focused' : ''}>
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
                지역을 선택해주세요
              </p>
              {districtOpen && (
                <div>
                  <ul>
                    {districtOptions.map((v, i) => (
                      <li key={i}>
                        <button
                          className={districtValue.indexOf(v) !== -1 ? 'selected' : ''}
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
              <p className={categorySelect ? 'focused' : ''}>종목을 선택해주세요</p>
              <ul onClick={() => selectOpenFn()}>
                <p>{categoryValue}</p>
                {categoryOpen && (
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
              <div>
<<<<<<< HEAD
                <button onClick={() => formResetFn()}>전체 삭제</button>
                <button onClick={dispatchSearchValue}>검색</button>
=======
                <button>전체 삭제</button>
                <button>검색</button>
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
              </div>
            </SearchBtnContainer>
          </SearchInform>
        ) : (
          <SearchCorver onClick={() => searchStartFn('open')} path={urlPathname}>
            <SearchIcon size="24px" />
            <div>
              <p>{selectVal.title ? selectVal.title : urlPathname === '/' ? '어떤 구장을 찾으세요?' : '검색어를 입력해 주세요'}</p>
              {urlPathname === '/' && (
                <p>
                  <span>어디든지</span>
                  <span>원하는 시간</span>
                  <span>가격</span>
                </p>
              )}
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
  border: '1px solid #d9d9d9',
  'border-radius': '16px',
  'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.10)',
}

const Container = styled.div<{ searchstart: string; path: string }>`
  padding: 20px 20px;
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: #fff;
  height: ${(props) => (props.searchstart === 'false' ? '' : '100vh')};
  box-shadow: ${(props) => (props.path !== '/' ? '0px 4px 4px rgba(0, 0, 0, 0.10)' : 'none')};
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .focused {
    color: ${COLORS.font};
  }

  button {
    cursor: pointer;
  }
`

const SearchCorver = styled.div<{ path: string }>`
  max-width: var(--screen-pc);
  width: 100%;
  height: 60px;
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${boxline}
  box-shadow : ${(props) => props.path !== '/' && 'none'};

  div {
    width: ${(props) => (props.path === '/' ? 'auto' : '100%')};
    padding-left: ${(props) => (props.path === '/' ? '0' : '20px')};

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
  width: 100%;
<<<<<<< HEAD
  max-width: var(--screen-pc);
=======
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
  padding: 20px 0 142px;
  gap: 16px;
  position: fixed;
  top: 60px;
  z-index: 9999;
  background: #fff;
  overflow: auto;
  height: 100%;

<<<<<<< HEAD
=======
  @media ${({ theme }) => theme.device.mobile} {
    top: 48px;
  }

  @media ${({ theme }) => theme.device.laptop} {
    padding: 20px;
    padding-bottom: 130px;
  }

>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
  & > div {
    padding: 16px 18px;

    & > p {
      height: 26px;
      line-height: 26px;
    }
  }

  p {
    font-size: ${FONT.pc};
    font-weight: 900;
    color: ${COLORS.gray40};
  }

<<<<<<< HEAD
  @media ${({ theme }) => theme.device.laptop} {
    padding: 20px;
    padding-bottom: 130px;
  }

=======
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
  @media ${({ theme }) => theme.device.mobile} {
    top: 48px;

    & > div {
      padding: 16px 18px;

      & > p {
        height: 37px;
        line-height: 37px;
      }
    }

    p {
      font-size: ${FONT.m};
    }
  }
<<<<<<< HEAD
=======

  @media ${({ theme }) => theme.device.laptop} {
    padding: 20px;
    padding-bottom: 130px;
  }
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
`

const StadiumForm = styled.div`
  ${boxline}
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;

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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  svg {
    position: absolute;
    top: 23px;
    right: 85px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  // 라이브러리 css 커스텀
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

<<<<<<< HEAD
  .react-datepicker-ignore-onclickoutside,
  input[type='text'] {
    padding: 8px 12px;
    border: 1px solid ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray20)};
    border-radius: 10px;
    font-size: 13px;
    color: ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray40)};
    width: 61px;
    background: ${(props) => (props.datechange === 'true' ? COLORS.green : '#fff')};
    cursor: pointer;
  }

  input:focus {
    cursor: pointer;
=======
    .react-datepicker-ignore-onclickoutside,
    input[type='text'] {
      padding: 8px 12px;
      border: 1px solid ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray20)};
      border-radius: 10px;
      font-size: 13px;
      color: ${(props) => (props.datechange === 'true' ? '#fff' : COLORS.gray40)};
      width: 61px;
      background: ${(props) => (props.datechange === 'true' ? COLORS.green : '#fff')};
    }
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
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

  .react-datepicker__day-name::after,
  .react-datepicker__day::after,
  .react-datepicker__day-name::after {
    content: '';
    display: block;
  }

  .react-datepicker__day--selected {
    position: relative;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0);
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

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${COLORS.green};
  }

  .react-datepicker__month-container,
  .react-datepicker {
    background-color: rgba(0, 0, 0, 0);
  }

  .react-datepicker-popper[data-placement^='bottom'] {
    padding-top: 20px;
  }
`

const DistrictForm = styled.div`
  ${boxline}

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 10px;
    max-width: 800px;
    margin: 0 auto;
    padding: 36px 0;

    li {
      button {
<<<<<<< HEAD
        padding: 6px 12px;
=======
        padding: 8px 16px;
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
        background: #e9e9e9;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
        border-radius: 11px;
        font-size: 16px;
        color: ${COLORS.font};

        &.selected {
          background: ${COLORS.green};
          color: #fff;
        }
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    ul {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px 0;

      li {
        button {
          padding: 5px 8px;
          border-radius: 8px;
          font-size: 12px;

          &.selected {
            background: ${COLORS.green};
            color: #fff;
          }
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
      color: ${COLORS.font};
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .react-datepicker__input-container :focus {
    outline: none;
  }

  div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
      height: 33px;
<<<<<<< HEAD
      width: 63px;
      line-height: 33px;
      background: ${(props) => (props.timeopen === 'true' ? COLORS.green : 'rgba(0,0,0,0)')};
=======
      line-height: 33px;
      width: 63px;
      background: ${(props) => (props.timeopen === 'true' ? COLORS.green : 'rgba(0,0,0,0)')};
      text-align: center;
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
      border-radius: 10px;
      border: 1px solid ${(props) => (props.timeopen === 'true' ? '#fff' : '#d9d9d9')};
      color: ${(props) => (props.timeopen === 'true' ? '#fff' : COLORS.gray40)};
<<<<<<< HEAD
      text-align: center;
=======
      border: 1px solid ${(props) => (props.timeopen === 'true' ? '#fff' : '#d9d9d9')};
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
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

  @media ${({ theme }) => theme.device.tablet} {
    label {
      height: 27px;
      line-height: 27px;
    }
  }
`

const SearchBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 18px !important;
  border: 0px !important;
  border-top: 1px solid #d9d9d9 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: #fff;
  z-index: 1;

  button:last-child {
    position: relative;
    width: 88px;
    height: 38px;
    padding: 8px 16px;
    background-image: url('data:image/svg+xml;utf8,<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L12.1945 12.1886M14.0263 7.76316C14.0263 9.42425 13.3664 11.0173 12.1919 12.1919C11.0173 13.3664 9.42425 14.0263 7.76316 14.0263C6.10207 14.0263 4.50901 13.3664 3.33444 12.1919C2.15987 11.0173 1.5 9.42425 1.5 7.76316C1.5 6.10207 2.15987 4.50901 3.33444 3.33444C4.50901 2.15987 6.10207 1.5 7.76316 1.5C9.42425 1.5 11.0173 2.15987 12.1919 3.33444C13.3664 4.50901 14.0263 6.10207 14.0263 7.76316Z" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>');
    background-color: ${COLORS.green};
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 15px center;
    text-align: right;
<<<<<<< HEAD
=======
    background-image: url('data:image/svg+xml;utf8,<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L12.1945 12.1886M14.0263 7.76316C14.0263 9.42425 13.3664 11.0173 12.1919 12.1919C11.0173 13.3664 9.42425 14.0263 7.76316 14.0263C6.10207 14.0263 4.50901 13.3664 3.33444 12.1919C2.15987 11.0173 1.5 9.42425 1.5 7.76316C1.5 6.10207 2.15987 4.50901 3.33444 3.33444C4.50901 2.15987 6.10207 1.5 7.76316 1.5C9.42425 1.5 11.0173 2.15987 12.1919 3.33444C13.3664 4.50901 14.0263 6.10207 14.0263 7.76316Z" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>');
    background-color: ${COLORS.green};
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: 15px center;
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    border-radius: 16px;
  }

  & > div {
    position: relative;
<<<<<<< HEAD
    max-width: 1440px;
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
=======
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    height: 62px;
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
    line-height: 62px;
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
