import { COLORS } from '@src/globalStyles'
import { AiFillGithub } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { styled } from 'styled-components'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <FooterContainer>
      <div className="inner">
        <div className="top">
          <img src="/logo.png" />
          <div className="policy">
            <span onClick={() => navigate('/help')}>이용약관</span>
            <span onClick={() => navigate('/help')}>운영정책</span>
          </div>
        </div>
        <a href="https://github.com/Field-Passer/newFieldPasser-BE" target="_blank" rel="noopener noreferrer" className="link">
          <AiFillGithub />
          Backend Repository
        </a>
        <a href="https://github.com/Field-Passer/newFieldPasser-FE" target="_blank" rel="noopener noreferrer" className="link">
          <AiFillGithub />
          Frontend Repository
        </a>
        <div className="alert">
          필드패서는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 필드패서는 공간 거래정보 및 거래에 대해 책임지지 않습니다.
        </div>
        <span className="copyright">&copy; 2023 FIELD-PASSER. All Rights Reserved.</span>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: ${COLORS.gray10};
  color: ${COLORS.font};
  margin-top: 50px;
  /* bottom: 0; */
  width: 100%;
  position: relative;
  padding: 30px 0;

  .inner {
    position: relative;
    max-width: var(--screen-pc);
    margin: auto;
    height: 160px;
    font-size: 13px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    box-sizing: border-box;

    .top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid ${COLORS.font};

      img {
        width: 144px;
        right: 0;
      }

      .policy {
        display: flex;
        gap: 16px;
        line-height: 20px;
        cursor: pointer;
      }
    }

    .link {
      padding: 0 4px;
      display: flex;
      gap: 4px;
    }

    .alert {
      font-size: 11px;
      margin: 10px 0;
    }

    .copyright {
      font-weight: 700;
      text-align: right;
      font-size: 11px;
    }
  }
`

export default Footer
