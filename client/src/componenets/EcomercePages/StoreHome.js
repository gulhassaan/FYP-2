
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { color } from '@mui/system';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EmailContext } from "../../App";
import { AdDContext } from "../../App";
import "@fontsource/montserrat";
import NavbarStore from './Navbarstore';
import storebanner from '../images/gamingstanstore.png';

import NavbarS from './NavbarS';
import ProductDetail from './ProductDetail';
import './Ecommerce.css';
import banner1 from "./images/slider1.png";
import banner2 from "./images/slider2.png";
import banner3 from "./images/slider3.png";
const StoreHome = () => {


  const { Email } = useContext(EmailContext)
  const { AdD, setAdD } = useContext(AdDContext);

  const navigate = useNavigate();
  const [page,setpage] = useState(0);
  localStorage.setItem("newemail", Email)
  console.log("LCOAL  :", localStorage.getItem("email"))
  console.log("THIS IS LOCAL : ", localStorage.getItem("email"))
  const [listofProducts, setlistofProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_Products?limit=10&offset=${page*10}`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      console.log(response.data);
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setlistofProducts(temp);
      console.log("After parse : ", temp)
    });
  }, []);
  const moreinfo = () => {
    navigate('/Addetail')
  }
  function view(id) {
    console.log(id)
    setAdD(id)
    navigate("/productdetail")

  }



  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (

    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
      <main>


      <NavbarStore/>
    
    
      <NavbarS/>
      <h1 style={{color:"rgba(0, 95, 96, 0.8)",display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"10PX"}}>Ecommerce Store</h1>
    
    
    
    
    
      <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={banner1} class="d-block w-100" alt=""/>
    </div>
    <div class="carousel-item">
      <img src={banner2} class="d-block w-100" alt=""/>
    </div>
    <div class="carousel-item">
      <img src={banner3} class="d-block w-100" alt=""/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>













      <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"50PX" }}/>

     
      <h1 style={{color:"rgba(0, 95, 96, 0.8)",display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"30PX"}}>Fresh Recommendations</h1>
      <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"40PX" }}>

      <input
        style={{ width: '50%', marginRight: '0.5rem', backgroundColor: '#FFFFFF',color:"rgba(0, 95, 96, 0.8)" }}
        autoComplete='off'
        placeholder='Search'
        type='text'
        className='customform w-50'
        list='item-list'
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
        <Container sx={{ py: 8 }}>

          <Grid container spacing={4}>
            {listofProducts.filter((card)=>{
              return search.toLowerCase()===''?card:(card.Name.toLowerCase().includes(search)); 
            }).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card
                  style={{ backgroundColor: "#FFFFFF", height: "330px", borderRadius: "20px", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  raised
                  sx={{
                    maxWidth: 280,
                    margin: "0 auto",
                    padding: "0.1em",
                    maxHeight: 450
                  }}


                >
                  <CardMedia
                    component="img"
                    height={180}
                    image={card.Images[0]}
                    alt="random"
                    style={{ padding: "0.5em 0.5em 0 0.5em", borderRadius: "20px" }}
                    onClick={() => { view(card.ID) }}
                  />
                  <CardContent sx={{ flexGrow: 1 }} onClick={() => { view(card.ID) }} >
                    <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                      {card.Name}
                    </Typography>

                    <Typography variant="p" style={{ topmargin: "5px", color: "rgba(0, 95, 96, 0.8)" }}>
                      {card.Price}
                    </Typography>
                    <br></br>
                    <Typography variant="p" style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                      {card.Description}
                    </Typography>
                    <br></br>
                    
                  </CardContent>

                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} alignItems={"center"}>
            <Pagination count={2} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
          </Stack>
        </Container>
      </main>




    </div>
    
  );



}


export default StoreHome;
