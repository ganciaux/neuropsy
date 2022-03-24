import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Client from './pages/Clients/Client'
import ClientEdit from './pages/Clients/ClientEdit'
import Clients from './pages/Clients/Clients'
import Clients2 from './pages/Clients/Clients2'
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
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

/*
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
*/
const queryClient = new QueryClient()

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="clients2" element={<Clients2 />} />
            <Route path="clients2/edit2/:id" element={<ClientEdit />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/add" element={<Client />} />
            <Route path="clients/edit/:id" element={<Client />} />
            <Route path="clients/details/:id" element={<ClientDetails />} />
            <Route
              path="clients/details/:idClient/session"
              element={<Session />}
            />
            <Route
              path="clients/details/:idClient/session/:id"
              element={<Session />}
            />
            <Route
              path="clients/details/:idClient/payment/:id"
              element={<Payment />}
            />
            <Route
              path="clients/details/:idClient/payment"
              element={<Payment />}
            />
            <Route
              path="clients/details/:idClient/order/:id"
              element={<Order />}
            />
            <Route path="clients/details/:idClient/order" element={<Order />} />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
