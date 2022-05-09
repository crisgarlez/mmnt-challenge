import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import initialState from '../initialState';

const AppContext = React.createContext();

function AppProvider(props) {

  const {
    item,
    saveItem,
  } = useLocalStorage('MMNT_V1',initialState );

  const isAuthenticated = item.user.isAuthenticated;

  const user = item.user.user;

  const token = item.user.token;

  const cart = item.cart;

  const addToCart = (payload) => {

    const existingProduct = item.cart.filter((product) => {
      if (product.id === payload.id) {
        product.quantity += payload.quantity;
        return product;
      }
    });

    console.log('existingProduct',existingProduct);

    if (existingProduct[0]) {
      const productToEdit = item.cart.findIndex(product => product.id === payload.id);
      const newCart = item.cart;

      console.log('existingProduct[0]',existingProduct[0]);

      newCart[productToEdit] = existingProduct[0];

      console.log('newCart',newCart);

      saveItem({
        ...item,
        cart: newCart,
      });
    }else{
      console.log('payload',payload);
      saveItem({
        ...item,
        cart: [...item.cart, payload]
      });
    }

  };

  const clearCart = () => {
    saveItem({
      ...item,
      cart: []
    });
  };

  const removeFromCart = (payload) => {
    saveItem({
      ...item,
      cart: item.cart.filter(items => items.id !== payload.id),
    });
  };

  const login = payload => {
    saveItem({
      ...item,
      user: {
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
      },
    });
  }

  const logout = () => {
    saveItem({
      ...item,
      user: {
        isAuthenticated: false,
        user: {},
        token: null,
      },
    });
  }

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      token,
      cart,
      addToCart,
      clearCart,
      removeFromCart,
      login,
      logout,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };

