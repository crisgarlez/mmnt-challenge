import React from 'react';
import {Link, useParams} from "react-router-dom";

import useGetOrderDetail from "../hooks/useGetOrderDetail";

const API = process.env.REACT_APP_API_URL + 'api/v1/orders/';

const Profile = () => {
  const { id } = useParams();
  const order = useGetOrderDetail(API + id);



  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Detalle de la Órden # {order.id}
      </h1>
      {order && order.items && (<div className="flex flex-col">
        {order.items.map(item => (
          <div className="w-full" key={item.id}>
            <div className="flex">
              <div className='w-1/4'>
                <h4>{item.name}</h4>
              </div>
              <div className='w-1/4'>
                <span>
                  $
                  {' '}
                  {item.price}
                </span>
              </div>
              <div className='w-1/4'>
                <p>x {item.OrderProduct.amount}</p>
              </div>
              <div className='w-1/4'>
                <span>
                  $
                  {' '}
                  {item.price * item.OrderProduct.amount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>)}
      <div className='mt-4 mb-4 font-bold'>
        Total ${order.total}
      </div>
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <Link
          to="/profile"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default Profile;
