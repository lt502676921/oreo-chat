import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'
import MessageManager from './MessageManager'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
)

const messageManager = ReactDOM.createRoot(document.getElementById('message_container'))
messageManager.render(
  <React.StrictMode>
    <MessageManager />
  </React.StrictMode>
)
