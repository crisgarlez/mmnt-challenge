import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import {AppContext} from "../context/AppContext";
import useGetCategories from "../hooks/useGetCategories";

const API2 = process.env.REACT_APP_API_URL + 'api/v1/categories';

const ProductForm = () => {

  const categories = useGetCategories(API2);

  const { token } = useContext(AppContext);

  const [newProduct, setNewProduct] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    const productData = {
      name: data.name,
      image: 'https://picsum.photos/200',
      description: data.description,
      price: data.price,
      categoryId: data.category,
    }

    axios.post(process.env.REACT_APP_API_URL + 'api/v1/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        handleReset();
        setNewProduct(response.data);
      }).catch((error) => {
      console.log('error', error);
    });

  }

  const handleReset = () => {
    reset();
    setNewProduct(null);
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
          <div className='w-full mb-1'>
            <label
              htmlFor="description"
              className='block text-md font-medium text-gray-700'
            >
              Descripción
            </label>
            <input
              type="text"
              placeholder="Descripción"
              name="description"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("description", {
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
            {errors.description && <span className='text-red-500'>{ errors.description.message }</span>}
          </div>
          <div className='w-full mb-1'>
            <label
              htmlFor="price"
              className='block text-md font-medium text-gray-700'
            >
              Precio
            </label>
            <input
              type="number"
              placeholder="price"
              name="price"
              id="price"
              className="block border border-gray-300 bg-gray-100 w-full rounded-md px-3 py-1"
              {...register("price", {
                required: { value: true, message: "Campo obligatorio!" },
                minLength: {
                  value: 1,
                  message: 'Mínimo 1 caracter!'
                },
                maxLength: {
                  value: 2,
                  message: 'Máximo 2 caracteres!'
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'El campo debe contener solo números',
                },
              })}
            />
            {errors.price && <span className='text-red-500'>{ errors.price.message }</span>}
          </div>
          <div className='w-full mb-1'>
            <label
              htmlFor="category"
              className='block text-md font-medium text-gray-700'
            >
              Categoría
            </label>
            <select
              name="category"
              id="category"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
              {...register("category", {
                required: {
                  value: true,
                  message: "Campo obligatorio!"
                },
              })}
            >
              <option value="">Seleccione una Categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category && <span className='text-red-500'>{ errors.category.message }</span>}
          </div>
          <div className='w-full mb-1 pt-4'>
            {!newProduct && (
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
        {newProduct && (
          <div className='bg-white rounded-md px-4 py-5 flex flex-col items-center'>
            <h2 className='text-lg font-bold leading-6 text-green-700 mb-2'>Nuevo producto agregado!</h2>
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

export default ProductForm;
