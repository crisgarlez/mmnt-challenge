import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import { FaTrash } from "react-icons/fa";


const Checkout = () => {

  const { cart, removeFromCart } = useContext(AppContext);

  const handleRemove = product => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + (currentValue.price*currentValue.quantity);
    return cart.reduce(reducer, 0);
  }

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Cart
      </h1>

      <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
        <table className="mx-auto">
          <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Price</th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-palette-lighter">
          {cart.map(item => (
            <tr key={item.id} className="text-sm sm:text-base text-gray-600 text-center">
              <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                <img
                  src={`${item.image}?sig=${item.id}`}
                  alt={item.name}
                  height={64}
                  width={64}
                  className={`hidden sm:inline-flex`}
                />
                <div className="pt-1 hover:text-palette-dark">
                  {item.name}
                </div>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                {item.quantity}
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                ${item.price}
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <button type="button" onClick={handleRemove(item)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {
            cart.length > 0 && (
              <tr className="text-center">
                <td></td>
                <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">Precio Total: </td>
                <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                  {`$ ${handleSumTotal()}`}
                </td>
                <td></td>
              </tr>)
          }
          </tbody>
        </table>
      </div>

      <div className="max-w-sm mx-auto space-y-4 px-2">
        {cart.length > 0 && (
          <Link
            to="/payment"
            className="bg-green-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-green-700 rounded-sm"
          >
            Pagar
          </Link>
        )}
        <Link
          to="/"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          Regresar
        </Link>
      </div>


    </div>
  );
}

export default Checkout;
