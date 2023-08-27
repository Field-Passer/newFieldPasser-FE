import { minutes, times } from '@src/constants/options'
import { COLORS } from '@src/globalStyles'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { ClockIcon } from '@src/constants/icons'
import { useMediaQuery } from 'react-responsive'

//상위요소에서 스타일 지정 방법
// .time-selector-view { // &selected
//   .time-zone { // 오전/오후

//   }
//   .hour-and-minute {
//     .hour {

//     }
//     .minute {

//     }
//   }

//   .defult-time {

//   }
// }

const TimeSelector = ({
  isTimeChange,
  setIsTimeChange,
  setSelectedTime,
  timeSelectorOpen,
  setTimeSelectorOpen,
}: ITimeSelectorProps) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const [timeZone, setTimeZone] = useState<string>('오전')
  const [hour, setHour] = useState<string>('')
  const [minute, setMinute] = useState<string>('')

  useEffect(() => {
    if (hour && minute) {
      setTimeSelectorOpen(false)
      setIsTimeChange(true)
      setSelectedTime(hour + ':' + minute)
    }
  }, [hour, minute])

  //세개 다 선택되거나 셀렉터 바깥쪽을 클릭하면 타임셀렉터 닫기
  return (
    <>
      <ViewTimeContainer>
        <div
          className={isTimeChange ? 'selected time-selector-view' : 'time-selector-view'}
          onClick={() => {
            setTimeSelectorOpen(!timeSelectorOpen)
          }}
        >
          {isTimeChange ? (
            <>
              <div className="time-zone">{timeZone}</div>
              <div className="hour-and-minute">
                <span className="hour">{hour}</span> : <span className="minute">{minute}</span>
              </div>
            </>
          ) : (
            <div className="default-time">
              <span>오전</span>
              <span>-- : --</span>
            </div>
          )}
          {isMobile ? <ClockIcon color={isTimeChange ? '#fff' : '#aaa'} /> : null}
        </div>
      </ViewTimeContainer>

      {timeSelectorOpen ? (
        <SelectorContainer>
          <div className="inner">
            <div className="selector-timezone">
              <Option onClick={() => setTimeZone('오전')} className={timeZone === '오전' ? 'chosen' : ''}>
                오전
              </Option>
              <Option onClick={() => setTimeZone('오후')} className={timeZone === '오후' ? 'chosen' : ''}>
                오후
              </Option>
            </div>
            <div className="selector-hour">
              {times.map((item) => {
                return (
                  <Option key={item} onClick={() => setHour(item)} className={hour === item ? 'chosen' : ''}>
                    {item}
                  </Option>
                )
              })}
            </div>
            <div className="selector-minute">
              {minutes.map((item) => {
                return (
                  <Option key={item} onClick={() => setMinute(item)} className={minute === item ? 'chosen' : ''}>
                    {item}
                  </Option>
                )
              })}
            </div>
          </div>
        </SelectorContainer>
      ) : null}
    </>
  )
}

const ViewTimeContainer = styled.div`
  position: relative;

  .default-time {
    display: flex;
    gap: 10px;
  }

  .time-selector-view {
    position: relative;
    width: 128px;
    cursor: pointer;
    display: flex;
    gap: 8px;
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    padding: 0 10px;
    box-sizing: border-box;

    svg {
      position: absolute;
      right: 10px;
      top: 13px;
    }
  }

  .selected {
    background-color: ${COLORS.gray30};
    color: white;
  }
`

const SelectorContainer = styled.div`
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
  box-sizing: border-box;

  .inner {
    height: 100%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .selector-timezone,
  .selector-hour,
  .selector-minute {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .selector-hour,
  .selector-minute {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 */
    }
    scrollbar-width: none; /* 파이어폭스 */
  }

  .chosen {
    background-color: ${COLORS.green};
    color: white;
  }
`
const Option = styled.div`
  font-size: 15px;
  width: 35px;
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
