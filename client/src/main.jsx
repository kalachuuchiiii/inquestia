import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Main from './layout/main.jsx';
import { Provider } from 'react-redux';
import store from './state/store.js';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store = {store} >
      <Main />
    </Provider>
  </BrowserRouter>
)
