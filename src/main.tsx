import { Provider } from 'react-redux'
import store from './store/config'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@src/routes/router'
import GlobalStyles from './globalStyles'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <Provider store={store}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
)
