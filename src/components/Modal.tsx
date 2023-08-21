import { COLORS } from '@src/globalStyles'
import { styled } from 'styled-components'
import { LuInfo } from 'react-icons/lu'
import { CloseButton } from '@src/constants/icons'
import { useMediaQuery } from 'react-responsive'
const Modal = ({ modalOpen, setModalOpen, content }: IModalProps) => {
  // 필요한 props 및 기능
  // confirm기능 추가할 경우 navigate
  // overlay

  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      {modalOpen && (
        <Container>
          {!isMobile && (
            <PcButton onClick={() => closeModal()}>
              <CloseButton />
            </PcButton>
          )}
          <LuInfo className="info" />
          <Content>
            {content.map((text) => {
              return <span key={text}>{text}</span>
            })}
          </Content>
          {isMobile && <MobileButton onClick={() => closeModal()}>닫기</MobileButton>}
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80%;
  max-width: 500px;
  height: 190px;
  margin: auto;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 834px) {
    min-width: 500px;
    width: 50%;
    max-width: 620px;
    height: 240px;
  }

  .info {
    width: 64px;
    height: 64px;
    color: ${COLORS.gray20};
    margin: 0 auto;

    @media (max-width: 833px) {
      display: none;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
`

const MobileButton = styled.button`
  width: 90%;
  height: 45px;
  background-color: ${COLORS.gray20};
  border-radius: 8px;
  margin: 0 auto;
  font-size: 16px;
  color: ${COLORS.gray40};
  font-weight: 700;

  &:hover {
    color: ${COLORS.font};
  }
`

const PcButton = styled.button`
  position: absolute;
  top: 26px;
  right: 26px;
`

export default Modal
