import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clients from './pages/Clients/Clients'
import ClientAdd from './pages/Clients/ClientAdd'
import ClientEdit from './pages/Clients/ClientEdit'
import ClientDetails from './pages/Clients/ClientDetails'
import { ThemeProvider } from '@mui/styles'
import { dashboardTheme } from './dashboardTheme'

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<ClientAdd />} />
          <Route path="clients/edit/:id" element={<ClientEdit />} />
          <Route path="clients/details/:id" element={<ClientDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
