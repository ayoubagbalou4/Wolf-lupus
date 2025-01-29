import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './auth/Login';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import axios from 'axios';
import Categories from './admin/Categories';
import CategoriesPage from './pages/Categories';
import AddCategory from './admin/AddCategory';
import EditCategory from './admin/EditCategory';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Context from './Context';
import Checkout from './pages/Checkout';
import ProductsCatalog from './pages/ProductsCatalog';
import ProductsByCategory from './pages/ProductsByCategory';
import Reviews from './admin/Reviews';
import ChoosePayment from './pages/ChoosePayment';
import PaymentCash from './pages/PaymentCash';
import Orders from './admin/Orders';
import OrderDetails from './admin/OrderDetails';
import ScrollToTop from './components/ScrollToTop';
import PaymentCard from './pages/PaymentCard';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const App = () => {

  // axios.defaults.baseURL = 'https://wolf-lupus-ko4l.vercel.app/'
  axios.defaults.baseURL = 'http://localhost:4000/'

  return (
    <PayPalScriptProvider options={{ "client-id": "AdTQyETDbk_S0lEXEFVbqxR_dShB5ShgjD-snFVPaMk4PVQ9A-3l3ZRXXam5EX3s8R92EgiZz8DEV8Jx", currency: "USD" }}>
      <BrowserRouter>
        <Context>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/choose-payment' element={<ChoosePayment />} />
            <Route path='/payment-cash' element={<PaymentCash />} />

            <Route path='/payment-card' element={<PaymentCard />} />

            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/product-catalog' element={<ProductsCatalog />} />
            <Route path='/categories/:category' element={<ProductsByCategory />} />

            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />

            <Route path='/admin/products' element={<Products />} />
            <Route path='/admin/add-product' element={<AddProduct />} />
            <Route path='/admin/edit-product/:id' element={<EditProduct />} />

            <Route path='/admin/categories' element={<Categories />} />
            <Route path='/admin/add-category' element={<AddCategory />} />
            <Route path='/admin/edit-category/:id' element={<EditCategory />} />

            <Route path='/admin/reviews' element={<Reviews />} />

            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/order-details' element={<Orders />} />
            <Route path='/admin/order-details/:id' element={<OrderDetails />} />

          </Routes>
        </Context>
      </BrowserRouter>
    </PayPalScriptProvider>
  )
}

export default App
