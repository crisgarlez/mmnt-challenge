import React from "react";
import CategoryForm from "../components/CategoryForm";
import {Link} from "react-router-dom";


const NewCategories = () => {

  return (
    <div className='pb-12'>
      <h1 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4'>Nueva categoría</h1>

      <Link
        to="/categories"
        className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Regresar
      </Link>

      <div className='mt-4 flex w-full bg-white p-4 justify-center items-center  rounded-md'>
        <CategoryForm />
      </div>
    </div>
  );

}

export default NewCategories;
