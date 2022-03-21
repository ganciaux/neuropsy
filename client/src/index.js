import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Client from './pages/Clients/Client'
import Clients from './pages/Clients/Clients'
import ClientDetails from './pages/Clients/ClientDetails'
import Article from './pages/Articles/Article'
import Articles from './pages/Articles/Articles'
import ArticleDetails from './pages/Articles/ArticleDetails'
import Payment from './pages/Payments/Payment'
import Payments from './pages/Payments/Payments'
import Orders from './pages/Orders/Orders'
import Order from './pages/Orders/Order'
import Session from './pages/Sessions/Session'
import Sessions from './pages/Sessions/Sessions'
import Home from './pages/Home/Home'
import { ThemeProvider } from '@mui/styles'
import { dashboardTheme } from './dashboardTheme'
import Reports from './pages/Report/Reports'

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<Client />} />
          <Route path="clients/edit/:id" element={<Client />} />
          <Route path="clients/details/:id" element={<ClientDetails />} />
          <Route
            path="clients/details/session/:idClient"
            element={<Session />}
          />
          <Route
            path="clients/details/payment/:idClient"
            element={<Payment />}
          />
          <Route path="clients/details/order/:idClient" element={<Order />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/add" element={<Article />} />
          <Route path="articles/edit/:id" element={<Article />} />
          <Route path="articles/details/:id" element={<ArticleDetails />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/add" element={<Payment />} />
          <Route path="payments/edit/:id" element={<Payment />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="sessions/add" element={<Session />} />
          <Route path="sessions/edit/:id" element={<Session />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/add" element={<Order />} />
          <Route path="orders/edit/:id" element={<Order />} />
          <Route path="reports" element={<Reports />} />
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
