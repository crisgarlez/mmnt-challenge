import React, {useContext} from 'react';
import {AppContext} from "../context/AppContext";

import ProductList from "../containers/ProductList";
import {Link} from "react-router-dom";

const Home = () => {

  const { user } = useContext(AppContext);

  if(user.role === 'admin') {
    return (
      <div className="container mx-auto mb-20 min-h-screen">
        <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
          Admin Home
        </h1>
        <div className='flex justify-around p-5'>
          <Link
            to="/products"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Administrar Productos
          </Link>
          <Link
            to="/categories"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Administrar Categorías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductList/>
    </>
  );
};

export default Home;
