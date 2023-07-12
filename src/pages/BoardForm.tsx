import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { districtOptions, categoryOptions } from '@src/constants/options'
import { useRef, useState } from 'react'

const BoardForm = () => {
  const [imgSrc, setImgSrc] = useState<ISaveImgFile>({
    imgFile: null,
    imgSrc: '',
  })
  const [payLoad, setPayload] = useState<IPostPayload>({
    title: '',
    file: null,
    price: 0,
    districtName: '',
    categoryName: '',
    startTime: '',
    endTime: '',
    content: '',
  })

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
        setImgSrc({
          imgFile: thisFile,
          imgSrc: fileReader.result + '',
        })
        resolve()
      }
    })
  }
  const removeImg = () => {
    setImgSrc({
      imgFile: null,
      imgSrc: '',
    })
  }

  const currentDate = new Date().toISOString().substring(0, 10)

  // const [isOptionsValid, setIsOptionsValid] = useState(false)
  // useEffect(() => {
  // 전체가 true일 경우?
  //   setIsOptionsValid(selectedData ? true : false)
  // }, [selectedData])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.target)
    const formData = new FormData()
    for (let i = 0; i < 8; i += 1) {
      console.log(event.target[i])
      // formData.append(event.target[i].name, event.target[i].value)
    }

    // 반복문으로 setPayload
    // 선택된 select option 지역, 종목일 때 api 보내지 않고 alert('지역 / 종목 선택은 필수입니다.') 띄우기
    // 시작시간, 끝나는 시간 동일할 경우 api보내지 않고 alert('예약 일시를 정확히 선택해주세요') 띄우기
    // 이미지 첨부 안 했을 때 종목별 기본이미지 랜덤 추가

    //{!isValid && <p>You must choose a value</p>} 아니면 이렇게..?
    //<button disabled={!isValid}>Submit</button>
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
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
          {imgSrc.imgSrc && <img src={imgSrc.imgSrc} alt="업로드된 이미지" className="preview" />}
        </FileUpload>
        {imgSrc.imgSrc && (
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
        <div>가격</div>
        <div>
          <input type="number" placeholder="50,000" min={0} required name="price" />
          <span className="won">원</span>
        </div>
      </Section>
      <Section>
        <div>세부사항</div>
        <Detail>
          <select name="districtName" defaultValue="지역" required>
            <option value="" disabled className="default">
              지역
            </option>
            {districtOptions.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select name="categoryName" required defaultValue="종목">
            <option value="종목" disabled className="default">
              종목
            </option>
            {categoryOptions.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </Detail>
      </Section>
      <Section>
        <div>예약일시</div>
        <Reservation>
          <div className="date">
            <input type="date" name="date" defaultValue={currentDate} min={currentDate} required />
          </div>
          <div className="time">
            <input type="time" name="start" defaultValue={'00:00'} required />
            <span>부터</span>
            <input type="time" name="end" defaultValue={'00:00'} required />
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
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: ${FONT.m};
  padding-top: 32px;

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

  textarea {
    height: 140px;
    resize: none;
    overflow-y: auto;
    padding: 10px;
  }

  select {
    width: 160px;
    height: 32px;
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    padding: 0 10px;
    box-sizing: border-box;
    color: ${COLORS.gray40};

    & option[value=''][disabled] {
      display: none;
    }
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

const Detail = styled.div`
  display: flex;
  gap: 10px;
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
  }
`

export default BoardForm
