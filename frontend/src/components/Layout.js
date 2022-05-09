import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        {children}
      </div>
    </div>
  );
}

export default Layout;
