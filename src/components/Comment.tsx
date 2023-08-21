import { getComment } from '@src/api/boardApi'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { styled } from 'styled-components'
import BoardCommentInput from './CommentInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/config'
import { BalloonIcon, ClackIcon, MoreIcon } from '@src/constants/icons'
import { dateFormat } from '@src/hooks/utils'
import CommentOptions from '../components/CommentOptions'
import { setCommentAdd, setCommentInput, setCommentOptions } from '@src/store/slices/commentSlice'

type PropsType = {
  boardId: number
  loginVal: boolean
}

const BoardComment = (props: PropsType) => {
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState<CommentTypes[]>([])
  const dispatch = useDispatch()
  const [totalPage, setTotalPage] = useState<number[]>([])

  //element
  const commentMoreBtn = useRef<HTMLButtonElement>(null)

  const commentData = useSelector((state: RootState) => {
    return {
      data: state.commentData.comment,
      commentNum: state.commentData.commentNum,
      commentBox: state.commentData.commentBox,
      commentAdd: state.commentData.commentAdd,
    }
  })
  console.log(commentData.commentAdd)

  const getCommnetData = useCallback(
    async (boardId: number, page: number, loginVal: boolean) => {
      try {
        const CommentData = await getComment(boardId, page, loginVal)

        let total = []
        for (let i = 1; i <= CommentData.totalPages; i++) {
          total.push(i)
        }

        setTotalPage(total)
        setComments(CommentData.content)
      } catch (err) {
        console.log(err)
      }
    },
    [commentData.data, commentData.commentAdd, page]
  )

  useEffect(() => {
    getCommnetData(props.boardId, page, props.loginVal)
  }, [getCommnetData, commentData.data, commentData.commentAdd])

  useEffect(() => {
    dispatch(setCommentInput({ commentNum: -1 }))
    dispatch(setCommentOptions({ commentBox: -1 }))
    dispatch(setCommentAdd({ commentAdd: -1 }))
  }, [])

  useEffect(() => {
    const outClickFn = (e: MouseEvent) => {
      console.log(e.currentTarget)
      const moreBtn = document.querySelector('.comment-more-btn')
      if (e.currentTarget !== moreBtn) return dispatch(setCommentOptions({ commentBox: -1 }))
      return
    }

    document.body.addEventListener('click', outClickFn)

    return () => {
      document.body.removeEventListener('click', outClickFn)
    }
  }, [])

  return (
    <Container>
      <InputBox type="parent">
        <BoardCommentInput loginVal={props.loginVal} boardId={props.boardId} />
      </InputBox>
      <CommentList>
        {comments.map((item: CommentTypes, key: number) => (
          <li key={key} className="comment-box">
            <p>
              {item.memberNickname} {item.memberId} {item.commentRegisterDate.substring(0, 20) !== item.commentUpDate.substring(0, 20) ? '(수정됨)' : null}
            </p>
            {commentData.commentAdd !== item.commentId ? (
              <p style={item.deleteCheck ? { color: '#999' } : {}}>{item.deleteCheck ? '삭제된 댓글입니다.' : item.commentContent}</p>
            ) : (
              <InputBox type="add">
                <BoardCommentInput
                  loginVal={props.loginVal}
                  boardId={props.boardId}
                  commentId={item.commentId}
                  type={'add'}
                  commentContent={item.commentContent}
                />
              </InputBox>
            )}
            <div className="comment-info-box">
              <p>
                <span>
                  <ClackIcon />
                  {dateFormat(item.commentUpDate, 'comment')}
                </span>
                <span>
                  <BalloonIcon />
                  {item.children.length}
                </span>
              </p>
              {item.deleteCheck ? null : (
                <button
                  className="comment-more-btn"
                  ref={commentMoreBtn}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    commentData.commentBox === item.commentId
                      ? dispatch(setCommentOptions({ commentBox: -1 }))
                      : dispatch(setCommentOptions({ commentBox: item.commentId }))
                    e.stopPropagation()
                  }}
                >
                  <MoreIcon color="#D9D9D9" />
                </button>
              )}
            </div>
            {commentData.commentBox === item.commentId && (
              <CommentOptionBox>
                <CommentOptions item={item} login={props.loginVal} boardId={props.boardId} />
              </CommentOptionBox>
            )}
            {commentData.commentNum === item.commentId && (
              <InputBox type="child">
                <BoardCommentInput loginVal={props.loginVal} boardId={props.boardId} commentId={item.commentId} />
              </InputBox>
            )}
            {item.children && (
              <ul>
                {item.children.map((child: any, idx: number) => (
                  <ChildComment key={idx}>
                    <p>
                      {child.memberNickname} {child.memberId}{' '}
                      {child.commentRegisterDate.substring(0, 20) !== child.commentUpDate.substring(0, 20) ? '(수정됨)' : null}
                    </p>
                    {commentData.commentAdd !== child.commentId ? (
                      <p>{child.commentContent}</p>
                    ) : (
                      <InputBox type="add">
                        <BoardCommentInput
                          loginVal={props.loginVal}
                          boardId={props.boardId}
                          commentId={child.commentId}
                          type={'add'}
                          commentContent={child.commentContent}
                        />
                      </InputBox>
                    )}
                    <div className="comment-info-box">
                      <p>
                        <span>
                          <ClackIcon />
                          {dateFormat(item.commentUpDate, 'comment')}
                        </span>
                      </p>
                      <button
                        className="comment-more-btn"
                        ref={commentMoreBtn}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          commentData.commentBox === child.commentId
                            ? dispatch(setCommentOptions({ commentBox: -1 }))
                            : dispatch(setCommentOptions({ commentBox: child.commentId }))
                          e.stopPropagation()
                        }}
                      >
                        <MoreIcon color="#D9D9D9" />
                      </button>
                    </div>

                    {commentData.commentBox === child.commentId && (
                      <CommentOptionBox>
                        <CommentOptions item={child} login={props.loginVal} boardId={props.boardId} />
                      </CommentOptionBox>
                    )}
                  </ChildComment>
                ))}
              </ul>
            )}
          </li>
        ))}
      </CommentList>
      <PagenationBtn>
        {totalPage.map((num: number) => (
          <li key={num}>
            <button onClick={() => setPage(num)} className={page === num ? 'selected' : ''}>
              {num}
            </button>
          </li>
        ))}
      </PagenationBtn>
    </Container>
  )
}

const Container = styled.div`
  max-width: var(--screen-pc);
  margin: 0 auto;

  * {
    box-sizing: border-box;
  }
`

const InputBox = styled.div<{ type: string }>`
  padding: 16px;
  padding-right: 0;
  padding-left: ${(props) => (props.type === 'add' ? '0' : '16px')};
  border: ${(props) => (props.type === 'parent' ? '1px solid #d9d9d9' : 'none')};
  border-right: 0;
  border-left: 0;
  height: 72px;
  position: relative;

  @media ${({ theme }) => theme.device.tablet} {
    padding-right: 16px;
  }
`

const CommentList = styled.ul`
  li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 16px 0 0 16px;
    position: relative;

    & > p:nth-child(1) {
      font-size: 12px;
      color: #aaa;
    }

    & > p:nth-child(2) {
      font-size: 16px;
      color: #000;
      margin: 12px 0 8px;

      @media ${({ theme }) => theme.device.tablet} {
        font-size: 14px !important;
      }
    }

    .comment-info-box {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      position: relative;

      &::after {
        content: '';
        width: calc(100% + 16px);
        height: 1px;
        background: #ecececf4;
        position: absolute;
        bottom: 0;
        left: -16px;
      }

      p {
        display: flex;
        gap: 8px;
        font-size: 12px;
        color: #aaa;

        span {
          display: flex;
          gap: 6px;
          align-items: center;
        }
      }

      button {
        margin-right: 16px;
      }
    }
  }
`

const ChildComment = styled.li`
  background: #fafafa;
  padding-left: 32px !important;
  margin-left: -16px;

  .comment-info-box {
    &::after {
      width: calc(100% + 32px) !important;
      background: #d9d9d9 !important;
      left: -32px !important;
    }
  }

  &:last-child .comment-info-box {
    &::after {
      background: none !important;
    }
  }
`

const CommentOptionBox = styled.ul`
  position: absolute;
  top: 100px;
  right: 10px;
  background: #fff;
  border: 1px solid #d9d9d9;
  padding: 16px;
  width: 120px;
  z-index: 100;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

  &::after {
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

  li {
    padding: 0;

    button {
      text-align: left;
    }
  }

  li:nth-child(2) {
    margin: 10px 0;
  }
`

const PagenationBtn = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  gap: 5px;

  button {
    color: #777;
    font-size: 16px;
  }

  .selected {
    color: #000;
    pointer-events: none;
  }
`

export default BoardComment
