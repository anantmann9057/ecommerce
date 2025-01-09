import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

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
    <div className="container-fluid mh-100" style={{
      height:"100vh"
    }}>
      <div className="row d-flex justify-content-between " style={{
        height:"100vh"
      }}>
        <div className="col-4 align-self-center">
          <img src={data.thumbnail} style={{
            objectFit:"fill"
          }}></img>
        </div>
        <div className="col-4 align-self-center">
          <h1>{data.title}</h1>
          <h6>{data.description}</h6>
          <div className="row justify-content-around ">
            <div className="col-4">
              <h3>${data.price}</h3>
            </div>
            <div className="col-4">
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Rating name="read-only" value={data.rating} readOnly />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
