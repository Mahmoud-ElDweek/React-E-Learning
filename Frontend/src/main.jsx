import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import MyStore from './ReduxToolkit/MyStore.js'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={MyStore}>
      <App />
    </Provider>
  </StrictMode>,
)
