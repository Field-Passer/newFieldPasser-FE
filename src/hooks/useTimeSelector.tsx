// import { useEffect, useState } from 'react'

// const useTimeSelector = ({ isTimeChange, setIsTimeChange, setSelectedTime }: ITimeSelectorProps) => {
//   const [timeSelectorOpen, setTimeSelectorOpen] = useState<boolean>()
//   const [timeZone, setTimeZone] = useState<string>('오전')
//   const [hour, setHour] = useState<string>('--')
//   const [minute, setMinute] = useState<string>('--')

//   useEffect(() => {
//     if (hour !== '--' && minute !== '--') {
//       setTimeSelectorOpen(false)
//       setIsTimeChange(true)

//       timeZone === '오후' && hour !== '12' && +hour + 12 <= 23
//         ? setSelectedTime(+hour + 12 + ':' + minute)
//         : setSelectedTime(hour + ':' + minute)

//       timeZone === '오전' && hour === '12' && setSelectedTime('00:' + minute)
//     }
//   }, [timeZone, hour, minute])

//   return { timeSelectorOpen, timeZone, setTimeZone, hour, setHour, minute, setMinute }
// }

// export default useTimeSelector
