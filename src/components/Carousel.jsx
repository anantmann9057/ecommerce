import Carousel from "react-bootstrap/Carousel";
import { useEffect,useState } from "react";
import axios from "axios";
//'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
export default function HoneCarousel() {

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
    <Carousel className="container-fluid p-0">
      <Carousel.Item>
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          style={{
            height: "60vh",
            width: "100%",
            objectFit:"cover"

          }}
        ></img>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        style={{
            height: "60vh",
            width: "100%",
            objectFit:"cover"
          }}></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        style={{
            height: "60vh",
            width: "100%",
            objectFit:"cover"

          }}></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
