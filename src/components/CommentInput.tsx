import { addComment, getComment, postComment } from '@src/api/boardApi'
import { useRef } from 'react'
import { UpLoadIcon } from '@src/constants/icons'
import { styled } from 'styled-components'
import { useDispatch } from 'react-redux'
import { setCommentAdd, setCommentData, setCommentInput } from '@src/store/slices/commentSlice'
import { COLORS } from '@src/globalStyles'
import PATH from '@src/constants/pathConst'
import useModal from '@src/hooks/useModal'

type PropsType = {
  boardId: number
  loginVal: boolean
  commentId?: number
  type?: string
  commentContent?: string
}

const BoardCommentInput = (props: PropsType) => {
  const dispatch = useDispatch()
  const commentValue = useRef<HTMLTextAreaElement>(null)
  const { openModal } = useModal()

  const getCommnetData = async (boardId: number, page: number, loginVal: boolean) => {
    try {
      const CommentData = await getComment(boardId, page, loginVal)
      dispatch(setCommentData({ comment: CommentData }))
    } catch (err) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['오류가 발생했습니다. 다시 시도해주세요.'],
      })
    }
  }

  const addCommentFn = async () => {
    try {
      await addComment(props.commentId as number, commentValue.current?.value as string)
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['수정 되었습니다.'],
      })
    } catch (err) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['오류가 발생했습니다. 다시 시도해주세요.'],
      })
    } finally {
      dispatch(setCommentAdd({ commentAdd: -1 }))
    }
  }

  return (
    <InputEl>
      <textarea
        onFocus={(e) => {
          if (!props.loginVal) {
            openModal({
              isModalOpen: true,
              isConfirm: false,
              content: ['회원만 댓글 작성이 가능합니다.'],
              navigateOption: PATH.LOGIN,
            })
            e.target.blur()
          }
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()

            if (props.type !== 'add' && e.currentTarget.value.replace(/\n/g, '').replace(/\s/g, '').length !== 0) {
              try {
                postComment(props.boardId, e.currentTarget.value, props.commentId)
                dispatch(setCommentInput({ commentNum: -1 }))
                getCommnetData(props.boardId, 1, props.loginVal)
              } catch (err) {
                openModal({
                  isModalOpen: true,
                  isConfirm: false,
                  content: ['오류가 발생했습니다 다시 시도해주세요.'],
                })
              }
              e.currentTarget.value = ''
            } else if (e.currentTarget.value.replace(/\n/g, '').replace(/\s/g, '').length !== 0) {
              addCommentFn()
            } else if (e.currentTarget.value.replace(/\n/g, '').replace(/\s/g, '').length === 0) {
              openModal({
                isModalOpen: true,
                isConfirm: false,
                content: ['내용을 입력하세요.'],
              })
            }
          }
        }}
        ref={commentValue}
        placeholder={props.loginVal ? '댓글을 입력해주세요.' : '로그인 후 이용 가능합니다.'}
        defaultValue={props.commentContent ? props.commentContent : ''}
        maxLength={200}
        rows={1}
      />
      {props.type === 'add' ? (
        <div>
          <button
            className="add_comment_btn"
            onClick={() => {
              const comment = commentValue.current as HTMLTextAreaElement
              if (comment.value.replace(/\n/g, '').replace(/\s/g, '').length !== 0) {
                addCommentFn()
              } else {
                openModal({
                  isModalOpen: true,
                  isConfirm: false,
                  content: ['내용을 입력해주세요.'],
                })
              }
            }}
          >
            수정
          </button>
          <button className="cancle_comment_btn" onClick={() => dispatch(setCommentAdd({ commentAdd: -1 }))}>
            취소
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            const comment = commentValue.current as HTMLTextAreaElement
            if (comment.value.replace(/ /g, '') !== '') {
              postComment(props.boardId, comment.value, props.commentId)
              dispatch(setCommentInput({ commentNum: -1 }))
              getCommnetData(props.boardId, 1, props.loginVal)
              comment.value = ''
            } else {
              openModal({
                isModalOpen: true,
                isConfirm: false,
                content: ['내용을 입력해주세요.'],
              })
            }
          }}
        >
          <UpLoadIcon />
        </button>
      )}
    </InputEl>
  )
}

const InputEl = styled.div`
  width: 100%;
  height: 40px;

  textarea {
    width: 100%;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 50px;
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & > button,
  & > div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    height: 25px;

    @media ${({ theme }) => theme.device.tablet} {
      right: 26px;
    }
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 10px;
      border-radius: 8px;
    }

    .add_comment_btn {
      background: ${COLORS.green};
      color: #fff;
    }
  }
`

export default BoardCommentInput
