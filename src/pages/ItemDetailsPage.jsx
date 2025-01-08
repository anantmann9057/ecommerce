import { useState, useEffect } from "react";
import {  useLocation } from "react-router";
import axios from "axios";
export default function ItemDetailsPage() {
  const [data, setData] = useState({});
  const { state } = useLocation();
  const { id } = state;
  console.log(id); // Read
  useEffect(() => {
    
    axios
      .get(`https://dummyjson.com/products/${state.id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [state.id]);

  return (
    <div className="container-fluid">
      <img src={data.thumbnail} ></img>
        <p>{data.title}</p>
    </div>
  );
}
