import { minutes, times } from '@src/constants/options'
import { COLORS } from '@src/globalStyles'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { ClockIcon } from '@src/constants/icons'

const TimeSelector = ({
  isTimeChange,
  setIsTimeChange,
  setSelectedTime,
  timeSelectorOpen,
  setTimeSelectorOpen,
}: ITimeSelectorProps) => {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false)
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
          className={isTimeChange ? 'selected view-time' : 'view-time'}
          onClick={() => {
            setTimeSelectorOpen(!timeSelectorOpen)
          }}
        >
          {isTimeChange ? (
            <>
              <div>{timeZone}</div>
              <div>
                <span>{hour}</span> : <span>{minute}</span>
              </div>
            </>
          ) : (
            <div className="default-time">
              <span>오전</span>
              <span>-- : --</span>
            </div>
          )}
          <ClockIcon color={isTimeChange ? '#fff' : '#aaa'} />
        </div>
      </ViewTimeContainer>

      {timeSelectorOpen ? (
        <SelectorContainer>
          <div className="inner">
            <div className="timezone">
              <Option onClick={() => setTimeZone('오전')} className={timeZone === '오전' ? 'chosen' : ''}>
                오전
              </Option>
              <Option onClick={() => setTimeZone('오후')} className={timeZone === '오후' ? 'chosen' : ''}>
                오후
              </Option>
            </div>
            <div className="hour">
              {times.map((item) => {
                return (
                  <Option key={item} onClick={() => setHour(item)} className={hour === item ? 'chosen' : ''}>
                    {item}
                  </Option>
                )
              })}
            </div>
            <div className="minute">
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

  .view-time {
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
