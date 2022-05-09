import React from 'react';
import {Link} from "react-router-dom";

const Success = () => {

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Gracias por tu compra!
      </h1>
      <div className="font-medium">
        <span>Tu pedido lelgara en 3 días</span>
      </div>
      <div className="max-w-sm mx-auto space-y-4 px-2 mt-4">
        <Link
          to="/"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

export default Success;
