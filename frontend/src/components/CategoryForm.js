import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import {AppContext} from "../context/AppContext";

const CategoryForm = () => {

  const { token } = useContext(AppContext);

  const [newUser, setNewUser] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    const employData = {
      name: data.name,
      image: 'https://picsum.photos/200'
    }

    axios.post('http://localhost/api/v1/categories', employData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        handleReset();
        setNewUser(response.data);
      }).catch((error) => {
      console.log('error', error);
    });

  }

  const handleReset = () => {
    reset();
    setNewUser(null);
  }

  return (
    <div className='mt-8 flex w-full'>
      <div className='flex flex-col items-center w-1/2 sm:w-full px-4 py-5 bg-white space-y-6 sm:p-6 rounded-md'>
        <h1 className='text-lg font-medium leading-6 text-gray-900'>Nueva categoría</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
          <div className='w-full mb-1'>
            <label
              htmlFor="name"
              className='block text-md font-medium text-gray-700'
            >
              Nombres
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
          <div className='w-full mb-1 pt-4'>
            {!newUser && (
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
      <div className='flex flex-col w-1/2 items-center pt-8 ml-2'>
        {newUser && (
          <div className='bg-white rounded-md px-4 py-5 flex flex-col items-center'>
            <h2 className='text-lg font-bold leading-6 text-green-700 mb-2'>Nueva categoría agregada!</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
