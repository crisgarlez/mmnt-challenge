import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {FaCartPlus} from "react-icons/fa";

const ProductItem = ({ product }) => {

  const {
    addToCart
  } = useContext(AppContext);

  const handleClick = item => {
    addToCart({
      ...item,
      quantity: 1
    });
  }

  return (
    <div className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
      <div className="border-b-2 border-palette-lighter bg-cover text-center">
        <img
          src={`${product.image}?sig=${product.id}`}
          alt={product.name}
          className="m-auto"
        />
      </div>
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          {product.name}
        </div>
        <div className="text-lg text-gray-600 p-4 font-primary font-light">
          {product.description}
        </div>
        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 left-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter
            rounded-tl-sm triangle"
        >
          ${product.price}
        </div>

        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter
            rounded-tl-sm triangle"
        >
          <button onClick={() => handleClick(product)}>
            <FaCartPlus/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
