import { Grid, Container, Typography, Button, CardActions, Hidden } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import NavbarD from "./NavbarD";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//import { global } from "../App";
import { AdDContext,EmailContext } from "../../App";
import "@fontsource/montserrat";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const ProductDetail = () => {

  const {Email,setEMAIL} = useContext(EmailContext)
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [product, setProduct] = useState([]);
  const [Ad, setAd] = useState([])
  const { AdD } = useContext(AdDContext);

  const navigate = useNavigate();
  const [report, setReport] = useState(1);
  const [Price, setPrice] = useState();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {


    axios.get(`http://localhost:3006/Get_Up_Product/${AdD}`).then((response) => {
      var temp = response.data;
      
      temp.forEach(element => {
        element.Images = JSON.parse(element.Images)

      });
      setAd(temp);
      setImages(temp[0].Images)
      setMainImage(temp[0].Images[0])
      setProduct(temp[0])
    });
  }, []);
  
  const handleAddToCart = () => {
    const cartItem = {
    id: product.Id,
    name: product.Name,
    price: product.Price,
    image: mainImage,
    };
    setCartItems([...cartItems, cartItem]);
    navigate('/addtocart', { state: { product: product } });
    };
  

  function imageSet(ind) {
    console.log(ind);
    console.log(images);
    setMainImage(images[ind]);
    console.log(mainImage);
  }

  
  console.log(images);
  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
      <NavbarD />
      <main>
        <Container sx={{ py: 3 }} >
          <Grid container spacing={1} marginTop={5} style={{ backgroundColor: "#FFFFFF", height: "550px", borderRadius: "20px", color: "rgba(0, 95, 96, 2)", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}>
            <Grid item xs={12} sm={7}>
              <Grid container padding={1}>
                <Grid item xs={12} height={350} width="inherit" borderRadius={3}>
                  <img src={mainImage} style={{ borderRadius: 'inherit', height: "inherit", width: 'inherit' }}></img>
                </Grid>
                {images.map((image, ind) => (
                  <Grid item xs={4} borderRadius={3} padding={'1rem'}>
                    <img
                      src={image}
                      width={200}
                      height={100}
                      onClick={() => {
                        imageSet(ind);
                      }}
                      style={{ borderRadius: 'inherit', height: 120, width: 170 }}
                    ></img>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Grid container height={'initial'} style={{ marginLeft: "10px" }}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h4" style={{ fontweight: "bold" }} component="div">
                    {product.Name}
                  </Typography>
        
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom variant="body1" component="div" style={{ fontSize: "20px", color: "rgba(0, 95, 96, 2)" }}>
                    {product.Description}
                  </Typography></Grid>
                  <Typography gutterBottom variant="h5" style={{ fontweight: "bold" }} component="div">
                  {product.Price}
                </Typography>
                <CardActions sx={{ marginTop: "20px" }}>
                  <Button variant="contained" sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF" }}  onClick={handleAddToCart}>Add To Cart</Button>
                  <Button variant="contained" sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF" }}  href="/storehome">Go Back</Button>
                </CardActions>
               
              </Grid>
            </Grid>
          </Grid>

        </Container>

      </main>


    </div>

  );
};


export default ProductDetail;
