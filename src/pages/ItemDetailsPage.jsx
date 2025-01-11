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
    <div className="container-fluid w-100">
      <img 
        src={data.thumbnail}
        className="w-100  "
        style={{
          objectFit: "contain",
          height: "50vh",
        }}
      ></img>

      {data.images ? (
        data.images.map((images, index) => (
          <img
            key={index}
            src={images}
            className="container w-20 m-5 border border-primary rounded"
            style={{
              objectFit: "contain",

              height: "20vh",
              width: "15%",
              backgroundColor: "lavender",
            }}
          ></img>
        ))
      ) : (
        <br></br>
      )}
     <div>
     <h1>{data.title}  ${data.price} </h1> <h6> by {data.brand}</h6>
     <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Rating name="read-only" value={data.rating} readOnly />
                </Box>
     </div>
      <p>{data.description}</p>  
    </div>
  );
}
