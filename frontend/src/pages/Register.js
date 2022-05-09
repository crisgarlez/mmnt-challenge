import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [sucess, setSucess] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    const customer = {
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      user: {
        email: data.email,
        password: data.password,
      }
    }

    axios.post('http://localhost/api/v1/customers', customer)
      .then(response => {
        setSucess('Usuario creado correctamente');
      }).catch((error) => {
      setError('El email ya esta registrado');
    });
  }

  return(
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm">

          <div className='w-full mb-1'>
            <label
              htmlFor="name"
              className='block text-md font-medium text-gray-700'
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombres"
              name="name"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("name", {
                required: "Campo obligatorio!",
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres!'
                },
                maxLength: {
                  value: 80,
                  message: 'Máximo 80 caracteres!'
                },
                pattern: {
                  value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
                  message: 'El campo debe contener solo letras',
                },
              })}
            />
            {errors.name && <span className='text-red-500'>{ errors.name.message }</span>}
          </div>

          <div className='w-full mb-1'>
            <label
              htmlFor="lastName"
              className='block text-md font-medium text-gray-700'
            >
              Apellidos
            </label>
            <input
              type="text"
              placeholder="Apellidos" name="lastName"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("lastName", {
                required: "Campo obligatorio!",
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres!'
                },
                maxLength: {
                  value: 80,
                  message: 'Máximo 80 caracteres!'
                },
                pattern: {
                  value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
                  message: 'El campo debe contener solo letras',
                },
              })}
            />
            {errors.lastName && <span className='text-red-500'>{ errors.lastName.message }</span>}
          </div>

          <div className='w-full mb-1'>
            <label
              htmlFor="phone"
              className='block text-md font-medium text-gray-700'
            >
              Teléfono
            </label>
            <input
              type="text"
              placeholder="Teléfono"
              name="phone"
              id="phone"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("phone", {
                required: "Campo obligatorio!",
                minLength: {
                  value: 10,
                  message: 'Mínimo 10 caracteres!'
                },
                maxLength: {
                  value: 10,
                  message: 'Máximo 10 caracteres!'
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'El campo debe contener solo números',
                },
              })}
            />
            {errors.phone && <span className='text-red-500'>{ errors.phone.message }</span>}
          </div>

          <div className='w-full mb-1'>
            <label
              htmlFor="email"
              className='block text-md font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Correo" name="email"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("email", {
                required: "Campo obligatorio!",
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres!'
                },
                maxLength: {
                  value: 80,
                  message: 'Máximo 80 caracteres!'
                },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'El campo debe contener un correo válido',
                },
              })}
            />
            {errors.email && <span className='text-red-500'>{ errors.email.message }</span>}
          </div>

          <div className='w-full mb-1'>
            <label
              htmlFor="password"
              className='block text-md font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("password", {
                required: "Campo obligatorio!",
                minLength: {
                  value: 4,
                  message: 'Mínimo 4 caracteres!'
                },
                maxLength: {
                  value: 80,
                  message: 'Máximo 80 caracteres!'
                },
              })}
            />
            {errors.password && <span className='text-red-500'>{ errors.password.message }</span>}
          </div>

          {error && <span className='text-red-500'>{ error }</span>}
          {sucess && <span className='text-green-500'>{ sucess }</span>}

          <div className='mt-9'>
            { !sucess && (<button
              type="submit"
              className='className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"'
            >
              Register
            </button>)}
            { sucess && (<button
              type="button"
              onClick={() => history('/')}
              className='className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"'
            >
              Inicia sessión
            </button>)}
          </div>
        </div>
      </form>
    </>
  )
}

export default Register;
