import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "@mui/material/Rating";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';



export default function HomeImages(props) {

    const [item,setItem]=useState({});
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <div className="container-fluid border-rounded">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.products.map((image, index) => (
          <Grid key={index} size={{ xs: 4, sm: 4, md: 4 }} className="rounded">
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  minWidth: 300,
                  width: "100%",
                }}
              >
                {
                  <ImageButton
                    focusRipple
                    key={image.id}
                    style={{
                      width: image.width,
                    }}
                  >
                    <ImageSrc
                      style={{ backgroundImage: `url(${image.thumbnail})` }}
                    />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={(theme) => ({
                          position: "relative",
                          p: 4,
                          pt: 2,
                          pb: `calc(${theme.spacing(1)} + 6px)`,
                        })}
                      >
                        {image.title}
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image>
                  </ImageButton>
                }
              </Box>

              <h6>{image.title}</h6>
              <Container>
                <Row>
                  <Col>
                    <h6>${image.price}</h6>
                  </Col>
                  <Col>
                    <Box sx={{ "& > legend": { mt: 2 } }}>
                      <Rating name="read-only" value={image.rating} readOnly />
                    </Box>
                  </Col>
                </Row>
              </Container>
              <Button variant="dark" onClick={()=>{
                setItem({
                    id:image.id,
                    title:image.title,
                    description:image.description,
                    thumbnail:image.thumbnail,
                    category:image.category,
                    price:image.price,
                    rating:image.rating,
                    stock:image.stock

                });
                axios.post("http://localhost:3000/addToCart",null,{params: {
                    id:image.id,
                    title:image.title,
                    description:image.description,
                    thumbnail:image.thumbnail,
                    category:image.category,
                    price:image.price,
                    rating:image.rating,
                    stock:image.stock

                }})
                .then(function (response) {

                    if(response.data.status==1){
                        toast(`${response.data.message}`);
                    }else{
                        toast(`${response.data.message}`);

                    }
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
              
              }}>Add to cart</Button>

            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
