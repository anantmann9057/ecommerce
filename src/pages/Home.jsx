import axios from "axios";
import { useEffect, useState } from "react";
import HomeImages from "../components/HomeImages";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then(function (response) {
        console.log(response.data)

        setData(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);


  
  return (
    <div className="container-fluid w-100">
      <h1 className="container-fluid m-2">Products</h1>
      <HomeImages products={data}></HomeImages>
    </div>
  );
}
