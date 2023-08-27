import { minutes, times } from '@src/constants/options'
import { COLORS } from '@src/globalStyles'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const TimeSelector = ({ setSelectedTime, setIsTimeSelectorOpen }: ITimeSelectorProps) => {
  const [timeZone, setTimeZone] = useState<string>('')
  //selectedStartTime으로 바꾸기
  const [selectedTimeHook, setSelectedTimeHook] = useState<string>('')
  const [selectedMinuteHook, setSelectedMinuteHook] = useState<string>('')
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false)

  useEffect(() => {
    if (isAllSelected) {
      setIsTimeSelectorOpen(false)
    }
  }, [isAllSelected])

  //세개 다 선택되거나 셀렉터 바깥쪽을 클릭하면 타임셀렉터 닫기
  return (
    <TimeContainer>
      <div className="inner">
        <div className="timezone">
          <Option>오전</Option>
          <Option>오후</Option>
        </div>
        <div className="hour">
          {times.map((item) => {
            return <Option key={item}>{item}</Option>
          })}
        </div>
        <div className="minute">
          {minutes.map((item) => {
            return <Option key={item}>{item}</Option>
          })}
        </div>
      </div>
    </TimeContainer>
  )
}

const TimeContainer = styled.div`
  width: 160px;
  height: 250px;
  z-index: 10;
  position: absolute;
  top: 43px;
  left: 0;
  background-color: white;
  border: 1px solid ${COLORS.gray20};
  border-radius: 10px;
  line-height: 10px;

  .inner {
    height: 100%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }

  .timezone,
  .hour,
  .minute {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .hour,
  .minute {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 */
    }
    scrollbar-width: none; /* 파이어폭스 */
  }
`
const Option = styled.div`
  font-size: 15px;
  width: 30px;
  padding: 10px 5px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &.selected {
    background-color: ${COLORS.green};
    color: white;
  }
`

export default TimeSelector
