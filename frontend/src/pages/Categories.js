import React from "react";
import useGetCategories from "../hooks/useGetCategories";
import {Link} from "react-router-dom";

const API = 'http://localhost/api/v1/categories';

const Categories = () => {
  const categories = useGetCategories(API);

  return (
    <div className='pb-12'>
      <h1 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4'>Listado de categorías</h1>

      <Link
        to="/categories/new"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Nueva categoría
      </Link>

      <div className='mt-4 flex w-full bg-white p-4 justify-center items-center  rounded-md'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className=' text-xs w-full text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-6 py-3'>ID</th>
              <th className='px-6 py-3'>Nombre</th>
              <th className='px-6 py-3'>Imagen</th>
              <th className='px-6 py-3'>Creado</th>
            </tr>
            </thead>
            <tbody>
            {categories.map(category => (
              <tr key={category.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4'>{category.id}</td>
                <td className='px-6 py-4'>{category.name}</td>
                <td className='px-6 py-4'>{category.image}</td>
                <td className='px-6 py-4'>{category.createdAt}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Categories;
