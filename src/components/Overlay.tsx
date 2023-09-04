import { useMediaQuery } from 'react-responsive'
import { styled } from 'styled-components'

const Overlay = ({ sideOpen, setSideOpen, modalOpen }: IOverlayProps) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  return (
    <>
      {sideOpen && isMobile ? (
        <Container
          onClick={() => {
            setSideOpen && setSideOpen(false)
          }}
        ></Container>
      ) : null}
      {modalOpen && <Container></Container>}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  background-color: rgba(79, 77, 77, 0.2);
  inset: 0;
  z-index: 80;
`

export default Overlay
