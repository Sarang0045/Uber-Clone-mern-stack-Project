import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext.jsx';
import CaptainContext from './Context/CapatainContext.jsx';
import SocketProvider from './Context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(

  <CaptainContext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>

)
