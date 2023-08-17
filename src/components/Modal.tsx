import { styled } from 'styled-components'
const Modal = ({ modalOpen, setModalOpen }: IModalProps) => {
  // 필요한 props 및 기능
  // 닫기 버튼
  // text content
  // confirm기능 추가할 경우 navigate
  // overlay

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Container className={modalOpen ? 'open' : ''}>
      <div onClick={() => closeModal()}>닫기</div>
      <div>공통 사용 모달</div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  &.open {
    background-color: aliceblue;
  }
`

export default Modal
