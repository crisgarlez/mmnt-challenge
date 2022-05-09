import React from 'react';
import { useNavigate } from "react-router-dom";
import useGetOrders from '../hooks/useGetOrders';

const API = process.env.REACT_APP_API_URL + 'api/v1/profile/my-orders';

const Profile = () => {
  const history = useNavigate();
  const orders = useGetOrders(API);


  const handleClick = (order) => {
    history('/order-detail/' + order.id);
  }

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
       Listado de órdenes
      </h1>
      <div className="">
        {orders.map(order => (

          <div key={order.id} className='shadow rounded bg-gray-200 mt-4 p-4'>
            <h1>Órden # {order.id}</h1>
            <p>{Date(order.createdAt).toLocaleString('es-EC')}</p>
            <button className='bg-blue-500 text-gray-100 rounded px-4 py-2 mt-2 hover:bg-blue-700' onClick={() => handleClick(order)}>Ver detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
