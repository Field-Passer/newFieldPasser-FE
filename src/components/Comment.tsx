import { getComment } from '@src/api/boardApi';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import BoardCommentInput from './CommentInput';

type PropsType = {
  boardId: number
  loginVal: boolean
}

const BoardComment = (props: PropsType) => {
  const [commentData, setCommentData] = useState([])
  const [page, setPage] = useState(1);
  const [commentNum, setCommentNum] = useState(-1);
  console.log(commentData)

  const getCommnetData = async (boardId: number, page: number, loginVal: boolean) => {
    try {
      const CommentData = await getComment(boardId, page, loginVal)
      setCommentData(CommentData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCommnetData(props.boardId, page, props.loginVal)
  }, []);

  return (
    <Container>
      <InputBox>
        <BoardCommentInput loginVal={props.loginVal} boardId={props.boardId} />
      </InputBox>
      <CommentList>
        {commentData.map((item: any, key) => (
          <li key={key}>
            <p>{item.memberId}</p>
            <p>{item.commentContent}</p>
            <p><span>{item.commentUpDate}</span> <span>{item.children.length}</span></p>
            <button onClick={() => {
              if (!props.loginVal) return alert('로그인 회원만 댓글 작성 가능합니다.')
              commentNum === key ? setCommentNum(-1) : setCommentNum(key)
            }}>답글</button>
            {commentNum === key && (
              <InputBox>
                <BoardCommentInput loginVal={props.loginVal} boardId={props.boardId} commentId={item.commentId} />
              </InputBox>
            )}
            <ul>
              {
                item.children.map((child: any, idx: number) => (
                  <ChildComment key={idx}>
                    <p>{child.memberId}</p>
                    <p>{child.commentContent}</p>
                    <p>{child.commentUpDate}</p>
                  </ChildComment>
                ))
              }
            </ul>
          </li>
        ))}
      </CommentList>
    </Container>
  )
}

const Container = styled.div`
  max-width:var(--screen-pc);
  margin:0 auto;
  
  * {
    box-sizing: border-box;
  }
`

const InputBox = styled.div`
  padding:16px;
  border:1px solid #D9D9D9;
  border-right:0;
  border-left:0;
  height:72px;
  position:relative;  
`

const CommentList = styled.ul`
  div {
    padding-left:50px;
  }
`

const ChildComment = styled.li`
  background:#ddd;
  padding-left:50px;
`

export default BoardComment;