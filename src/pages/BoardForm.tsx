import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { districtOptions, categoryOptions } from '@src/constants/options'
import { useEffect, useRef, useState } from 'react'

const BoardForm = () => {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [isStartChange, setIsStartChange] = useState<boolean>(false)
  const [isEndChange, setIsEndChange] = useState<boolean>(false)
  const [isDateChange, setIsDateChange] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)

  const previewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisFile = event.target.files && event.target.files[0]
    const fileReader = new FileReader()

    if (thisFile && thisFile.size > 10485760) {
      alert('첨부파일 사이즈는 10MB 이내로만 등록 가능합니다.')
      event.target.files = null
      return false
    }
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
  const currentDate = new Date().toISOString().substring(0, 10)

  const setRandomImg = (category: string) => {
    if (category === '축구') {
      console.log('상태에 기본이미지 세팅')
    } else if (category === '풋살') {
      console.log('상태에 기본이미지 세팅')
    } else if (category === '농구') {
      console.log('상태에 기본이미지 세팅')
    } else if (category === '테니스') {
      console.log('상태에 기본이미지 세팅')
    } else if (category === '배드민턴') {
      console.log('상태에 기본이미지 세팅')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    const target = event.target as HTMLFormElement

    //디자인 변경 시 인덱스 바뀌어야함
    const category = target[4] as HTMLInputElement
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
      console.log(item.value)
      if (item.name === 'file' && item.value === '') {
        setRandomImg(category.value)
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
    formData.append('start', start)
    formData.append('end', end)
  }

  return (
    <MobileForm
      onSubmit={(event) => {
        handleSubmit(event)
      }}
    >
      <Section>
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
      </Section>
      <Section>
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
      </Section>
      <Section>
        <div>가격</div>
        <div>
          <input type="number" placeholder="50,000" min={0} required name="price" />
          <span className="won">원</span>
        </div>
      </Section>
      <Section>
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
      </Section>
      <Section>
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
      </Section>
      <Section>
        <div>본문내용</div>
        <div>
          <textarea placeholder="내용을 입력해주세요" required minLength={5} name="content" />
        </div>
      </Section>
      <button type="submit">등록하기</button>
    </MobileForm>
  )
}

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
`
const Section = styled.section`
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
    color: ${COLORS.font};

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url('select-arrow.png') no-repeat 97% 50%;
    cursor: pointer;
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

    .selected {
      background-color: ${COLORS.gray30};
      color: white;

      &::-webkit-calendar-picker-indicator {
        background: url('/clock-fff.png') no-repeat 98% 50%;
      }
    }
  }
`

export default BoardForm
