import { styled } from 'styled-components'

type propsType = {
  sideOpen: boolean
}
const Overlay = ({ sideOpen }: propsType) => {
  return <>{sideOpen && <Container></Container>}</>
}

const Container = styled.div`
  position: fixed;
  background-color: rgba(79, 77, 77, 0.7);
  inset: 0;
  z-index: 8;
`

export default Overlay
