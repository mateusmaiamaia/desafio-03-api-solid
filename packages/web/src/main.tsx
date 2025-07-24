import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContexts.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ENVOLVA O APP COM O AUTHPROVIDER */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)