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

const App = () => {


  axios.defaults.baseURL = 'https://wolf-lupus-o4oy.vercel.app/'
  // axios.defaults.baseURL = 'http://localhost:4000/'

  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
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
        </Routes>
      </Context>
    </BrowserRouter>
  )
}

export default App
