import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { styled } from 'styled-components'
import { COLORS, FONT } from '@src/globalStyles'
import { editUserInfo, getUserInfo } from '@src/api/authApi'
import useInput from '@src/hooks/useInputHook'

const UserEdit = () => {
  const navigate = useNavigate()

  // 인풋 유효성 검사
  const nameValidator = (userName: string) => {
    if (userName === '' || userName.length < 0 || userName.length > 5) return true
  }
  const nickNameValidator = (userNickName: string) => {
    if (userNickName === null || userNickName.length > 12) return true
  }
  const userPhoneValidator = (uPhone: string) => {
    setUserPhone(
      uPhone
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    )
    if (uPhone.length >= 0 && uPhone.length <= 8) return true
    if (uPhone.length >= 11) return false
  }

  const [userEmail, onChangeUserEmail, userEmailError, setUserEmail] = useInput('')
  const [userName, onChangeUserName, userNameError, setUserName] = useInput(nameValidator, '')
  const [userNickName, onChangeUserNickName, userNickNameError, setUserNickName] = useInput(nickNameValidator, '')
  const [userPhone, onChangeUserPhone, userPhoneError, setUserPhone] = useInput(userPhoneValidator, '')

  // 회원 정보 불러오기
  useEffect(() => {
    const getUserValue = async () => {
      const { status, memberId, memberName, memberNickName, memberPhone } = (await getUserInfo()) as IUserInfoEditType
      if (status === 200) {
        setUserEmail(memberId)
        setUserName(memberName)
        setUserNickName(memberNickName)
        setUserPhone(memberPhone)
      }
    }
    getUserValue()
  }, [])

  // 회원 정보 변경 요청
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userName === '' || userNickName === '' || userPhone === '') return alert('양식은 비어있을 수 없습니다.')
    if (userPhoneError) return alert('양식을 다시 확인해주세요.')
    const { status } = (await editUserInfo({
      userName,
      userNickName,
      userPhone,
    })) as IResponseType
    if (status === 200) {
      navigate('/mypage')
      alert('회원 정보가 변경되었습니다.')
    }
  }

  return (
    <Container>
      <form onSubmit={onSubmitHandler}>
        <div className="input_wrap">
          <div className="input_wrap_inner">
            <label>이메일(변경 불가)</label>
            <input type="email" name="userEmail" onChange={onChangeUserEmail} value={userEmail || ''} placeholder="field-passer@naver.com" disabled />
          </div>

          <div className="input_wrap_inner">
            <label>이름</label>
            <input type="text" name="userName" onChange={onChangeUserName} value={userName || ''} placeholder="김필드" maxLength={5} />
            <p className="error_message">{userNameError && '이름은 다섯글자를 넘을 수 없습니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>닉네임</label>
            <input type="text" name="userNickName" onChange={onChangeUserNickName} value={userNickName} placeholder="김필드패서" maxLength={12} />
            <p className="error_message">{userNickNameError && '닉네임은 열두글자를 넘을 수 없습니다.'}</p>
          </div>

          <div className="input_wrap_inner">
            <label>전화번호</label>
            <input type="text" name="userPhone" onChange={onChangeUserPhone} value={userPhone} placeholder="010-1234-5678" maxLength={13} />
            <p className="error_message">{userPhoneError && '전화번호를 정확히 입력해주세요.'}</p>
          </div>
        </div>

        <button className="btn_edit">변경하기</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 360px) {
    padding: 0 16px;
    width: 100%;
  }

  margin: 64px auto 0;
  width: 328px;

  form {
    margin-top: 44px;
  }

  .text_wrap {
    margin-bottom: 60px;
    width: 170px;
  }

  .input_wrap {
    &_inner {
      position: relative;
      margin: 8px 0;
      height: 88px;
    }
  }

  input {
    margin: 8px 0 6px;
    padding: 16px 8px;
    width: 100%;
    height: 47px;
    border: 1px solid ${COLORS.gray20};
    border-radius: 8px;
    font-weight: 500;
    font-size: 12px;
    &::placeholder {
      color: ${COLORS.gray40};
    }
  }

  .error_message {
    font-size: 12px;
    color: ${COLORS.error};
  }

  .help_message {
    font-size: 12px;
    color: ${COLORS.green};
  }

  .btn_edit {
    margin-top: 48px;
    width: 100%;
    height: 47px;
    background-color: ${COLORS.green};
    font-size: ${FONT.pc};
    font-weight: 700;
    color: white;
  }
`

export default UserEdit
