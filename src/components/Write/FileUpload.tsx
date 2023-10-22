import { ImageUploadIcon } from '@src/constants/icons'
import { COLORS } from '@src/globalStyles'
import useModal from '@src/hooks/useModal'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

type PropsType = {
  imgRef: React.RefObject<HTMLInputElement>
  previewImgSrc: string
  setPreviewImgSrc: React.Dispatch<React.SetStateAction<string>>
  isFileChanged: boolean
  setIsFileChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const FileUpload = ({ imgRef, previewImgSrc, setPreviewImgSrc, isFileChanged, setIsFileChanged }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })
  const { openModal } = useModal()
  const iconSize = isMobile ? '48px' : '54px'
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
        setPreviewImgSrc(fileReader.result + '')
        resolve()
      }
    })
  }
  const removeImg = () => {
    if (imgRef.current) {
      imgRef.current.value = ''
    }
    setPreviewImgSrc('')
    setIsFileChanged(true)
  }
  const changeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    previewImg(event)
    setIsFileChanged(true)
  }

  return (
    <>
      <h2>사진 추가</h2>
      <FileLabel htmlFor="file">
        <input
          id="file"
          type="file"
          name="file"
          ref={imgRef}
          accept="image/gif,image/jpeg,image/png"
          onChange={(event) => {
            changeImg(event)
          }}
        />
        <ImageUploadIcon size={iconSize} />
        <div className="img-text">
          <span>예약 인증 사진을 올려주세요</span>
          <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
        </div>
        {previewImgSrc && <img src={previewImgSrc} alt="업로드된 이미지" className="preview" />}
        {location.pathname.includes('edit') && !isFileChanged ? (
          <div className="img-overlay">
            <ImageUploadIcon size={iconSize} />
            <div className="img-text">
              <span>예약 인증 사진을 올려주세요</span>
              <span>(첨부 불가능할 경우, 거래 시 개인에게 확인 필수)</span>
            </div>
          </div>
        ) : null}
      </FileLabel>
      {previewImgSrc && (
        <div
          className="delete"
          onClick={() => {
            removeImg()
          }}
        >
          삭제
        </div>
      )}
    </>
  )
}

const FileLabel = styled.label`
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

  @media (min-width: 834px) {
    width: 100%;
    height: 100%;
  }
`

export default FileUpload
