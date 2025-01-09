import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Container from "react-bootstrap/Container";

import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export default function HomeImages(props) {
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: 300,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 300,
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
    backgroundSize: "contain",
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
    <div className="container-fluid ">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.products.map((image, index) => (
          <Grid
            key={index}
            size={{ xs: 4, sm: 4, md: 4 }}
            className="border border-rounded p-3"
          >
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
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
                    onClick={() => {
                      navigate(`/itemDetails/`, { state: { id: image.id } });
                    }}
                  >
                    <ImageSrc
                      style={{
                        backgroundImage: `url(${image.thumbnail})`,
                        objectFit: "contain",
                      }}
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
              <h4
                style={{
                  textDecoration: "underline",
                }}
                className="mt-2"
              >
                {image.brand}
              </h4>
              <h6>{image.title}</h6>
              <p>{image.description}</p>

              <Container className="d-flex justify-content-between p-0 m-0">
                <h6>${image.price}</h6>
                <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Rating name="read-only" value={image.rating} readOnly />
                </Box>
              </Container>
              <Button
                variant="dark"
                onClick={() => {
                  setItem({
                    id: image.id,
                    title: image.title,
                    description: image.description,
                    thumbnail: image.thumbnail,
                    category: image.category,
                    price: image.price,
                    rating: image.rating,
                    stock: image.stock,
                  });
                  axios
                    .post("http://localhost:3000/insertIntoCart", null, {
                      params: {
                        id: image.id,
                        title: image.title,
                        description: image.description,
                        thumbnail: image.thumbnail,
                        category: image.category,
                        price: image.price,
                        rating: image.rating,
                        stock: image.stock,
                      },
                    })
                    .then(function (response) {
                      if (response.data.status == 1) {
                        toast(`${response.data.message}`);
                      } else {
                        toast(`${response.data.message}`);
                      }
                      console.log(response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                Add to cart
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
