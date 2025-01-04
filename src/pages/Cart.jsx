import { useEffect } from "react";
import  {useState} from "react";
import axios from "axios";
import CartItems from "../components/CartItems";
import {  toast } from 'react-toastify';

export default function Authors(){
    const [data, setData] = useState([]);
    const [sum,setSum] =useState(0);
    useEffect(() => {
        axios
          .get('http://localhost:3000/getCartItems')
          .then(function (response) {
            console.log(response.data.data);
            let total = 0;
            response.data.data.forEach(x => {
              total += x.price;

          });
            setSum(total);
            setData(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
            toast(`${error}`);
          })
          .finally(function () {});
      }, []);
    



    return (
        <div className="container-fluid w-100">
         <h1>My Cart - ${sum.toFixed(2)}</h1>
          <CartItems products={data}></CartItems>
        </div>
      );
}