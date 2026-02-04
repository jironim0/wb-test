import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './app/ui/App/App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/model/store.ts'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>

)
