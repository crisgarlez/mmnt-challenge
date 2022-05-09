import { useEffect, useState, useContext } from "react";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const useGetCategories = (API) => {
  const [orders, setOrders] = useState([]);

  const { token } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOrders(response.data);
    }
    fetchData();
  }, [])

  return orders;
};

export default useGetCategories;
