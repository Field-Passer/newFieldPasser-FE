import { GithubIcon } from '@src/constants/icons'
import PATH from '@src/constants/pathConst'
import { COLORS } from '@src/globalStyles'
import { useNavigate } from 'react-router'
import { styled } from 'styled-components'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  return (
    <FooterContainer>
      <div className="inner">
        <div className="top">
          <img src="/logo.png" alt="logo" />
          <div className="policy">
            <span onClick={() => navigate(PATH.HELP)}>이용약관 및 운영정책</span>
          </div>
        </div>
        <div className="repo">
          <a
            href="https://github.com/Field-Passer/newFieldPasser-BE"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <GithubIcon />
            Backend Repository
          </a>
          <a
            href="https://github.com/Field-Passer/newFieldPasser-FE"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <GithubIcon />
            Frontend Repository
          </a>
        </div>
        <div className="alert">
          필드패서는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 필드패서는 공간 거래정보 및 거래에 대해
          책임지지 않습니다.
        </div>
        <span className="copyright">&copy; {currentYear} FIELD-PASSER. All Rights Reserved.</span>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: ${COLORS.gray10};
  color: ${COLORS.font};
  margin-top: 50px;
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
        height: 21.59px;
        right: 0;
      }

      .policy {
        display: flex;
        gap: 16px;
        line-height: 20px;
        cursor: pointer;
      }
    }

    .repo {
      display: flex;
      gap: 15px;
      flex-direction: column;
      font-size: 15px;

      @media (min-width: 834px) {
        font-size: 13px;
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
