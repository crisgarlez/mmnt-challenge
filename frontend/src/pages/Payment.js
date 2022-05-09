import React, {useContext} from 'react';
import {PayPalButton} from "react-paypal-button-v2";
import {AppContext} from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useGetCustomer from "../hooks/useGetCustomer";

const API = 'http://localhost/api/v1/customers/';

const Payment = () => {

  const { cart, clearCart } = useContext(AppContext);

  const customer = useGetCustomer(API);

  const history = useNavigate();

  const paypalOptions = {
    clientId: 'ATt3vhkYqDC8GsZyleZwfSrueOc2EgZjNIQ1lenCbE2Z1E07bwbwyM6wkyKeAnD1OF3WvRho_qvZKRTX',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  function postOrder(order) {
    axios.post('http://localhost/api/v1/orders', order)
      .then(response => {
        cart.map(item => {
          axios.post('http://localhost/api/v1/orders/add-item',{
            "orderId": response.data.id,
            "productId": item.id,
            "amount": item.quantity
          }).then(res => {
            console.log('res', res);
          }).catch(err => {
            console.log('err', err);
          });
        });

        clearCart();

        history('/success')

      }).catch((error) => {
        console.log('error', error);
      });
  }

  const handlePaymentSuccess = (details, data) => {
    console.log('data', data);
    console.log('details', details);

    postOrder({
      "customerId": customer.id,
    });


  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity);
    return cart.reduce(reducer, 0);
  }

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Resumen del pedido
      </h1>
      <div className="flex flex-col">
        {cart.map((item) => (
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
                <p>x {item.quantity}</p>
              </div>
              <div className='w-1/4'>
                <span>
                  $
                  {' '}
                  {item.price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 mb-4 font-bold'>
        Total ${handleSumTotal()}
      </div>
      <div className="Payment-button">
        <PayPalButton
          amount={handleSumTotal()}
          options={paypalOptions}
          style={buttonStyles}
          onSuccess={(details, data) => handlePaymentSuccess(details, data)}
        />
      </div>
    </div>
  );
}

export default Payment;
