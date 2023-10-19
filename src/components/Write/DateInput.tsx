import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import { styled } from 'styled-components'
import { forwardRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLORS } from '@src/globalStyles'

type PropsType = {
  isDateChange: boolean
  setIsDateChange: React.Dispatch<React.SetStateAction<boolean>>
  selectedDate: Date | null
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
}

const DateInput = ({ isDateChange, setIsDateChange, setSelectedDate, selectedDate }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  const dateFormat = isMobile ? 'yyyy년 MM월 dd일' : 'MMdd'

  const CustomDateInput = forwardRef<HTMLDivElement, CustomDateInputProps>(({ value, onClick }, ref) => (
    <div className={isDateChange ? 'date-input selected' : 'date-input'} onClick={onClick} ref={ref}>
      {isMobile ? (
        <>
          <div className="icon"></div>
          <span>{value}</span>
        </>
      ) : (
        <>
          <span className={isDateChange ? 'selected month' : 'month'}>{value.slice(0, 2)}</span>
          <span>월</span>
          <span className={isDateChange ? 'selected day' : 'day'}>{value.slice(2, 4)}</span>
          <span>일</span>
        </>
      )}
    </div>
  ))
  CustomDateInput.displayName = 'CustomDateInput'

  return (
    <DatePickerContainer>
      <DatePicker
        locale={ko}
        name="date"
        dateFormat={dateFormat}
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date)
          setIsDateChange(true)
        }}
        className={isDateChange ? 'selected' : ''}
        customInput={<CustomDateInput value={''} onClick={() => console.log('date input test')} />}
        minDate={new Date()}
        required
      />
    </DatePickerContainer>
  )
}

const DatePickerContainer = styled.div`
  .react-datepicker__triangle::before,
  .react-datepicker__triangle::after {
    display: none;
  }

  .react-datepicker-popper {
    width: 100% !important;
    inset: -10px 0 0 -12px !important;

    @media (min-width: 834px) {
      inset: -10px 0 0 -50px !important;
    }
  }

  .react-datepicker {
    width: 100%;
    border: 1px solid ${COLORS.gray20};
    border-radius: 10px;
  }

  .react-datepicker__header {
    background: none;
    border-bottom: 1px solid ${COLORS.gray20};
  }

  .react-datepicker__month-container {
    width: 100%;
    padding-top: 10px;
  }

  .react-datepicker__day-name {
    color: ${COLORS.gray40};
  }

  .react-datepicker__day {
    color: ${COLORS.font};

    &:hover {
      background: none;
    }
  }

  .react-datepicker__day--disabled,
  .react-datepicker__day--outside-month {
    color: ${COLORS.gray40};
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: calc((100% / 7) - (0.166rem * 2));
    line-height: 3;
  }

  .react-datepicker__day--selected {
    position: relative;
    height: 100%;
    border-radius: 50%;
    background-color: ${COLORS.green};
    color: #fff;

    &:hover {
      color: black;
    }
  }

  .react-datepicker__navigation-icon {
    margin-top: 12px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${COLORS.green};
  }

  .react-datepicker__day--keyboard-selected {
    background: none;
  }
`

export default DateInput
