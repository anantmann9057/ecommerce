import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
export default function ItemDetailsPage() {
  const [data, setData] = useState();
  const { state } = useLocation();
  const { id } = state; // Read
  console.log(id);
  useEffect(() => {
    
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <div className="">
        <p>{data.title}</p>
    </div>
  );
}
