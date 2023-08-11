import { publicApi, privateApi } from './Instance'

export const getSearchPostList = async (values: SearchValueTypes, page = 1) => {
  if (values.startTime.slice(0, 10) === values.endTime.slice(0, 10)) {
    values.startTime = ''
    values.endTime = ''
  }

  return await publicApi
    .get(
      `/search/${page}?title=${values.title}&categoryName=${values.category}&startTime=${values.startTime}&endTime=${
        values.endTime
      }&districtNames=${values.district.join()}`
    )
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getPostDetail = async (userId: number, loginVal: boolean) => {
  const Instance = loginVal ? privateApi : publicApi

  return await Instance.get(`/detail/${userId}`)
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const delPost = async (boardId: number | undefined) => {
  return await privateApi
    .delete(`/board/delete/${boardId}`)
    .then(() => {
      alert('삭제 되었습니다.')
    })
    .catch((err) => {
      return err
    })
}

export const getComment = async (boardId: number, page: number, loginVal: boolean) => {
  const Instance = loginVal ? privateApi : publicApi
  console.log(page)
  return await Instance.get(`comment-lookup/${boardId}/${page}`)
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const postComment = async (boardId: number, comment: string, parentId?: number) => {
  console.log(parentId)
  return await privateApi
    .post('comment/write', {
      commentContent: comment,
      boardId: boardId,
      parentId: parentId,
    })
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const postLikeBoard = async (boardId: number, loginVal: boolean) => {
  if (!loginVal) return alert('관심글 저장을 위해 로그인이 필요합니다.')

  return await privateApi
    .post('/board/register/wish-list', {
      boardId: boardId,
    })
    .then(() => {
      alert('관심글에 저장되었습니다.')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const delLikeBoard = async (boardId: number) => {
  return await privateApi
    .delete('board/delete/wish-list', {
      data: {
        boardId: boardId,
      },
    })
    .then(() => {
      alert('관심글에서 삭제되었습니다.')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const delComment = async (commentId: number) => {
  return await privateApi
    .delete(`/comment/delete/${commentId}`)
    .then(() => {
      alert('삭제되었습니다.')
    })
    .catch((err) => {
      console.log(err)
    })
}
export const addComment = async (commentId: number, content: string) => {
  return await privateApi
    .put(`/comment/edit/${commentId}`, {
      commentContent: content,
    })
    .then(() => {
      alert('수정되었습니다.')
    })
    .catch((err) => {
      console.log(err)
    })
}
