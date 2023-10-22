import { styled } from 'styled-components'
import { LoadingIcon } from '../../constants/icons'
import { COLORS } from '@src/globalStyles'

const Loading = () => {
  return (
    <LoadingContainer>
      <div>
        <LoadingIcon />
      </div>
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px auto;
  color: ${COLORS.green};

  svg {
    animation: progress-circular-rotate 1.4s linear infinite;
  }
  circle {
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    fill: transparent;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
    stroke: currentColor;
  }
  @keyframes progress-circular-rotate {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15px;
    }
    to {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -124px;
    }
  }
`

export default Loading
