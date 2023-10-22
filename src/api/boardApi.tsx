import { publicApi, privateApi } from './Instance'

export const getMainPostList = async (params: IMainListPayload, page = 1) => {
  return await publicApi.get(`/search/${page}`, { params }).then((res) => {
    return res.data.data
  })
}

export const getPostDetail = async (userId: number, loginVal: boolean) => {
  const Instance = loginVal ? privateApi : publicApi

  return await Instance.get(`/detail/${userId}`).then((res) => {
    return res.data.data
  })
}

export const delPost = async (boardId: number | undefined) => {
  return await privateApi.delete(`/board/delete/${boardId}`)
}

export const getComment = async (boardId: number, page: number, loginVal: boolean) => {
  const Instance = loginVal ? privateApi : publicApi
  return await Instance.get(`comment-lookup/${boardId}/${page}`).then((res) => {
    return res.data.data
  })
}

export const postComment = async (boardId: number, comment: string, parentId?: number) => {
  return await privateApi
    .post('comment/write', {
      commentContent: comment,
      boardId: boardId,
      parentId: parentId,
    })
    .then((res) => {
      return res
    })
}

export const postLikeBoard = async (boardId: number, loginVal: boolean) => {
  if (!loginVal) return false
  return await privateApi.post('/board/register/wish-list', {
    boardId: boardId,
  })
}

export const delLikeBoard = async (boardId: number) => {
  return await privateApi.delete('board/delete/wish-list', {
    data: {
      boardId: boardId,
    },
  })
}

export const delComment = async (commentId: number) => {
  return await privateApi.delete(`/comment/delete/${commentId}`)
}
export const addComment = async (commentId: number, content: string) => {
  return await privateApi.put(`/comment/edit/${commentId}`, {
    commentContent: content,
  })
}

export const addTransactionStatus = async (commentId: number) => {
  return await privateApi.put(`/board/sold-out/${commentId}`)
}

// 게시글 블라인드 처리
export const blindBoard = async (boardId: number) => {
  return await privateApi.put(`/admin/board/blind/${boardId}`)
}
