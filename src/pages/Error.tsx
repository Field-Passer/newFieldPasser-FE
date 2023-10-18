import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS } from '@src/globalStyles'
import { NoticeIcon } from '@src/constants/icons'
import PATH from '@src/constants/pathConst'

const Error = () => {
  const navigate = useNavigate()
  return (
    <Main>
      <div onClick={() => navigate(PATH.HOME, { replace: true })}>
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="notice">
        <NoticeIcon />
        <span>존재하지 않는 페이지입니다.</span>
      </div>
      <div>
        <button onClick={() => navigate(PATH.HOME, { replace: true })}>메인으로 돌아가기</button>
      </div>
    </Main>
  )
}

const Main = styled.main`
  text-align: center;
  font-size: 26px;
  margin: 20px auto 0;

  img {
    width: 200px;
    margin-bottom: 50px;
    cursor: pointer;
  }

  .notice {
    display: flex;
    flex-direction: column;
    margin: auto;

    svg {
      margin: 20px auto;
    }
  }

  button {
    background-color: ${COLORS.green};
    padding: 10px 20px;
    margin-top: 70px;
    color: white;
    font-size: 18px;
    box-shadow: 5px 5px 5px ${COLORS.gray20};

    &:hover {
      background-color: ${COLORS.gray40};
    }
  }
`

export default Error
