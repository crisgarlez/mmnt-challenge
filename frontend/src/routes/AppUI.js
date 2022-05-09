import React, {useContext} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import Profile from "../pages/Profile";
import OrderDetail from "../pages/OrderDetail";
import Login from "../containers/Login";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import NewCategories from "../pages/NewCategory";
import Products from "../pages/Products";
import NewProducts from "../pages/NewProduct";

function AppUI() {

  const {
    user,
    isAuthenticated
  } = useContext(AppContext);



  if(!isAuthenticated) {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    )
  }

  if(user.role === 'admin') {
    return (
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/categories' element={<Categories/>} />
                <Route path='/categories/new' element={<NewCategories/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/products/new' element={<NewProducts/>} />
                <Route path="*" element={<Navigate to ="/" />}/>
              </Routes>
            </Layout>
          </BrowserRouter>
    )
  }

  return (

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/success' element={<Success/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/order-detail/:id' element={<OrderDetail/>} />
            <Route component={<NotFound/>} />
          </Routes>
        </Layout>
      </BrowserRouter>

  );
}

export { AppUI };
