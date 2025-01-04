import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css';
import App from './layout/App';
import { store, StoreContext } from './app/stores/store';
// import './app/layout/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  </StrictMode>,
)
