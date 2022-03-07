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
import Articles from './pages/Articles/Articles'
import ArticleAdd from './pages/Articles/ArticleAdd'
import ArticleEdit from './pages/Articles/ArticleEdit'
import ArticleDetails from './pages/Articles/ArticleDetails'
import Payments from './pages/Payments/Payments'
import PaymentAdd from './pages/Payments/PaymentAdd'
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
          <Route path="articles" element={<Articles />} />
          <Route path="articles/add" element={<ArticleAdd />} />
          <Route path="articles/edit/:id" element={<ArticleEdit />} />
          <Route path="articles/details/:id" element={<ArticleDetails />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/add" element={<PaymentAdd />} />
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
