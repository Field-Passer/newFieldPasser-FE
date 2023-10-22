import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import { districtOptions, categoryOptions } from '@src/constants/options'
import { useRef, useState, forwardRef, ChangeEvent, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { requestEdit, requestWrite } from '@src/api/postApi'
import TimeSelector from '@src/components/Style/TimeSelector'
import { ImageUploadIcon } from '@src/constants/icons'
import useModal from '@src/hooks/useModal'
import PATH from '@src/constants/pathConst'

// props로 data받기
const Write = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
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

  const previewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisFile = event.target.files && event.target.files[0]
    const fileReader = new FileReader()

    if (thisFile && thisFile.size > 10485760) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['첨부파일 사이즈는 10MB 이내로만 등록 가능합니다.'],
      })
      event.target.files = null
      return false
    }

    thisFile && fileReader.readAsDataURL(thisFile)
    return new Promise<void>((resolve) => {
      fileReader.onload = () => {
        setImgSrc(fileReader.result + '')
        resolve()
      }
    })
  }
  const removeImg = () => {
    if (imgRef.current) {
      imgRef.current.value = ''
    }
    setImgSrc('')
    setIsFileEdit(true)
  }

  // 통화단위 콤마 적용
  const checkMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
    let price = event.target.value
    price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR')
    setPriceValue(price)
  }

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

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>, type: string) => {
    if (type === 'district') {
      setSelectedDistrict(event.target.value)
    } else {
      setSelectedCategory(event.target.value)
    }
  }

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
            <div>사진 추가</div>
            <FileUpload htmlFor="file">
              <input
                id="file"
                type="file"
                name="file"
                ref={imgRef}
                accept="image/gif,image/jpeg,image/png"
                onChange={(event) => {
                  previewImg(event)
                  setIsFileEdit(true)
                }}
              />
              <ImageUploadIcon size="48px" />
              <div className="img-text">
                <span>예약 인증 사진을 올려주세요</span>
                <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
              </div>
              {imgSrc && <img src={imgSrc} alt="업로드된 이미지" className="preview" />}
              {location.pathname.includes('edit') && !isFileEdit ? (
                <div className="img-overlay">
                  <ImageUploadIcon size="48px" />
                  <div className="img-text">
                    <span>예약 인증 사진을 올려주세요</span>
                    <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
                  </div>
                </div>
              ) : null}
            </FileUpload>
            {imgSrc && (
              <div
                className="delete"
                onClick={() => {
                  removeImg()
                }}
              >
                삭제
              </div>
            )}
          </section>
          <section>
            <div>구장명</div>
            <div>
              <TitleInput
                type="text"
                placeholder="양도할 구장명을 입력해주세요"
                name="title"
                required
                minLength={2}
                maxLength={20}
                title="제목은 2~20자 이내로 입력해주세요"
                value={writtenTitle}
                onChange={(e) => setWrittenTitle(e.target.value)}
              />
            </div>
          </section>
          <section>
            <div>가격</div>
            <div>
              <PriceInput
                type="text"
                placeholder="50,000"
                minLength={1}
                maxLength={7}
                required
                name="price"
                value={priceValue}
                onChange={(event) => checkMaxLength(event)}
              />
              <span className="won">원</span>
            </div>
          </section>
          <section>
            <div>지역</div>
            <select
              name="districtName"
              onChange={(event) => handleChangeSelect(event, 'district')}
              value={selectedDistrict}
            >
              {districtOptions.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                )
              })}
            </select>
            <div>종목</div>
            <select
              name="categoryName"
              onChange={(event) => handleChangeSelect(event, 'category')}
              value={selectedCategory}
            >
              {categoryOptions.map((item, index) => {
                if (index)
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  )
              })}
            </select>
          </section>
          <section>
            <div>예약일시</div>
            <MobileReservation>
              <div className="date">
                <DatePicker
                  locale={ko}
                  name="date"
                  dateFormat="yyyy년 MM월 dd일"
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
            <div>본문내용</div>
            <div>
              <ContentInput
                placeholder="양도 사유, 주차 가능 여부 등 내용을 최소 5자 이상 입력해주세요."
                required
                minLength={5}
                name="content"
                value={writtenContent}
                onChange={(e) => setWrittenContent(e.target.value)}
              />
            </div>
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
              <h2>사진 추가</h2>
              <FileUpload htmlFor="file">
                <input
                  id="file"
                  type="file"
                  name="file"
                  ref={imgRef}
                  accept="image/gif,image/jpeg,image/png"
                  onChange={(event) => {
                    previewImg(event)
                    setIsFileEdit(true)
                  }}
                />
                <ImageUploadIcon size="54px" />
                <div className="img-text">
                  <span>예약 인증 사진을 올려주세요</span>
                  <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
                </div>
                {imgSrc && <img src={imgSrc} alt="업로드된 이미지" className="preview" />}
                {location.pathname.includes('edit') && !isFileEdit ? (
                  <div className="img-overlay">
                    <ImageUploadIcon size="54px" />
                    <div className="img-text">
                      <span>예약 인증 사진을 올려주세요</span>
                      <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
                    </div>
                  </div>
                ) : null}
              </FileUpload>
              {imgSrc && (
                <div
                  className="delete"
                  onClick={() => {
                    removeImg()
                  }}
                >
                  삭제
                </div>
              )}
            </section>
            <section className="half-section">
              <h2>세부사항</h2>
              <div className="row-box">
                <div className="box-title">구장명</div>
                <div>
                  <TitleInput
                    type="text"
                    placeholder="양도할 구장명을 입력해주세요"
                    name="title"
                    required
                    minLength={2}
                    maxLength={20}
                    title="제목은 2~20자 이내로 입력해주세요"
                    value={writtenTitle}
                    onChange={(e) => setWrittenTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="row-box">
                <div className="box-title">가격</div>
                <div>
                  <PriceInput
                    type="text"
                    placeholder="50,000"
                    minLength={1}
                    maxLength={7}
                    required
                    name="price"
                    value={priceValue}
                    onChange={(event) => checkMaxLength(event)}
                  />
                  <span className="won">원</span>
                </div>
              </div>
              <div className="row-box">
                <div className="box-title">지역</div>
                <select
                  name="districtName"
                  onChange={(event) => handleChangeSelect(event, 'district')}
                  value={selectedDistrict}
                >
                  {districtOptions.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="row-box">
                <div className="box-title">종목</div>
                <select
                  name="categoryName"
                  onChange={(event) => handleChangeSelect(event, 'category')}
                  value={selectedCategory}
                >
                  {categoryOptions.map((item, index) => {
                    if (index)
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      )
                  })}
                </select>
              </div>
            </section>
          </PcDetail>
          <section className="full-section">
            <h2>예약일시</h2>
            <PcReservation>
              <div className="date">
                <div>날짜</div>
                <DatePicker
                  locale={ko}
                  name="date"
                  dateFormat="MMdd"
                  shouldCloseOnSelect
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date)
                    setIsDateChange(true)
                  }}
                  className={isDateChange ? 'selected' : ''}
                  customInput={<CustomDateInput value={''} onClick={() => ''} />}
                  minDate={new Date()}
                  required
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
            <h2>본문내용</h2>
            <div>
              <ContentInput
                placeholder="양도 사유, 주차 가능 여부 등 내용을 최소 5자 이상 입력해주세요."
                required
                minLength={5}
                name="content"
                value={writtenContent}
                onChange={(e) => setWrittenContent(e.target.value)}
              />
            </div>
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

const FileUpload = styled.label`
  position: relative;
  width: 328px;
  height: 160px;
  border: 1px solid ${COLORS.gray20};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray40};
  cursor: pointer;

  .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    object-fit: contain;
    border-radius: 8px;
  }

  input {
    display: none;
  }

  .img-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .img-overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    gap: 16px;
    justify-content: center;
    align-items: center;
    color: ${COLORS.gray40};
  }

  @media (min-width: 834px) {
    width: 100%;
    height: 100%;
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

const TitleInput = styled.input`
  width: 100%;
`
const PriceInput = styled.input`
  width: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const ContentInput = styled.textarea`
  color: ${COLORS.font};
  width: 328px;
  height: 140px;
  border: 1px solid ${COLORS.gray20};
  border-radius: 8px;
  padding: 0 10px;
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
  padding: 10px;

  &::placeholder {
    color: ${COLORS.gray40};
  }

  @media (min-width: 834px) {
    width: 100%;
    height: 180px;
    padding: 16px;
    font-size: ${FONT.pc};
  }
`

export default Write
