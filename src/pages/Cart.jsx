import { useEffect } from "react";
import  {useState} from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import CartItems from "../components/CartItems";
import { ToastContainer, toast } from 'react-toastify';

export default function Authors(){
    const [data, setData] = useState([]);
    const [sum,setSum] =useState(0);
    useEffect(() => {
        axios
          .get('http://localhost:3000/cartItems')
          .then(function (response) {
            let total = 0;
            response.data.forEach(x => {
              total += x.price;

          });
            setSum(total);
            setData(response.data);
          })
          .catch(function (error) {
            console.log(error);
            toast(`${error}`);
          })
          .finally(function () {});
      }, []);
    



    return (
        <div className="container-fluid w-100">
          <Container>
          <h1>My Cart - ${sum.toFixed(2)}</h1>
          </Container>
          <CartItems products={data}></CartItems>
        </div>
      );
}