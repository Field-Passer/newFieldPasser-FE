import styled from 'styled-components'

type PropsType = {
  writtenTitle: string
  setWrittenTitle: React.Dispatch<React.SetStateAction<string>>
}

const TitleInput = ({ writtenTitle, setWrittenTitle }: PropsType) => {
  return (
    <>
      <h2>구장명</h2>
      <TitleBox
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
    </>
  )
}

const TitleBox = styled.input`
  width: 100%;
`

export default TitleInput
