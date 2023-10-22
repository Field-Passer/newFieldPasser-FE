import { delComment, getComment } from '@src/api/boardApi'
import { setCommentAdd, setCommentData, setCommentInput } from '@src/store/slices/commentSlice'
import { useDispatch } from 'react-redux'
import PATH from '@src/constants/pathConst'
import useModal from '@src/hooks/useModal'

type Props = {
  item: CommentTypes
  login: boolean
  boardId: number
  child: boolean
}

const CommentOptions = ({ item, login, boardId, child }: Props) => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const getCommnetData = async (Id: number, login: boolean) => {
    try {
      const CommentData = await getComment(Id, 1, login)
      dispatch(setCommentData({ comment: CommentData }))
    } catch (err) {
      openModal({
        isModalOpen: true,
        isConfirm: false,
        content: ['오류가 발생했습니다 다시 시도해주세요.'],
      })
    }
  }

  return (
    <>
      {!child && (
        <li>
          <button
            onClick={() => {
              if (!login) {
                return openModal({
                  isModalOpen: true,
                  isConfirm: false,
                  navigateOption: PATH.LOGIN,
                  content: ['로그인이 필요한 기능입니다.'],
                })
              } else {
                dispatch(setCommentInput({ commentNum: item.commentId }))
              }
            }}
          >
            답글쓰기
          </button>
        </li>
      )}

      {item.myComment && (
        <>
          <li>
            <button
              onClick={() => {
                openModal({
                  isModalOpen: true,
                  isConfirm: true,
                  content: ['정말 삭제하시겠습니까?.'],
                  confirmAction: () => {
                    try {
                      delComment(item.commentId)
                      openModal({
                        isModalOpen: true,
                        isConfirm: false,
                        content: ['삭제 되었습니다.'],
                      })
                    } catch (err) {
                      openModal({
                        isModalOpen: true,
                        isConfirm: false,
                        content: ['오류가 발생했습니다 다시 시도해주세요.'],
                      })
                    }
                    getCommnetData(boardId, login)
                  },
                })
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
