import { SearchIcon, SearchToggleIcon, CalendarIcon, CloseIcon } from '@src/constants/icons'
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

const SearchForm = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const urlPathname = location.pathname
  const navigate = useNavigate()
  const date = new Date()

  // text Input element
  const textInputEl = useRef<HTMLInputElement>(null)
  const textInputTitle = useRef<HTMLParagraphElement>(null)

  // current slice value
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

  // current state value
  const [valueState, setValueState] = useState<ValueStateType>({
    categoryValue: selectVal.category && selectVal.category !== '전체' ? selectVal.category : '전체',
    districtValue: selectVal.district ? selectVal.district : [],
    startTimeValue: selectVal.startTime ? selectVal.startTime : '00:00',
    endTimeValue: selectVal.endTime ? selectVal.endTime : '23:59',
    selectedDate: selectVal.date ? new Date(selectVal.date) : date,
    searchTextValue: selectVal.title ? selectVal.title : ''
  });

  // cheack State
  const [checkState, setCheckState] = useState<CheckValueStateType>({
    searchBoxOpen: false,
    categoryOpen: false,
    districtOpen: valueState.districtValue ? true : false,
    districtSelect: false,
    timeChange: selectVal.startTime !== '00:00' ? true : false,
    dateChange: false
  });

  // current state value change fn
  type Value = string | string[] | Date
  const valueStateChangeFn = (key: string, value: Value) => {
    return setValueState((state) => {
      let newState = { ...state }
      newState[key] = value
      return newState
    })
  }

  // check value change fn
  const checkValueStateChangeFn = (key: string, value: boolean) => {
    return setCheckState((state) => {
      let newState = { ...state }
      newState[key] = value
      return newState
    })
  }

  // dispatch value
  const dispatchValue: SearchValueTypes = {
    title: valueState.searchTextValue,
    date: valueState.selectedDate.toISOString(),
    startTime: valueState.startTimeValue,
    endTime: valueState.endTimeValue,
    district: valueState.districtValue,
    category: valueState.categoryValue,
  }

  // searchbox click function * 
  const searchBoxOpenFn = () => {
    if (checkState.searchBoxOpen) {
      checkValueStateChangeFn('searchBoxOpen', false)
      window.document.body.classList.remove('stop-scrolling')
    } else {
      checkValueStateChangeFn('searchBoxOpen', true)
      window.document.body.classList.add('stop-scrolling')
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // district select function
  const districtValueFn = (element: React.MouseEvent<HTMLButtonElement>, value: string) => {
    const idx = valueState.districtValue.indexOf(value)
    const target = element.target as HTMLButtonElement
    // 선택 최대 갯수 처리
    if (valueState.districtValue.length === 5 && idx === -1) {
      return alert('최대 5개 선택 가능합니다.')
    }

    // 선택시 state 배열 변경
    if (idx === -1) {
      target.classList.add('selected')
      checkValueStateChangeFn('districtSelect', true)
      return valueStateChangeFn('districtValue', [...valueState.districtValue, value])
    } else {
      target.classList.remove('selected')
      let districtArray = [...valueState.districtValue]
      districtArray.splice(idx, 1)

      if (districtArray.length === 0) checkValueStateChangeFn('districtSelect', false)
      return valueStateChangeFn('districtValue', [...districtArray])
    }
  }

  // time input change function
  const timeChangeFn = (element: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (valueState.selectedDate === date) return alert('날짜 먼저 선택해 주세요.')
    if (!checkState.timeChange) checkValueStateChangeFn('timeChange', true)

    if (type === 'start') {
      return valueStateChangeFn('startTimeValue', element.target.value)
    } else {
      return valueStateChangeFn('endTimeValue', element.target.value)
    }
  }

  // form reset function
  const formResetFn = () => {
    setValueState({
      categoryValue: '전체',
      districtValue: [],
      startTimeValue: '00:00',
      endTimeValue: '23:59',
      selectedDate: date,
      searchTextValue: ''
    })
    checkValueStateChangeFn('timeChange', false)
    checkValueStateChangeFn('dateChange', false)
    checkValueStateChangeFn('districtOpen', false)

    const input = textInputEl.current as HTMLInputElement
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
  let timeoutId: number | null = null
  const searchTextFn = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      valueStateChangeFn('searchTextValue', value)
    }, 500)
  }

  // search value dispatch function
  const dispatchSearchValue = () => {
    if (dispatchValue.startTime > dispatchValue.endTime) return alert('시간을 확인해주세요')
    return dispatch(createSearchValue(dispatchValue)), navigate('/board_list'), searchBoxOpenFn()
  }

  // search keyWord btn function
  const dispatchSearchKewordValue = (type: string, key: any, value: any) => {
    valueStateChangeFn(key, value)
    if (type === 'date') dispatchValue[type] = value.toISOString()
    else dispatchValue[type] = value
    console.log(dispatchValue)

    return dispatch(createSearchValue(dispatchValue))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container searchboxopen={checkState.searchBoxOpen.toString()} path={urlPathname}>
        {checkState.searchBoxOpen ? (
          <SearchInform>
            <CloseBtn onClick={() => searchBoxOpenFn()}>
              <CloseIcon size={'16'} />
              닫기
            </CloseBtn>
            <StadiumForm>
              <p className={valueState.searchTextValue ? 'focused' : ''} ref={textInputTitle}>찾는 구장을 검색해주세요</p>
              <input
                type="text"
                placeholder={selectVal.title ? selectVal.title : '보라매 공원'}
                onFocus={() => textInputTitle.current?.classList.add('focused')}
                onBlur={() => { if (!valueState.searchTextValue) textInputTitle.current?.classList.remove('focused') }}
                onChange={(e) => searchTextFn(e)}
                ref={textInputEl}
              />
              <SearchIcon size="16px" color={COLORS.font} />
            </StadiumForm>
            <FlexContainer>
              <DateForm datechange={checkState.dateChange.toString()}>
                <p className={checkState.dateChange ? 'focused' : ''}>날짜</p>
                <CalendarIcon color={checkState.dateChange ? COLORS.green : '#AAA'} />
                <div>
                  <DatePicker
                    locale={ko}
                    dateFormat="MM.dd"
                    shouldCloseOnSelect={false}
                    minDate={date}
                    selected={valueState.selectedDate}
                    onChange={(date: Date) => {
                      if (!checkState.dateChange) return checkValueStateChangeFn('dateChange', true)
                      valueStateChangeFn('selectedDate', date)
                    }}
                  />
                  <span>-</span>
                  <DatePicker
                    locale={ko}
                    dateFormat="MM.dd"
                    shouldCloseOnSelect={false}
                    minDate={date}
                    selected={valueState.selectedDate}
                    onChange={(date: Date) => {
                      if (!checkState.dateChange) return checkValueStateChangeFn('dateChange', true)
                      valueStateChangeFn('selectedDate', date)
                    }}
                  />
                </div>
              </DateForm>
              <TimeForm timeopen={checkState.timeChange.toString()}>
                <p className={checkState.timeChange ? 'focused' : ''}>시간</p>
                <div>
                  <div>
                    <label htmlFor="startTime">{valueState.startTimeValue}</label>
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
                    <label htmlFor="endTime">{valueState.endTimeValue}</label>
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
              <p onClick={() => checkState.districtOpen ? checkValueStateChangeFn('districtOpen', false) : checkValueStateChangeFn('districtOpen', true)} className={checkState.districtOpen ? 'focused' : ''}>
                지역을 선택해주세요
              </p>
              {checkState.districtOpen && (
                <div>
                  <ul>
                    {districtOptions.map((v, i) => (
                      <li key={i}>
                        <button
                          className={valueState.districtValue.indexOf(v) !== -1 ? 'selected' : ''}
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
              <p className={valueState.categoryValue !== '전체' ? 'focused' : ''}>종목을 선택해주세요</p>
              <ul onClick={() => {
                checkState.categoryOpen ? checkValueStateChangeFn('categoryOpen', false) : checkValueStateChangeFn('categoryOpen', true)
              }}>
                <p>{valueState.categoryValue}</p>
                {checkState.categoryOpen && (
                  <>
                    {categoryOptions.map((v, i) => (
                      <li key={i}>
                        <button onClick={() => valueStateChangeFn('categoryValue', v)}>{v}</button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </CategoryForm>
            <SearchBtnContainer>
              <div>
                <button onClick={() => formResetFn()}>전체 삭제</button>
                <button onClick={dispatchSearchValue}>검색</button>
              </div>
            </SearchBtnContainer>
          </SearchInform>
        ) : (
          <>
            <SearchCorver onClick={() => searchBoxOpenFn()} path={urlPathname}>
              <SearchIcon size="24" />
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
            {urlPathname !== '/' && (
              <SearchKeyWordBtn>
                {selectVal.title && (
                  <li>
                    <button onClick={() => dispatchSearchKewordValue('title', 'searchTextValue', '')}>
                      {selectVal.title}
                      <CloseIcon size="12" color="#fff" />
                    </button>
                  </li>
                )}
                {selectVal.date.slice(0, 10) !== date.toISOString().slice(0, 10) && (
                  <li>
                    <button onClick={() => dispatchSearchKewordValue('date', 'selectedDate', date)}>
                      {selectVal.date.slice(5, 10).replace('-', '.')}
                      <CloseIcon size="12" color="#fff" />
                    </button>
                  </li>
                )}
                {selectVal.category !== '전체' && (
                  <li>
                    <button onClick={() => dispatchSearchKewordValue('category', 'categoryValue', '전체')}>
                      {selectVal.category}
                      <CloseIcon size="12" color="#fff" />
                    </button>
                  </li>
                )}
                {selectVal.startTime !== '00:00' && (
                  <li>
                    <button onClick={() => {
                      dispatchSearchKewordValue('time', 'startTimeValue', '00:00')
                      dispatchSearchKewordValue('time', 'endTimeValue', '23:59')
                    }}>
                      {selectVal.startTime}~{selectVal.endTime}
                      <CloseIcon size="12" color="#fff" />
                    </button>
                  </li>
                )}
                {selectVal.district.map((item: string, idx: number) => (
                  <li key={idx}>
                    <button onClick={() => {
                      let districtArray = [...valueState.districtValue]
                      districtArray.splice(idx, 1)
                      dispatchSearchKewordValue('district', 'districtValue', [...districtArray])
                    }}>
                      {item}
                      <CloseIcon size="12" color="#fff" />
                    </button>
                  </li>
                ))}
              </SearchKeyWordBtn>
            )}
          </>
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

const Container = styled.div<{ searchboxopen: string; path: string }>`
  padding: 20px 20px;
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  flex-direction: ${(props) => (props.searchboxopen === 'false' && props.path !== '/' ? 'column' : 'row')};
  align-items: center;
  margin: 0 auto;
  background: #fff;
  height: ${(props) => (props.searchboxopen === 'false' ? '' : '100vh')};
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
  box-shadow: ${(props) => props.path !== '/' && 'none'};
  ${boxline}

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
      font-size: ${FONT.pc};

      height: 22px;
      line-height: 22px;
      color: #777;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    height: ${(props) => (props.path !== '/' ? '40px' : '60px')};
    div {
      p:last-child {
        font-size: 12px;
      }
    }
  }
`

const SearchInform = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--screen-pc);
  padding: 20px 0 142px;
  gap: 16px;
  position: fixed;
  top: 60px;
  z-index: 9999;
  background: #fff;
  overflow: auto;
  height: 100%;

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

  @media ${({ theme }) => theme.device.laptop} {
    padding: 20px;
    padding-bottom: 130px;
  }

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

  &::-webkit-scrollbar {
    display: none;
  }
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
    color: ${COLORS.font}
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
    right: 165px;
  }

  p { 
    height:31px;
    line-height:31px;
  }

  & > div {
    width:100%;
    position:relative;

    & > .react-datepicker-wrapper:first-child {
      position:absolute;
      top:-31px;
      right:79px;
    }

    & > span {
      position:absolute;
      height:31px;
      line-height:31px;
      top:-31px;
      right:65px;
      color:#aaa;
    }

    & > .react-datepicker-wrapper {
      position:absolute;
      top:-31px;
      right:0;
    }
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
        padding: 6px 12px;
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
      width: 63px;
      line-height: 33px;
      background: ${(props) => (props.timeopen === 'true' ? COLORS.green : 'rgba(0,0,0,0)')};
      border-radius: 10px;
      border: 1px solid ${(props) => (props.timeopen === 'true' ? '#fff' : '#d9d9d9')};
      color: ${(props) => (props.timeopen === 'true' ? '#fff' : COLORS.gray40)};
      text-align: center;
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
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 18px !important;
  border: 0px !important;
  border-top: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: #fff;
  z-index: 1;
  margin-top: 24px;

  button:first-child {
    position: absolute;
    top: 50%;
    left: calc(50% - 214px);
    transform: translate(-50%, -50%);
    font-size: ${FONT.pc};
  }

  button:last-child {
    position: relative;
    width: 328px;
    height: 48px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    border-radius: 8px;
    background-color: ${COLORS.green};
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #d9d9d9 !important;
    margin-top: 0;

    button:first-child {
      position: relative;
      left: 0;
      top: 0;
      transform: none;
      font-size: 14px;
    }

    button:last-child {
      width: 88px;
      height: 38px;
      padding: 8px 16px;
      background-image: url('data:image/svg+xml;utf8,<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L12.1945 12.1886M14.0263 7.76316C14.0263 9.42425 13.3664 11.0173 12.1919 12.1919C11.0173 13.3664 9.42425 14.0263 7.76316 14.0263C6.10207 14.0263 4.50901 13.3664 3.33444 12.1919C2.15987 11.0173 1.5 9.42425 1.5 7.76316C1.5 6.10207 2.15987 4.50901 3.33444 3.33444C4.50901 2.15987 6.10207 1.5 7.76316 1.5C9.42425 1.5 11.0173 2.15987 12.1919 3.33444C13.3664 4.50901 14.0263 6.10207 14.0263 7.76316Z" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>');
      background-color: ${COLORS.green};
      background-repeat: no-repeat;
      background-size: 14px;
      background-position: 15px center;
      text-align: right;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      border-radius: 16px;
    }

    & > div {
      position: relative;
      max-width: 1440px;
      height: 62px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      line-height: 62px;
    }
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

const SearchKeyWordBtn = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: var(--screen-pc);
  width: 100%;
  margin: 12px auto 0;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    height: 34px;
    line-height: 30px;
    padding: 2px 8px;
    background-color: ${COLORS.green};
    border-radius: 8px;
    color: #fff;
    font-size: ${FONT.pc};

    svg {
      margin: 0 5px 0 10px;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    button {
      display: flex;
      align-items: center;
      height: 26px;
      line-height: 22px;
      padding: 2px 8px;
      font-size: 12px;

      svg {
        margin: 0 5px 0 10px;
        width: 8px;
        height: 8px;
        margin: 0 2px 0 5px;
      }
    }
  }
`

const CloseBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px 5px;
`
