import { useMediaQuery } from 'react-responsive'
import { styled } from 'styled-components'

type PropsType = {
  sideOpen: boolean
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({ sideOpen, setSideOpen }: PropsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)',
  })

  return (
    <>
      {sideOpen && isMobile ? (
        <Container
          onClick={() => {
            setSideOpen(false)
          }}
        ></Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  background-color: rgba(79, 77, 77, 0.2);
  inset: 0;
  z-index: 8;
`

export default Overlay
