import { COLORS, FONT } from '@src/globalStyles'
import { Mobile } from '@src/hooks/useScreenHook'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Inner from '@src/components/Inner'
import PCBoardCard from '@src/components/MyPage/PCBoardCard'

const MyPage = () => {
  const [random, setRandom] = useState(0)
  useEffect(() => {
    const randomNumFn = (total: number) => {
      const num = Math.floor(Math.random() * total + 1)
      setRandom(num)
    }
    randomNumFn(4)
  })

  const isPC = useMediaQuery({
    query: '(min-width: 450px)',
  })

  return (
    <div>
      {isPC && (
        <>
          <PCNameContainer random={random}>
            <Inner>
              <PCName>
                <p>
                  <span>김필드</span> 님
                </p>
                <p>안녕하세요</p>
              </PCName>
            </Inner>
          </PCNameContainer>
          <Inner>
            <PCBoardContainer>
              <Title>작성 글 목록</Title>
              <ul>
                <li>
                  <PCBoardCard title="양도" />
                </li>
                <li>
                  <PCBoardCard title="좋아요" />
                </li>
                <li>
                  <PCBoardCard title="댓글" />
                </li>
              </ul>
            </PCBoardContainer>
            <PCList>
              <li>회원 정보 변경</li>
              <li>고객센터</li>
              <li>로그아웃</li>
              <li>현재 버전 1.02</li>
            </PCList>
          </Inner>
        </>
      )}
      <Mobile>
        <NameStyle random={random}>
          <p>
            <span>김필드</span> 님
          </p>
          <p>안녕하세요</p>
        </NameStyle>
        <MyMenuStyle>
          <li>
            <span>2</span>
            <span>양도</span>
          </li>
          <li>
            <span>1</span>
            <span>좋아요</span>
          </li>
          <li>
            <span>3</span>
            <span>댓글</span>
          </li>
        </MyMenuStyle>
        <ListStlye>
          <li>
            <div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.3937 7.12798C8.37589 7.02962 8.3219 6.94149 8.24236 6.88095C8.16283 6.82041 8.0635 6.79184 7.96396 6.80088C7.86441 6.80991 7.77185 6.85588 7.7045 6.92975C7.63716 7.00362 7.59991 7.10002 7.6001 7.19998V10.8016L7.6065 10.8736C7.62431 10.9719 7.67829 11.0601 7.75783 11.1206C7.83737 11.1811 7.93669 11.2097 8.03624 11.2007C8.13579 11.1916 8.22835 11.1457 8.29569 11.0718C8.36303 10.9979 8.40028 10.9015 8.4001 10.8016V7.19998L8.3937 7.12798ZM8.6393 5.39998C8.6393 5.24085 8.57608 5.08823 8.46356 4.97571C8.35104 4.86319 8.19843 4.79998 8.0393 4.79998C7.88017 4.79998 7.72756 4.86319 7.61503 4.97571C7.50251 5.08823 7.4393 5.24085 7.4393 5.39998C7.4393 5.55911 7.50251 5.71172 7.61503 5.82424C7.72756 5.93676 7.88017 5.99998 8.0393 5.99998C8.19843 5.99998 8.35104 5.93676 8.46356 5.82424C8.57608 5.71172 8.6393 5.55911 8.6393 5.39998ZM14.4001 7.99998C14.4001 6.30259 13.7258 4.67473 12.5256 3.47449C11.3253 2.27426 9.69748 1.59998 8.0001 1.59998C6.30271 1.59998 4.67485 2.27426 3.47461 3.47449C2.27438 4.67473 1.6001 6.30259 1.6001 7.99998C1.6001 9.69736 2.27438 11.3252 3.47461 12.5255C4.67485 13.7257 6.30271 14.4 8.0001 14.4C9.69748 14.4 11.3253 13.7257 12.5256 12.5255C13.7258 11.3252 14.4001 9.69736 14.4001 7.99998ZM2.4001 7.99998C2.4001 7.26457 2.54495 6.53637 2.82637 5.85695C3.1078 5.17753 3.52029 4.56019 4.0403 4.04018C4.56031 3.52017 5.17765 3.10768 5.85707 2.82625C6.53649 2.54482 7.2647 2.39998 8.0001 2.39998C8.7355 2.39998 9.4637 2.54482 10.1431 2.82625C10.8225 3.10768 11.4399 3.52017 11.9599 4.04018C12.4799 4.56019 12.8924 5.17753 13.1738 5.85695C13.4553 6.53637 13.6001 7.26457 13.6001 7.99998C13.6001 9.48519 13.0101 10.9096 11.9599 11.9598C10.9097 13.01 9.48531 13.6 8.0001 13.6C6.51489 13.6 5.0905 13.01 4.0403 11.9598C2.9901 10.9096 2.4001 9.48519 2.4001 7.99998Z"
                  fill="white"
                />
              </svg>
            </div>
            회원 정보 변경
          </li>
          <li>
            <div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.1024 7.66726V5.1047C4.11001 4.60098 4.21694 4.10372 4.41706 3.64141C4.61718 3.17909 4.90656 2.76081 5.26861 2.41052C5.63066 2.06023 6.05828 1.78483 6.52695 1.60009C6.99563 1.41534 7.49615 1.3249 7.99984 1.33393C8.50353 1.3249 9.00405 1.41534 9.47272 1.60009C9.94139 1.78483 10.369 2.06023 10.7311 2.41052C11.0931 2.76081 11.3825 3.17909 11.5826 3.64141C11.7827 4.10372 11.8897 4.60098 11.8973 5.1047V7.66726M9.94855 12.7826C10.4654 12.7826 10.9611 12.5773 11.3265 12.2119C11.692 11.8464 11.8973 11.3508 11.8973 10.8339V8.64162M9.94855 12.7826C9.94855 13.1057 9.82024 13.4155 9.59183 13.6439C9.36342 13.8723 9.05363 14.0006 8.73061 14.0006H7.26907C6.94605 14.0006 6.63626 13.8723 6.40785 13.6439C6.17944 13.4155 6.05112 13.1057 6.05112 12.7826C6.05112 12.4596 6.17944 12.1498 6.40785 11.9214C6.63626 11.693 6.94605 11.5647 7.26907 11.5647H8.73061C9.05363 11.5647 9.36342 11.693 9.59183 11.9214C9.82024 12.1498 9.94855 12.4596 9.94855 12.7826ZM2.64086 6.20572H3.61522C3.74443 6.20572 3.86835 6.25705 3.95971 6.34841C4.05107 6.43978 4.1024 6.56369 4.1024 6.6929V9.61598C4.1024 9.74519 4.05107 9.8691 3.95971 9.96047C3.86835 10.0518 3.74443 10.1032 3.61522 10.1032H2.64086C2.38245 10.1032 2.13461 10.0005 1.95189 9.81778C1.76916 9.63505 1.6665 9.38722 1.6665 9.1288V7.18008C1.6665 6.92167 1.76916 6.67383 1.95189 6.49111C2.13461 6.30838 2.38245 6.20572 2.64086 6.20572ZM13.3588 10.1032H12.3845C12.2552 10.1032 12.1313 10.0518 12.04 9.96047C11.9486 9.8691 11.8973 9.74519 11.8973 9.61598V6.6929C11.8973 6.56369 11.9486 6.43978 12.04 6.34841C12.1313 6.25705 12.2552 6.20572 12.3845 6.20572H13.3588C13.6172 6.20572 13.8651 6.30838 14.0478 6.49111C14.2305 6.67383 14.3332 6.92167 14.3332 7.18008V9.1288C14.3332 9.38722 14.2305 9.63505 14.0478 9.81778C13.8651 10.0005 13.6172 10.1032 13.3588 10.1032Z"
                  stroke="white"
                />
              </svg>
            </div>
            고객센터
          </li>
          <li>로그아웃</li>
          <li>현재 버전 1.01</li>
        </ListStlye>
      </Mobile>
    </div>
  )
}

export default MyPage

interface IStyleProps {
  random: number
}

const NameStyle = styled.div<IStyleProps>`
  background-image: ${(props) => `url(/my_page_banner/mobile_${props.random}.jpg)`};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  padding: 16px;
  font-size: 24px;
  height: 120px;
  justify-content: center;
  border-bottom: 1px solid ${COLORS.gray20};
  color: white;
  span {
    font-weight: 700;
  }
`

const MyMenuStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  border-bottom: 16px solid #fafafa;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 16px 45px;
    span:first-child {
      font-weight: 700;
    }
  }
`

const ListStlye = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    height: 24px;
    padding: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${COLORS.gray20};
    div {
      width: 20px;
      height: 20px;
      display: flex;
      padding: 2px;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: ${COLORS.green};
      margin-right: 8px;
    }
  }
`

const PCNameContainer = styled.div<IStyleProps>`
  background-image: ${(props) => `url(/my_page_banner/pc_${props.random}.jpg)`};
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  position: relative;
`

const PCName = styled.div`
  position: absolute;
  padding: 16px;
  bottom: 30px;
  font-size: 32px;
  color: white;
  span {
    font-weight: 700;
  }
`

const PCBoardContainer = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ul {
    display: flex;
    gap: 15px;
  }
`

const Title = styled.h2`
  font-size: ${FONT['pc-lg']};
  font-weight: 500;
`

const PCList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: ${FONT['pc-lg']};
  li {
    padding: 16px 0;
    height: 60px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`
