import { delComment, getComment } from '@src/api/boardApi'
import { setCommentAdd, setCommentData, setCommentInput } from '@src/store/slices/commentSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

type Props = {
  item: CommentTypes
  login: boolean
  boardId: number
}

const CommentOptions = ({ item, login, boardId }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getCommnetData = async (Id: number, login: boolean) => {
    try {
      const CommentData = await getComment(Id, 1, login)
      dispatch(setCommentData({ comment: CommentData }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <li>
        <button
          onClick={() => {
            if (!login) return alert('로그인 회원만 댓글 작성 가능합니다.'), navigate('/login')
            dispatch(setCommentInput({ commentNum: item.commentId }))
          }}
        >
          답글쓰기
        </button>
      </li>
      {item.myComment && (
        <>
          <li>
            <button
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                  delComment(item.commentId)
                  getCommnetData(boardId, login)
                }
              }}
            >
              삭제
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(setCommentAdd({ commentAdd: item.commentId }))
              }}
            >
              수정
            </button>
          </li>
        </>
      )}
    </>
  )
}

export default CommentOptions
