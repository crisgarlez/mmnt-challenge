import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {

  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const {
    login,
  } = useContext(AppContext);


  const onSubmit = (data) => {

    const user = {
      'email': data.username,
      'password': data.password,
    }

    axios.post('http://localhost/api/v1/auth/login', user)
      .then(response => {
        login(response.data);
      }).catch((error) => {
        setError('Usuario o contraseña incorrectos');
      });
  }

  return(
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <p className='mt-2 text-center text-md text-gray-400'>
          Usuario administrador:
        </p>
        <p className='mt-2 text-center text-md text-gray-400'>
          <span className='font-bold'>email:</span> admin@admin.com,  <span className='font-bold'>password:</span> admin
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          o{' '}

            <Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/register">
              Crea una cuenta de cliente
            </Link>

        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              name='username'
              id="username"
              placeholder='Email'
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("username", {required: { value: true, message: "Campo obligatorio!" }, maxLength: 80})}
            />
            {errors.username && errors.username.type === "required" && <span className='text-red-500'>{ errors.username.message }</span>}
          </div>

          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              name='password'
              id="password"
              placeholder='Password'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              {...register("password", {required: { value: true, message: "Campo obligatorio!" }, maxLength: 80})}
            />
            {errors.password && errors.password.type === "required" && <span className='text-red-500'>{ errors.password.message }</span>}
          </div>

          {error && <span className='text-red-500'>{ error }</span>}

          <div className='mt-9'>
            <button
              type="submit"
              onClick={handleSubmit}
              className='className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"'
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login;
