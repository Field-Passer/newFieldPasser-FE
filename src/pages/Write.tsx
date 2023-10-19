import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { requestEdit, requestWrite } from '@src/api/postApi'
import TimeSelector from '@src/components/TimeSelector'
import useModal from '@src/hooks/useModal'
import PATH from '@src/constants/pathConst'
import { useMediaQuery } from 'react-responsive'
import FileUpload from '@src/components/Write/FileUpload'
import TitleInput from '@src/components/Write/TitleInput'
import PriceInput from '@src/components/Write/PriceInput'
import ContentInput from '@src/components/Write/ContentInput'
import DistrictSelect from '@src/components/Write/DistrictSelect'
import CategorySelect from '@src/components/Write/CategorySelect'
import DateInput from '@src/components/Write/DateInput'

// props로 data받기
const Write = () => {
  const location = useLocation()
  const { openModal } = useModal()
  const [imgSrc, setImgSrc] = useState<string>('')
  const [isStartChange, setIsStartChange] = useState<boolean>(false)
  const [isEndChange, setIsEndChange] = useState<boolean>(false)
  const [isDateChange, setIsDateChange] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [priceValue, setPriceValue] = useState<string>('')
  const imgRef = useRef<HTMLInputElement>(null)
  const [selectedStartTime, setSelectedStartTime] = useState<string>('')
  const [selectedEndTime, setSelectedEndTime] = useState<string>('')
  const [writtenTitle, setWrittenTitle] = useState<string>('')
  const [writtenContent, setWrittenContent] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dataForEdit] = useState<POST_TYPE>(location.pathname.includes('edit') && location.state.data)
  const [isFileEdit, setIsFileEdit] = useState<boolean>(false)
  const [startTimeSelectorOpen, setStartTimeSelectorOpen] = useState<boolean>(false)
  const [endTimeSelectorOpen, setEndTimeSelectorOpen] = useState<boolean>(false)
  const [startTimeTemp, setStartTimeTemp] = useState<string>('')
  const [endTimeTemp, setEndTimeTemp] = useState<string>('')
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  useEffect(() => {
    if (dataForEdit) {
      setImgSrc(dataForEdit.imageUrl)
      setPriceValue(dataForEdit.price.toLocaleString('ko-KR'))
      setIsDateChange(true)
      setSelectedDate(new Date(dataForEdit.startTime))
      setIsStartChange(true)
      setIsEndChange(true)
      setWrittenTitle(dataForEdit.title)
      setWrittenContent(dataForEdit.content)
      setSelectedDistrict(dataForEdit.districtName)
      setSelectedCategory(dataForEdit.categoryName)
      setStartTimeTemp(dataForEdit.startTime.slice(11, 16))
      setEndTimeTemp(dataForEdit.endTime.slice(11, 16))
    }
  }, [dataForEdit])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData()
    const target = event.target as HTMLFormElement

    if (selectedStartTime === selectedEndTime) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['시작 시간과 끝나는 시간이 동일합니다.', '예약 일시를 정확히 선택해주세요.'],
      })
      return false
    }

    if (!selectedStartTime || !selectedEndTime) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['시작 시간과 끝나는 시간을 모두 선택해주세요.'],
      })
      return false
    }

    if (writtenContent.length < 5) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['내용을 5자 이상 입력해주세요.'],
      })
      return false
    }

    for (let i = 0; i < target.length; i += 1) {
      const item = target[i] as HTMLInputElement
      if (item.name === 'file') {
        if (item.files && !item.files.length) {
          formData.append('file', '')
        } else if (item.files) {
          formData.append('file', item.files[0])
        }
      } else if (item.name === 'price') {
        formData.append('price', item.value.replace(/,/g, ''))
      } else if (item.name) {
        formData.append(item.name, item.value)
      }
    }

    const date = selectedDate?.toISOString().slice(0, 10)
    const start = date + 'T' + selectedStartTime + ':00'
    let end = date + 'T' + selectedEndTime + ':00'

    if (+start.slice(11, 13) > +end.slice(11, 13)) {
      const newDate = (+end.slice(8, 10) + 1 + '').padStart(2, '0') + 'T'
      end = end.replace(/[0-9]+[0-9]+T/, newDate)
    }

    formData.append('startTime', start)
    formData.append('endTime', end)
    formData.append('transactionStatus', '판매중')

    const entries = formData.entries()
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1])
    }

    switch (location.pathname) {
      case '/write':
        try {
          const writeRes = await requestWrite(formData)
          if (writeRes === 200) {
            openModal({
              isModalOpen: true,
              isConfirm: false,
              content: ['게시글 작성이 완료되었습니다.'],
              navigateOption: PATH.HOME,
            })
          } else {
            throw new Error()
          }
        } catch (err) {
          openModal({
            isModalOpen: true,
            isConfirm: false,
            content: ['정상적으로 등록되지 않았습니다. 다시 시도해주세요.'],
          })
        }
        break
      default:
        try {
          if (dataForEdit?.imageUrl && !formData.get('file') && !imgSrc) {
            formData.append('imageUrlDel', 'true')
          } else if (dataForEdit?.imageUrl && !formData.get('file') && imgSrc) {
            formData.append('imageUrlDel', 'false')
          } else if (!dataForEdit?.imageUrl && !formData.get('file')) {
            formData.append('imageUrlDel', 'false')
          }
          const editRes = dataForEdit && (await requestEdit(formData, dataForEdit.boardId))
          if (editRes === 200) {
            openModal({
              isModalOpen: true,
              isConfirm: false,
              content: ['게시글 수정이 완료되었습니다.'],
              navigateOption: `/board-details/${dataForEdit?.boardId}`,
            })
          }
        } catch (err) {
          openModal({
            isModalOpen: true,
            isConfirm: false,
            content: ['정상적으로 등록되지 않았습니다. 다시 시도해주세요.'],
          })
        }
        break
    }
  }

  return (
    <Container>
      {isMobile ? (
        <MobileForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event)
          }}
        >
          <section>
            <FileUpload
              imgRef={imgRef}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
              isFileEdit={isFileEdit}
              setIsFileEdit={setIsFileEdit}
            />
          </section>
          <section>
            <TitleInput writtenTitle={writtenTitle} setWrittenTitle={setWrittenTitle} />
          </section>
          <section>
            <PriceInput priceValue={priceValue} setPriceValue={setPriceValue} />
          </section>
          <section>
            <DistrictSelect selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />
            <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </section>
          <section>
            <h2>예약일시</h2>
            <MobileReservation>
              <div className="date">
                <DateInput
                  isDateChange={isDateChange}
                  setIsDateChange={setIsDateChange}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="time">
                <div className="time-inner">
                  <TimeSelector
                    timeSelectorOpen={startTimeSelectorOpen}
                    setTimeSelectorOpen={setStartTimeSelectorOpen}
                    isTimeChange={isStartChange}
                    setIsTimeChange={setIsStartChange}
                    setSelectedTime={setSelectedStartTime}
                    timeTempForEdit={location.pathname.includes('/edit') ? startTimeTemp : undefined}
                  />
                </div>
                <span>부터</span>
                <div className="time-inner">
                  <TimeSelector
                    timeSelectorOpen={endTimeSelectorOpen}
                    setTimeSelectorOpen={setEndTimeSelectorOpen}
                    isTimeChange={isEndChange}
                    setIsTimeChange={setIsEndChange}
                    setSelectedTime={setSelectedEndTime}
                    timeTempForEdit={location.pathname.includes('/edit') ? endTimeTemp : undefined}
                  />
                </div>
                <span>까지</span>
              </div>
            </MobileReservation>
          </section>
          <section>
            <ContentInput writtenContent={writtenContent} setWrittenContent={setWrittenContent} />
          </section>
          <button type="submit" className="submit-button">
            등록하기
          </button>
        </MobileForm>
      ) : (
        <PcForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event)
          }}
        >
          <div className="page-title">
            {location.pathname === '/write' ? <h1>게시물 등록</h1> : <h1>게시물 수정</h1>}
          </div>
          <PcDetail>
            <section className="half-section">
              <FileUpload
                imgRef={imgRef}
                imgSrc={imgSrc}
                setImgSrc={setImgSrc}
                isFileEdit={isFileEdit}
                setIsFileEdit={setIsFileEdit}
              />
            </section>
            <section className="half-section">
              <h2>세부사항</h2>
              <div className="row-box">
                <TitleInput writtenTitle={writtenTitle} setWrittenTitle={setWrittenTitle} />
              </div>
              <div className="row-box">
                <PriceInput priceValue={priceValue} setPriceValue={setPriceValue} />
              </div>
              <div className="row-box">
                <DistrictSelect selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />
              </div>
              <div className="row-box">
                <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
            </section>
          </PcDetail>
          <section className="full-section">
            <h2>예약일시</h2>
            <PcReservation>
              <div className="date">
                <div>날짜</div>
                <DateInput
                  isDateChange={isDateChange}
                  setIsDateChange={setIsDateChange}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="time">
                <div>시간</div>
                <div className="time-inner">
                  <TimeSelector
                    timeSelectorOpen={startTimeSelectorOpen}
                    setTimeSelectorOpen={setStartTimeSelectorOpen}
                    isTimeChange={isStartChange}
                    setIsTimeChange={setIsStartChange}
                    setSelectedTime={setSelectedStartTime}
                    timeTempForEdit={location.pathname.includes('/edit') ? startTimeTemp : undefined}
                  />
                </div>
                <span className="text-gray">부터</span>
                <div className="time-inner">
                  <TimeSelector
                    timeSelectorOpen={endTimeSelectorOpen}
                    setTimeSelectorOpen={setEndTimeSelectorOpen}
                    isTimeChange={isEndChange}
                    setIsTimeChange={setIsEndChange}
                    setSelectedTime={setSelectedEndTime}
                    timeTempForEdit={location.pathname.includes('/edit') ? endTimeTemp : undefined}
                  />
                </div>
                <span className="text-gray">까지</span>
              </div>
            </PcReservation>
          </section>
          <section className="full-section">
            <ContentInput writtenContent={writtenContent} setWrittenContent={setWrittenContent} />
          </section>
          <button className="submit-button" type="submit">
            등록하기
          </button>
        </PcForm>
      )}
    </Container>
  )
}
const Container = styled.main`
  position: relative;
  margin: auto;

  select {
    color: ${COLORS.font};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url('/select-arrow.png') no-repeat 97% 50%;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  input,
  textarea {
    &:focus {
      outline: none;
      background-color: none;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${COLORS.font};
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  input:autofill,
  input:autofill:hover,
  input:autofill:focus,
  input:autofill:active {
    -webkit-text-fill-color: ${COLORS.font};
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`

const PcForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  font-size: ${FONT.pc};
  padding: 64px 32px;
  width: 770px;
  position: relative;
  margin: auto;

  h2 {
    font-weight: 700;
  }

  input {
    color: ${COLORS.font};

    &::placeholder {
      color: ${COLORS.gray40};
    }
  }

  input[type='text'],
  select {
    width: 300px;
    height: 40px;
    border: none;
    border-bottom: 1px solid ${COLORS.gray30};
    padding: 8px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .submit-button {
    width: 328px;
    height: 48px;
    background-color: ${COLORS.green};
    color: white;
    font-size: ${FONT['m-lg']};
    margin: auto;
  }

  .page-title {
    width: 100%;
    h1 {
      font-size: ${FONT['pc-lg']};
      font-weight: 700;
    }
  }

  .full-section {
    width: 100%;

    h2 {
      margin-bottom: 16px;
    }
  }
`

const PcDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .half-section {
    position: relative;
    width: 360px;
    height: 270px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .delete {
      position: absolute;
      background-color: ${COLORS.gray40};
      right: 10px;
      bottom: 10px;
      padding: 8px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: white;
    }

    .row-box {
      display: flex;
      flex-direction: row;
      line-height: 40px;
      justify-content: space-between;

      .won {
        position: absolute;
        left: 150px;
      }
    }
  }
`

const MobileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: ${FONT.m};
  padding-top: 32px;

  input {
    color: ${COLORS.font};
  }

  .submit-button {
    width: 328px;
    height: 44px;
    background-color: ${COLORS.green};
    color: white;
    font-size: ${FONT['m-lg']};
    margin: auto;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: auto;
    position: relative;

    :focus {
      outline: none;
      border-color: ${COLORS.gray20};
    }

    ::placeholder {
      color: ${COLORS.gray40};
    }

    input,
    .date {
      width: 328px;
      height: 40px;
      border: 1px solid ${COLORS.gray20};
      border-radius: 8px;
      padding: 0 10px;
      box-sizing: border-box;
    }

    select {
      width: 328px;
      height: 40px;
      border: 1px solid ${COLORS.gray20};
      border-radius: 8px;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .won {
      position: absolute;
      top: 35px;
      right: 30px;
      color: ${COLORS.gray40};
    }

    .delete {
      position: absolute;
      background-color: ${COLORS.gray40};
      right: 10px;
      top: 30px;
      padding: 8px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: white;
    }
  }
`

const MobileReservation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${COLORS.gray40};

  .date {
    position: relative;
    line-height: 30px;

    .date-input {
      position: relative;
      width: 100%;
      line-height: 40px;
      padding: 0 70px 0 30px;
      cursor: pointer;
      display: flex;
      flex-direction: row;

      .icon {
        position: absolute;
        left: -20px;
        width: 14px;
        height: 14px;
        padding: 13px;
        background: url('/calendar-light.png') no-repeat 90% 50%;
      }
    }
    .selected {
      color: ${COLORS.font};

      .icon {
        background: url('/calendar-dark.png') no-repeat 90% 50%;
      }
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;

    .time-inner {
      position: relative;
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

    .time-selector-selected {
      background-color: ${COLORS.gray30};
      color: white;
    }
  }
`
const PcReservation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .date {
    display: flex;
    position: relative;
    gap: 16px;
    height: 40px;
    line-height: 40px;

    .date-input {
      display: flex;
      gap: 16px;
      cursor: pointer;
      color: ${COLORS.gray40};

      .month,
      .day {
        display: block;
        width: 100px;
        text-align: center;
        border-bottom: 1px solid ${COLORS.gray20};
      }
    }

    .selected {
      color: ${COLORS.font};
    }
  }

  .time {
    display: flex;
    gap: 16px;
    line-height: 40px;

    .text-gray {
      color: ${COLORS.gray40};
    }

    .time-inner {
      position: relative;
      color: ${COLORS.gray40};
    }

    .time-selector-view {
      width: 110px;
      cursor: pointer;
      display: flex;
      gap: 8px;
      border-bottom: 1px solid ${COLORS.gray20};
      padding: 0 10px;
      box-sizing: border-box;
    }

    .time-selector-selected {
      color: ${COLORS.font};
    }
  }
`

export default Write
