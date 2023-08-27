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
import UserEdit from '@src/pages/UserEdit'
import FindPassword from '@src/pages/FindPassword'
import Edit from '@src/pages/Edit'
import ResetPw from '@src/components/ResetPassword/ResetPw'
import Ask from '@src/pages/Ask'
import AskDetail from '@src/pages/AskDetail'
import AskAnswerForm from '@src/pages/AskAnswerForm'
import PrivateRoute from './PrivateRoute'
import SocialLoginRedirect from '@src/components/SocialLoginRedirect'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: PATH.HOME, element: <Home /> },
      { path: PATH.BOARD_DETAILS, element: <BoardDetails /> },
      {
        path: PATH.WRITE,
        element: (
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.EDIT,
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
      { path: PATH.BOARD_LIST, element: <BoardList /> },
      { path: PATH.HELP, element: <Help /> },
      { path: PATH.HELP_FORM, element: <HelpForm /> },
      { path: PATH.JOIN, element: <Join /> },
      { path: PATH.LOGIN, element: <Login /> },
      { path: PATH.FIND_PASSWORD, element: <FindPassword /> },
      {
        path: PATH.MYPAGE,
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.MYPAGE_DETAIL,
        element: (
          <PrivateRoute>
            <MyPageDetail />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.MYPAGE_EDIT,
        element: (
          <PrivateRoute>
            <UserEdit />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.MYPAGE_PW,
        element: (
          <PrivateRoute>
            <ResetPw />
          </PrivateRoute>
        ),
      },
      { path: PATH.ASK, element: <Ask /> },
      { path: PATH.ASK_DETAIL, element: <AskDetail /> },
      { path: PATH.ASK_ANSWER_FORM, element: <AskAnswerForm /> },
      { path: PATH.SOCIAL_REDIRECT, element: <SocialLoginRedirect /> },
    ],
  },
])

export default router
