import { useEffect, useState, useContext } from "react";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const useGetOrderDetail = (API) => {
  const [order, setOrder] = useState([]);

  const { token } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOrder(response.data);
    }
    fetchData();
  }, [])

  return order;
};

export default useGetOrderDetail;
