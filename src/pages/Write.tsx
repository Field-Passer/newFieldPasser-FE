import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { districtOptions, categoryOptions } from '@src/constants/options'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { requestWrite } from '@src/api/boardApi'

const Write = () => {
  //페이지 진입 시 토큰 확인
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState<string>('')
  const [isStartChange, setIsStartChange] = useState<boolean>(false)
  const [isEndChange, setIsEndChange] = useState<boolean>(false)
  const [isDateChange, setIsDateChange] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)
  const [imgFile, setImgFile] = useState<File>()

  const previewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisFile = event.target.files && event.target.files[0]
    const fileReader = new FileReader()

    if (thisFile && thisFile.size > 10485760) {
      alert('첨부파일 사이즈는 10MB 이내로만 등록 가능합니다.')
      event.target.files = null
      return false
    }
    thisFile && setImgFile(thisFile)
    thisFile && fileReader.readAsDataURL(thisFile)
    return new Promise<void>((resolve) => {
      // url element 생성 비동기, state보다 늦게 실행, promise 안 쓰면 동작 안됨
      // 파일은 삭제버튼 동작을 위해 state에 담아서 전송하기
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
  }

  // 가격 자릿수 체크, 콤마
  // const checkMaxLength = (value) => {
  //   if (value.length > 7) {
  //     value = value.slice(0, 7)
  //   }
  // 상태넣어주기
  // value.toLocaleString('ko-KR)
  // }

  const currentDate = new Date().toISOString().substring(0, 10)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData()
    const target = event.target as HTMLFormElement
    const selectedStart = target[6] as HTMLInputElement
    const selectedEnd = target[7] as HTMLInputElement

    if (selectedStart.value === selectedEnd.value) {
      alert('시작 시간과 끝나는 시간이 동일합니다. 예약 일시를 정확히 선택해주세요.')
      return false
    }

    let start = ''
    let end = ''

    for (let i = 0; i < 9; i += 1) {
      const item = target[i] as HTMLInputElement
      if (item.name === 'file') {
        // console.log('form의 event.target.value:' + item.value)
        // console.log('input의 event.target.files[0]:' + imgFile)
        imgFile && formData.append('file', imgFile)
      } else if (item.name === 'price') {
        formData.append('price', item.value)
      } else if (item.name === 'date') {
        start += item.value
        end += item.value
      } else if (item.name === 'start') {
        start += 'T' + item.value + ':00'
      } else if (item.name === 'end') {
        end += 'T' + item.value + ':00'
      } else {
        formData.append(item.name, item.value)
      }
    }
    formData.append('startTime', start)
    formData.append('endTime', end)

    const res = await requestWrite(formData)
    if (res === 200) {
      window.confirm('게시글 작성이 완료되었습니다. 메인으로 이동하시겠습니까?') ? navigate('/') : null
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
                }}
              />
              <img src="/upload.png" alt="업로드 이미지" className="uploadIcon" />
              <span>여기에 사진을 올려주세요</span>
              {imgSrc && <img src={imgSrc} alt="업로드된 이미지" className="preview" />}
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
              <input
                type="text"
                placeholder="양도할 구장명을 입력해주세요"
                name="title"
                required
                minLength={2}
                maxLength={20}
                title="제목은 2~20자 이내로 입력해주세요"
              />
            </div>
          </section>
          <section>
            <div>가격</div>
            <div>
              <input type="number" placeholder="50,000" min={0} required name="price" />
              <span className="won">원</span>
            </div>
          </section>
          <section>
            <div>지역</div>
            <select name="districtName" required>
              {districtOptions.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                )
              })}
            </select>
            <div>종목</div>
            <select name="categoryName" required>
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
            <Reservation>
              <div className="date">
                <input
                  type="date"
                  name="date"
                  defaultValue={currentDate}
                  min={currentDate}
                  required
                  onChange={() => {
                    setIsDateChange(true)
                  }}
                  className={isDateChange ? 'selected' : ''}
                />
              </div>
              <div className="time">
                <input
                  type="time"
                  name="start"
                  defaultValue={'00:00'}
                  required
                  onChange={() => {
                    setIsStartChange(true)
                  }}
                  className={isStartChange ? 'selected' : ''}
                />
                <span>부터</span>
                <input
                  type="time"
                  name="end"
                  defaultValue={'00:00'}
                  required
                  onChange={() => {
                    setIsEndChange(true)
                  }}
                  className={isEndChange ? 'selected' : ''}
                />
                <span>까지</span>
              </div>
            </Reservation>
          </section>
          <section>
            <div>본문내용</div>
            <div>
              <textarea placeholder="내용을 입력해주세요" required minLength={5} name="content" />
            </div>
          </section>
          <button type="submit">등록하기</button>
        </MobileForm>
      ) : (
        <PcForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event)
          }}
        >
          <div className="page-title">
            <h1>게시물 등록</h1>
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
                  }}
                />
                <img src="/upload.png" alt="업로드 이미지" className="uploadIcon" />
                <span>여기에 사진을 올려주세요</span>
                {imgSrc && <img src={imgSrc} alt="업로드된 이미지" className="preview" />}
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
                  <input
                    type="text"
                    placeholder="양도할 구장명을 입력해주세요"
                    name="title"
                    required
                    minLength={2}
                    maxLength={20}
                    title="제목은 2~20자 이내로 입력해주세요"
                  />
                </div>
              </div>
              <div className="row-box">
                <div className="box-title">가격</div>
                <div>
                  <input type="number" placeholder="50,000" min={0} required name="price" />
                  <span className="won">원</span>
                </div>
              </div>
              <div className="row-box">
                <div className="box-title">지역</div>
                <select name="districtName" required>
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
                <select name="categoryName" required>
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
            <Reservation>
              <div className="date">
                <div>날짜</div>
                <input
                  type="date"
                  name="date"
                  defaultValue={currentDate}
                  min={currentDate}
                  required
                  onChange={() => {
                    setIsDateChange(true)
                  }}
                  className={isDateChange ? 'selected' : ''}
                />
              </div>
              <div className="time">
                <div>시작</div>
                <input
                  type="time"
                  name="start"
                  defaultValue={'00:00'}
                  required
                  onChange={() => {
                    setIsStartChange(true)
                  }}
                  className={isStartChange ? 'selected' : ''}
                />
                <span>~</span>
                <div>종료</div>
                <input
                  type="time"
                  name="end"
                  defaultValue={'00:00'}
                  required
                  onChange={() => {
                    setIsEndChange(true)
                  }}
                  className={isEndChange ? 'selected' : ''}
                />
                <span>까지</span>
              </div>
            </Reservation>
          </section>
          <section className="full-section">
            <h2>본문내용</h2>
            <div>
              <textarea placeholder="내용을 입력해주세요" required minLength={5} name="content" />
            </div>
          </section>
          <button type="submit">등록하기</button>
        </PcForm>
      )}
    </Container>
  )
}
const Container = styled.main`
  position: relative;

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  select {
    color: ${COLORS.font};

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url('select-arrow.png') no-repeat 97% 50%;
    cursor: pointer;
  }

  input[type='time'] {
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
      display: none;
      appearance: none;
    }

    &::-webkit-calendar-picker-indicator {
      background: url('/clock.png') no-repeat 98% 50%;
      opacity: 1;
      display: block;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
  }

  input[type='date'] {
    &::-webkit-calendar-picker-indicator,
    &::-webkit-inner-spin-button {
      display: none;
      appearance: none;
    }

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      opacity: 1;
      display: block;
      width: 10px;
      height: 10px;
      background: url('calendar-light.png') no-repeat 90% 50%;
      cursor: pointer;
      right: -10px;
      transform: translateX(-10px);
      padding-left: 3000px;
    }
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
  border: 1px solid blue;

  h2 {
    font-weight: 700;
  }

  input,
  textarea {
    color: ${COLORS.font};
  }

  input[type='text'],
  input[type='number'],
  select {
    width: 300px;
    height: 40px;
    border: none;
    border-bottom: 1px solid ${COLORS.gray30};
    padding: 8px;
    box-sizing: border-box;
  }

  textarea {
    width: 100%;
    height: 180px;
    border: 1px solid ${COLORS.gray30};
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
  }

  button {
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
    .date {
      display: flex;
      gap: 16px;
      height: 40px;
      line-height: 40px;
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

  input,
  textarea {
    color: ${COLORS.font};
  }

  button {
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
    textarea {
      width: 328px;
      height: 48px;
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

    textarea {
      height: 140px;
      resize: none;
      overflow-y: auto;
      padding: 10px;
    }

    .won {
      position: absolute;
      top: 39px;
      right: 30px;
      color: ${COLORS.gray40};
    }

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

  .uploadIcon {
    width: 40px;
    height: 40px;
  }

  @media (min-width: 834px) {
    width: 100%;
    height: 100%;
  }
`

const Reservation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${COLORS.gray40};

  input {
    color: ${COLORS.gray40}; //change-> 어두운색 변경
  }

  .date {
    input {
      height: 32px;
      padding-left: 35px;
    }
    .selected {
      color: ${COLORS.font};

      &::-webkit-calendar-picker-indicator {
        background: url('calendar-dark.png') no-repeat 90% 50%;
      }
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    line-height: 32px;

    input {
      width: 128px;
      height: 32px;
    }

    .selected {
      background-color: ${COLORS.gray30};
      color: white;

      &::-webkit-calendar-picker-indicator {
        background: url('/clock-fff.png') no-repeat 98% 50%;
      }
    }
  }

  @media (min-width: 834px) {
    flex-direction: row;
  }
`

export default Write
