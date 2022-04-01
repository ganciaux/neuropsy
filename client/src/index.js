import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Articles from './pages/Articles/Articles'
import ArticleAdd from './pages/Articles/ArticleAdd'
import ArticleEdit from './pages/Articles/ArticleEdit'
import Clients from './pages/Clients/Clients'
import ClientAdd from './pages/Clients/ClientAdd'
import ClientEdit from './pages/Clients/ClientEdit'
import ClientDetails from './pages/Clients/ClientDetails'
import Orders from './pages/Orders/Orders'
import OrderAdd from './pages/Orders/OrderAdd'
import OrderEdit from './pages/Orders/OrderEdit'
import Payments from './pages/Payments/Payments'
import PaymentAdd from './pages/Payments/PaymentAdd'
import PaymentEdit from './pages/Payments/PaymentEdit'
import Sessions from './pages/Sessions/Sessions'
import SessionAdd from './pages/Sessions/SessionAdd'
import SessionEdit from './pages/Sessions/SessionEdit'
import Home from './pages/Home/Home'
import UserLogin from './pages/Users/UserLogin'
import { dashboardTheme } from './dashboardTheme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

//const queryClient = new QueryClient()

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="articles/" element={<Articles />} />
            <Route path="articles/add" element={<ArticleAdd />} />
            {/* <Route path="articles/details/:id" element={<ArticleDetails />} /> */}
            <Route path="articles/edit/:id" element={<ArticleEdit />} />
            <Route path="articles/" element={<Articles />} />
            <Route path="articles/add" element={<ArticleAdd />} />
            {/* <Route path="articles/details/:id" element={<ArticleDetails />} /> */}
            <Route path="articles/edit/:id" element={<ArticleEdit />} />
            <Route path="clients/" element={<Clients />} />
            <Route path="clients/add" element={<ClientAdd />} />
            <Route path="clients/details/:id" element={<ClientDetails />} />
            <Route path="clients/edit/:id" element={<ClientEdit />} />
            <Route path="orders/" element={<Orders />} />
            <Route path="orders/add" element={<OrderAdd />} />
            {/* <Route path="orders/details/:id" element={<OrderDetails />} /> */}
            <Route path="orders/edit/:id" element={<OrderEdit />} />
            <Route path="payments/" element={<Payments />} />
            <Route path="payments/add" element={<PaymentAdd />} />
            {/* <Route path="payments/details/:id" element={<PaymentDetails />} /> */}
            <Route path="payments/edit/:id" element={<PaymentEdit />} />
            <Route path="sessions/" element={<Sessions />} />
            <Route path="sessions/add" element={<SessionAdd />} />
            {/* <Route path="sessions/details/:id" element={<SessionDetails />} /> */}
            <Route path="sessions/edit/:id" element={<SessionEdit />} />
            <Route path="users/login" element={<UserLogin />} />
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
