import { postComment } from "@src/api/boardApi";
import { useRef } from "react";
import { UpLoadIcon } from '@src/constants/icons';
import { styled } from "styled-components";

type PropsType = {
  boardId: number
  loginVal: boolean
  commentId?: number
}

const BoardCommentInput = (props: PropsType) => {
  const commentValue = useRef<HTMLInputElement>(null);

  return (
    <InputEl>
      <input type="text"
        onFocus={(e) => {
          if (!props.loginVal) {
            alert('로그인 회원만 댓글 작성 가능합니다.')
            e.target.blur();
          }
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            postComment(props.boardId, e.currentTarget.value, props.commentId)
            e.currentTarget.value = ''
          }
        }}
        ref={commentValue}
      />
      <button onClick={() => {
        const comment = commentValue.current as HTMLInputElement
        postComment(props.boardId, comment.value, props.commentId)
        comment.value = ''
      }}>
        <UpLoadIcon />
      </button>
    </InputEl>
  )
}

const InputEl = styled.div`
  width:100%;
  height:100%;

  input {
    width: 100%;
    height:100%;
    border:1px solid #D9D9D9;
    border-radius: 10px;
    padding:0;
  }

  button {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    right:24px;
    width:25px;
    height:25px;
  }
`

export default BoardCommentInput