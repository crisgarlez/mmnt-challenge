import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {AppContext} from "../context/AppContext";

const useGetCustomer = (API) => {
  const [customer, setCustomer] = useState([]);

  const { user } = useContext(AppContext);

  useEffect(() => {

    console.log('userId', user.id);
    async function fetchData() {
      const response = await axios(API + '' + user.id);
      setCustomer(response.data);
    }
    fetchData();
  }, [])

  return customer;
};

export default useGetCustomer;
