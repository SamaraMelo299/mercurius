import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { UIProvider } from './context/UIContext'

import './styles/reset.css'
import './styles/variables.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/mercurius">
      <CartProvider>
        <ToastProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)