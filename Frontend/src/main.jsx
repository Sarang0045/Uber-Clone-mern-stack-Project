import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import UserContext from './Context/userContext' // Uncomment if you want to use context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <UserContext> */}
        <App />
      {/* </UserContext> */}
    </BrowserRouter>
  </StrictMode>,
)
