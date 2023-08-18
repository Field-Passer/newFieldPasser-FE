import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'
import Error from '@pages/Error'
import PATH from '@src/constants/pathConst'
import Home from '@pages/Main'
import BoardDetails from '@pages/BoardDetails'
import Write from '@src/pages/Write'
import BoardList from '@pages/BoardList'
import Help from '@pages/Help'
import HelpForm from '@pages/HelpForm'
import Join from '@pages/Join'
import Login from '@pages/Login'
import MyPage from '@pages/MyPage'
import MyPageDetail from '@src/pages/MyPageDetail'
import UserEdit from '@src/components/MyPage/UserEdit'
import FindPassword from '@src/pages/FindPassword'
import Edit from '@src/pages/Edit'
import ResetPw from '@src/components/ResetPassword/ResetPw'
import Ask from '@src/pages/Ask'
import AskDetail from '@src/pages/AskDetail'
import AskAnswerForm from '@src/pages/AskAnswerForm'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: PATH.HOME, element: <Home /> },
      { path: PATH.BOARD_DETAILS, element: <BoardDetails /> },
      { path: PATH.WRITE, element: <Write /> },
      { path: PATH.EDIT, element: <Edit /> },
      { path: PATH.BOARD_LIST, element: <BoardList /> },
      { path: PATH.HELP, element: <Help /> },
      { path: PATH.HELP_FORM, element: <HelpForm /> },
      { path: PATH.JOIN, element: <Join /> },
      { path: PATH.LOGIN, element: <Login /> },
      { path: PATH.FIND_PASSWORD, element: <FindPassword /> },
      {
        path: PATH.MYPAGE,
        element: <PrivateRoute />,
        children: [
          { path: '', element: <MyPage /> },
          { path: PATH.MYPAGE_DETAIL, element: <MyPageDetail /> },
          { path: PATH.MYPAGE_EDIT, element: <UserEdit /> },
          { path: PATH.MYPAGE_PW, element: <ResetPw /> },
        ],
      },
      { path: PATH.ASK, element: <Ask /> },
      { path: PATH.ASK_DETAIL, element: <AskDetail /> },
      { path: PATH.ASK_ANSWER_FORM, element: <AskAnswerForm /> },
    ],
  },
])

export default router
