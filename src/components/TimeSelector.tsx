import { minutes, times } from '@src/constants/options'
import { COLORS } from '@src/globalStyles'
import { styled } from 'styled-components'

type Props = {
  timeZone: string
  selectedTime: string
  selectedMinute: string
}

const TimeSelector = (props: Props) => {
  console.log(props)
  return (
    <TimeContainer>
      <div className="inner">
        <div className="timezone">
          <Option>오전</Option>
          <Option>오후</Option>
        </div>
        <div className="time">
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
  width: 190px;
  height: 250px;
  /* position: absolute; */
  top: 0;
  background-color: white;
  border: 1px solid ${COLORS.gray20};
  border-radius: 10px;

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
  .time,
  .minute {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .time,
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
  padding: 10px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &.selected {
    background-color: ${COLORS.green};
    color: white;
  }
`

export default TimeSelector
