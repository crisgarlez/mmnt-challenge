import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { user, cart, logout } = useContext(AppContext);

  return (
    <div className="bg-gray-800">
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <h1 className="text-gray-50 h-8 w-auto">
              <Link to="/">Momentu Challenge</Link>
            </h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="text-gray-50">
              {user && <div className="mr-3">{user.email}({user.role})</div>}
            </div>

            {user.role === 'customer' && (<div className="text-gray-50 mr-3">
              <Link to="/profile">mis órdenes</Link>
            </div>)}

            <div className="relative text-white">
              <Link to="/checkout">
                <FaShoppingCart/>
              </Link>
              {cart.length > 0 && (
                  <span
                    className="absolute left-3 bottom-2 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {cart.length}
                  </span>
              )}
            </div>

            <button
              type="button"
              onClick={logout}
              className='block px-4 py-2 text-sm text-gray-50'
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;
