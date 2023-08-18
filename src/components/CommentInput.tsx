import { addComment, getComment, postComment } from '@src/api/boardApi'
import { useRef } from 'react'
import { UpLoadIcon } from '@src/constants/icons'
import { styled } from 'styled-components'
import { useDispatch } from 'react-redux'
import { setCommentAdd, setCommentData, setCommentInput } from '@src/store/slices/commentSlice'
import { useNavigate } from 'react-router'

type PropsType = {
  boardId: number
  loginVal: boolean
  commentId?: number
  type?: string
  commentContent?: string
}

const BoardCommentInput = (props: PropsType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const commentValue = useRef<HTMLInputElement>(null)

  const getCommnetData = async (boardId: number, page: number, loginVal: boolean) => {
    try {
      const CommentData = await getComment(boardId, page, loginVal)
      dispatch(setCommentData({ comment: CommentData }))
    } catch (err) {
      console.log(err)
    }
  }

  const addCommentFn = async () => {
    try {
      await addComment(props.commentId as number, commentValue.current?.value as string)
    } catch (err) {
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      dispatch(setCommentAdd({ commentAdd: -1 }))
    }
  }

  return (
    <InputEl>
      <input
        type="text"
        onFocus={(e) => {
          if (!props.loginVal) {
            alert('로그인 회원만 댓글 작성 가능합니다.')
            e.target.blur()
            navigate('/login')
          }
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13 && props.type !== 'add') {
            postComment(props.boardId, e.currentTarget.value, props.commentId)
            dispatch(setCommentInput({ commentNum: -1 }))
            getCommnetData(props.boardId, 1, props.loginVal)
            e.currentTarget.value = ''
          } else if (e.keyCode === 13) {
            addCommentFn()
          }
        }}
        ref={commentValue}
        placeholder={props.loginVal ? '댓글을 입력해주세요.' : '로그인 후 이용 가능합니다.'}
        defaultValue={props.commentContent ? props.commentContent : ''}
      />
      {props.type === 'add' ? (
        <div>
          <button onClick={() => addCommentFn()}>수정</button>
          <button onClick={() => dispatch(setCommentAdd({ commentAdd: -1 }))}>취소</button>
        </div>
      ) : (
        <button
          onClick={() => {
            const comment = commentValue.current as HTMLInputElement
            postComment(props.boardId, comment.value, props.commentId)
            dispatch(setCommentInput({ commentNum: -1 }))
            getCommnetData(props.boardId, 1, props.loginVal)
            comment.value = ''
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
  height: 100%;

  input {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-left: 15px;
  }

  & > button,
  & > div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    height: 25px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    button {
      height: 100%;
    }
  }
`

export default BoardCommentInput
