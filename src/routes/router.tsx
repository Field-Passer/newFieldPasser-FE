import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'
import Error from '@pages/Error'
import PATH from '@src/constants/pathConst'
import Home from '@pages/Main'
import BoardDetails from '@pages/BoardDetails'
import BoardForm from '@pages/BoardForm'
import BoardList from '@pages/BoardList'
import Help from '@pages/Help'
import HelpForm from '@pages/HelpForm'
import Join from '@pages/Join'
import Login from '@pages/Login'
import MyPage from '@pages/MyPage'
import MyPageDetail from '@src/pages/MyPageDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: PATH.HOME, element: <Home /> },
      { path: PATH.BOARD_DETAILS, element: <BoardDetails /> },
      { path: PATH.BOARD_FORM, element: <BoardForm /> },
      { path: PATH.BOARD_LIST, element: <BoardList /> },
      { path: PATH.HELP, element: <Help /> },
      { path: PATH.HELP_FORM, element: <HelpForm /> },
      { path: PATH.JOIN, element: <Join /> },
      { path: PATH.LOGIN, element: <Login /> },
      // private route로 element 감싸 주기
      { path: PATH.MYPAGE, element: <MyPage /> },
      { path: PATH.MYPAGE_DETAIL, element: <MyPageDetail /> },
    ],
  },
])

export default router
