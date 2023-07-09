import { Provider } from 'react-redux'
import store, { persistor } from './store/config'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@src/routes/router'
import GlobalStyles from './globalStyles'
import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </CookiesProvider>
)
