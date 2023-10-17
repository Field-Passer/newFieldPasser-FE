import { addTransactionStatus, blindBoard, delLikeBoard, getPostDetail, postLikeBoard } from '@src/api/boardApi'
import { BigHart, Harticon, MoreIcon } from '@src/constants/icons'
import theme from '@src/constants/theme'
import { dateFormat, handleImgError, randomImages } from '@src/hooks/utils'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ThemeProvider, styled } from 'styled-components'
import { delPost } from './../api/boardApi'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store/config'
import BoardComment from '@src/components/Comment'
import { PC, Mobile } from '@src/hooks/useScreenHook'
import Modal from '@src/components/Modal'
import PATH from '@src/constants/pathConst'

const BoardDetails = () => {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const [detailData, setDetailData] = useState<POST_TYPE>()
  const [moreBtnChk, setMoreBtnChk] = useState(false)
  const [likeState, setLikeState] = useState(detailData?.likeBoard)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalIsConfirm, setModalIsConfirm] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string[]>([])
  const [modalNavigate, setModalNavigate] = useState<string>('')
  const authenticated = useSelector((state: RootState) => state.accessToken.authenticated)
  const userInfo = useSelector((state: RootState) => state.userInfo)

  const blindFn = async () => {
    try {
      await blindBoard(Number(boardId))
    } catch (error) {
      console.log(error)
    }
  }

  const getDetailData = async () => {
    try {
      const postDetailData = await getPostDetail(Number(boardId), authenticated)
      setDetailData(postDetailData)
      setLikeState(postDetailData.likeBoard)
    } catch (err) {
      console.log(err)
      if (userInfo.role === '관리자') {
        setModalOpen(true)
        setModalIsConfirm(true)
        setModalText(['블라인드 처리된 게시글입니다. 블라인드 해제하시겠습니까?'])
        setModalNavigate(PATH.HOME)
      }
    }
  }

  const delPostFn = async (id: number | undefined) => {
    try {
      await delPost(id)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const likePostFn = async (boardId: number, likeVal: boolean) => {
    try {
      likeVal ? await delLikeBoard(boardId) : await postLikeBoard(boardId, authenticated)
    } catch (err) {
      console.log(err)
    } finally {
      getDetailData()
    }
  }

  useEffect(() => {
    getDetailData()
  }, [boardId])

  useEffect(() => {
    const outClickFn = (e: MouseEvent) => {
      const moreBtn = document.querySelector('.more_btn')
      if (e.currentTarget !== moreBtn) return setMoreBtnChk(false)
      return
    }

    document.body.addEventListener('click', outClickFn)

    return () => {
      document.body.removeEventListener('click', outClickFn)
    }
  })

  const moreBtnHandler = (role: string, myBoard: boolean) => {
    if (role === '관리자' && myBoard) {
      return (
        <>
          <li>
            <button
              onClick={() =>
                window.confirm('양도 완료 상태로 변경하시겠습니까?') && addTransactionStatus(detailData?.boardId || 0)
              }
            >
              양도 완료하기
            </button>
          </li>
          <li>
            <button onClick={() => window.confirm('정말 삭제하시겠습니까?') && delPostFn(detailData?.boardId)}>
              삭제
            </button>
          </li>
          <li>
            <button onClick={() => navigate(`/edit/${boardId}`, { state: { data: detailData } })}>수정</button>
          </li>
          <li>
            <button
              onClick={() => {
                setModalOpen(true)
                setModalIsConfirm(true)
                setModalText(['블라인드 처리하시겠습니까?'])
                setModalNavigate(PATH.HOME)
              }}
            >
              블라인드
            </button>
          </li>
        </>
      )
    } else if (role === '관리자' && !myBoard) {
      return (
        <li>
          <button
            onClick={() => {
              setModalOpen(true)
              setModalIsConfirm(true)
              setModalText(['블라인드 처리하시겠습니까?'])
              setModalNavigate(PATH.HOME)
            }}
          >
            블라인드
          </button>
        </li>
      )
    } else if (role !== '관리자' && myBoard) {
      return (
        <>
          <li>
            <button
              onClick={() =>
                window.confirm('양도 완료 상태로 변경하시겠습니까?') && addTransactionStatus(detailData?.boardId || 0)
              }
            >
              양도 완료하기
            </button>
          </li>
          <li>
            <button onClick={() => window.confirm('정말 삭제하시겠습니까?') && delPostFn(detailData?.boardId)}>
              삭제
            </button>
          </li>
          <li>
            <button onClick={() => navigate(`/edit/${boardId}`, { state: { data: detailData } })}>수정</button>
          </li>
        </>
      )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {detailData && (
          <>
            <Mobile>
              <ContentBox>
                <div className="image_box">
                  <img
                    src={
                      detailData.imageUrl
                        ? detailData.imageUrl
                        : randomImages(detailData.categoryName || '', detailData.boardId || 0)
                    }
                    onError={(e) => handleImgError(e, detailData.categoryName || '', detailData.boardId || 0)}
                    alt=""
                  />
                </div>
              </ContentBox>
            </Mobile>
            <TitleBox>
              <div>
                <p className="title">{detailData.title}</p>
                <PC>
                  <button onClick={() => likePostFn(detailData.boardId, detailData.likeBoard)}>
                    <BigHart size="20" color={likeState ? '#5FCA7B' : ''} />
                  </button>
                </PC>
              </div>
              <div>
                <p className="date">
                  <PC>예약일</PC> {dateFormat(detailData.startTime || '')}
                </p>
                <PC>
                  <p className="price">{detailData.price.toLocaleString()}</p>
                </PC>
              </div>
              <Mobile>
                <div>
                  <p className="price">{detailData.price.toLocaleString()}</p>
                  <button onClick={() => likePostFn(detailData.boardId, detailData.likeBoard)}>
                    <BigHart size="20" color={likeState ? '#5FCA7B' : ''} />
                  </button>
                </div>
              </Mobile>
              <div>
                <p>
                  <span
                    className="user_name"
                    onClick={() =>
                      navigate(`/profile/${detailData.memberId}`, {
                        state: { memberName: detailData.memberName, memberId: detailData.memberId },
                      })
                    }
                  >
                    {detailData.memberName} {detailData.memberId}
                  </span>
                  <span className="view">조회수 {detailData.viewCount}</span>
                  <span className="like">
                    <Harticon size="14" /> {detailData.wishCount}
                  </span>
                </p>
                {(detailData.myBoard || userInfo.role === '관리자') && (
                  <button
                    className="more_btn"
                    onClick={(e) => {
                      moreBtnChk ? setMoreBtnChk(false) : setMoreBtnChk(true)
                      e.stopPropagation()
                    }}
                  >
                    <MoreIcon />
                  </button>
                )}
                {moreBtnChk && <ul className="more_menu">{moreBtnHandler(userInfo.role, detailData.myBoard)}</ul>}
              </div>
            </TitleBox>
            <ContentBox>
              <PC>
                <div className="image_box">
                  <img
                    src={
                      detailData.imageUrl
                        ? detailData.imageUrl
                        : randomImages(detailData.categoryName || '', detailData.boardId || 0)
                    }
                    onError={(e) => handleImgError(e, detailData.categoryName || '', detailData.boardId || 0)}
                    alt=""
                  />
                </div>
              </PC>
              <div className="content_text">
                <p>{detailData.content}</p>
              </div>
            </ContentBox>
            <BoardComment boardId={detailData.boardId} loginVal={authenticated} />
          </>
        )}
      </Container>
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          content={modalText}
          isConfirm={modalIsConfirm}
          navigateOption={modalNavigate}
          confirmFn={blindFn}
        ></Modal>
      )}
    </ThemeProvider>
  )
}

const Container = styled.div`
  max-width: 834px;
  margin: 32px auto 0;
  * {
    box-sizing: border-box;
  }

  @media ${({ theme }) => theme.device.tablet} {
    margin: 0 auto;
  }
`

const TitleBox = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: bold;
    }

    .date {
      font-size: 16px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
    }

    .like {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  div:last-child {
    position: relative;

    p {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    svg {
      cursor: pointer;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    div:last-child {
      align-items: start;
      margin-top: 8px;

      p {
        flex-wrap: wrap;
        padding: 8px 0;
        position: relative;
      }

      button {
        margin-top: 8px;
      }
    }

    div:last-child::after,
    div:last-child::before {
      content: '';
      position: absolute;
      width: calc(100% + 40px);
      height: 1px;
      background: #d9d9d9;
      left: -20px;
    }

    div:last-child::before {
      bottom: 0;
    }

    div:last-child::after {
      top: 0;
    }

    .user_name {
      width: 100%;
      display: block;
      font-size: 14px;
      cursor: pointer;
    }

    .view,
    .like {
      color: #aaaaaa;
      font-size: 12px;
    }

    .title {
      font-size: 14px !important;
      font-weight: 400 !important;
    }

    .date {
      font-size: 14px;
    }

    .price {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .more_menu {
    position: absolute;
    top: 35px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #ddd;
    width: 120px;
    /* height: 120px; */
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

    button {
      width: 100%;
      text-align: left;
    }

    li:first-child button {
      font-weight: bold;
    }
  }

  .more_menu::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    position: absolute;
    top: -11px;
    right: 5px;
    background: #fff;
    transform: rotate(50deg) skew(20deg, 15deg);
  }
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 0;

    .content_text {
      padding: 0 20px;
      font-size: 14px !important;
    }

    .image_box {
      margin-bottom: 16px !important;

      img {
        border-radius: 0 !important;
      }
    }
  }

  .image_box {
    width: 100%;
    margin-bottom: 48px;

    img {
      width: 100%;
      border-radius: 15px;
    }
  }

  .content_text {
    width: 100%;
    min-height: 300px;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;

    @media ${({ theme }) => theme.device.tablet} {
      min-height: 150px;
    }
  }
`

export default BoardDetails
