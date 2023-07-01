import { useMediaQuery } from 'react-responsive'
import { styled } from 'styled-components'

type propsType = {
  sideOpen: boolean
}
const Overlay = ({ sideOpen }: propsType) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 450px)',
  })
  return <>{sideOpen && isMobile ? <Container></Container> : null}</>
}

const Container = styled.div`
  position: fixed;
  background-color: rgba(79, 77, 77, 0.2);
  inset: 0;
  z-index: 8;
`

export default Overlay
