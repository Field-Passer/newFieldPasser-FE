import { COLORS, FONT } from '@src/globalStyles'
import { styled } from 'styled-components'
import { districtOptions, categoryOptions } from '@src/constants/options'

const BoardForm = () => {
  const previewImg = () => {
    console.log('이미지 미리보기')
  }

  return (
    <Container>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <Section>
        <div>제목</div>
        <div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            required
            pattern=".{2, 20}"
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
            accept="image/gif,image/jpeg,image/png"
          />
          <img src="/upload.png" alt="파일 추가" />
          <span>여기에 사진을 올려주세요</span>
        </FileUpload>
      </Section>
      <Section>
        <div>가격</div>
        <div>
          <input type="number" placeholder="50,000" />
          <span className="won">원</span>
        </div>
      </Section>
      <Section>
        <div>세부사항</div>
        <Detail>
          <div className="option">
            <select name="district" required defaultValue="지역">
              <option value="지역" disabled className="default">
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
            <select name="category" required defaultValue="종목">
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
          </div>
          <div>
            <input type="text" placeholder="구장명을 입력해주세요" />
          </div>
        </Detail>
      </Section>
      <Section>
        <div>예약일시</div>
        <Reservation>
          <div className="date">
            <input type="date" />
          </div>
          <div className="time">
            <input type="time" />
            <span>부터</span>
            <input type="time" />
            <span>까지</span>
          </div>
        </Reservation>
      </Section>
      <Section>
        <div>본문내용</div>
        <div>
          <textarea placeholder="내용을 입력해주세요" />
        </div>
      </Section>
      <button type="submit">등록하기</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: ${FONT.m};

  .logo {
    margin: auto;
    height: 48px;
    line-height: 48px;
    margin-top: 12px;

    img {
      width: 160px;
      height: 24px;
    }
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
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .option {
    display: flex;
    justify-content: space-between;
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

  input {
    display: none;
  }

  img {
    width: 40px;
    height: 40px;
  }
`

const Reservation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${COLORS.gray40};

  .date {
    input {
      height: 32px;
      color: ${COLORS.gray40};
    }

    ::placeholder {
      /* color: ${COLORS.gray20}; */
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
