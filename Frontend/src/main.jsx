import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from "./Context/UserContext"
import CaptainContext from './Context/CaptainContext'
import SocketProvider from './Context/SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <CaptainContext>
          <UserContext>
            <App />
          </UserContext>
        </CaptainContext>
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>,
)
