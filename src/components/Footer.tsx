import { AiFillGithub } from 'react-icons/ai'
import { styled } from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner">
        <a
          href="https://github.com/Field-Passer/Field-Passer-BE"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <AiFillGithub />
          Backend Repository
        </a>
        <a
          href="https://github.com/Field-Passer/Field-Passer-FE"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <AiFillGithub />
          Frontend Repository
        </a>
        <div className="logo">
          <img src="/logo.png" />
        </div>
        <span>&copy; 2023 FIELD-PASSER. All Rights Reserved.</span>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  margin-top: 40px;
  padding-top: 20px;

  .inner {
    position: relative;
    max-width: 1440px;
    margin: auto;
    height: 160px;
    font-size: 13px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;

    .link {
      padding: 0 4px;
      display: flex;
      gap: 4px;
    }

    .logo {
      display: flex;
      justify-content: end;

      img {
        width: 144px;
        right: 0;
        filter: invert(100%);
      }
    }

    span {
      font-weight: 700;
      text-align: right;
    }
  }
`

export default Footer
