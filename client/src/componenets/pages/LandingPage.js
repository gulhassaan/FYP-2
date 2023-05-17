


import InputLabel from '@mui/material/InputLabel';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Fade from 'react-reveal/Fade';
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
import Navbar from './NavbarLanding';
import landingpageBanner from '../images/landingpage_banner.png';
import landingvideo from '../images/landing1.mp4';

import star from "../images/icons8-star-48.png"
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/montserrat";
import { TextAlignCenter } from 'phosphor-react';
import { Zoom } from 'react-reveal';

export const LandingPage = () => {
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [img, setimg] = useState([]);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_AD`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setListOfAds(temp);
      console.log("After parse : ", temp)
    });
  }, []);
  const navigate = useNavigate();
  const moreinfo = () => {
    navigate('/login')
  }


 
  useEffect(() => {
    if (localStorage.getItem('email_token')) {
      navigate('/home')
    }
  }, [])
  //<div className='Landingpage-banner'>
  //<a href='signup'><img className="Landingpage-banner-Image" src={landingpageBanner} width="100%"></img></a>

  //</div> 
  return (

    <div>
      <Navbar />

      <main>

        <div className='Landingpage-banner'>



          <video src={landingvideo} autoPlay loop muted />
          <div class="overlaybg"></div>
          <div className='welcomelanding'>
            <h2>Welcome</h2>
            <h4>To</h4>
            <h1>GAMINGSTAN</h1>
            <a href="/Login">Get Started</a>

          </div>
        </div>

        <div className='ContentLanding'>
          <Fade top distance="10%" duration={1500}>
            <h2 className='txt-align' style={{ color: "#ffffff", fontWeight: "bold" }}>Fresh Recommendations</h2>
          </Fade>
          <Fade top distance="20%" duration={1500}>
          <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {listOfAds
                .filter((card) => {
                  return search.toLowerCase() === ""
                    ? card
                    : card.title.toLowerCase().includes(search) ||
                      card.adCategory.toLowerCase().includes(search);
                })
                .map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={3}>
                    <Card
                      style={{
                        border: card.Days>0 ? "2px solid gold" : "none", 
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        height: "330px",
                        borderRadius: "20px",
                        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.55)",
                        position: "relative", 
                      }}
                      raised
                      sx={{
                        maxWidth: 280,
                        margin: "0 auto",
                        padding: "0.1em",
                        maxHeight: 450,
                      }}
                    >
                    {card.Days>0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          backgroundColor: "yellow",
                          color: "black",
                          padding: "5px",
                          borderRadius: "3px",
                          fontWeight: "bold",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  
                      <CardMedia
                        component="img"
                        height={180}
                        image={card.Images[0]}
                        alt="random"
                        style={{
                          padding: "0.5em 0.5em 0 0.5em",
                          borderRadius: "20px",
                        }}
                 
                      />
                      <CardContent
                        sx={{ flexGrow: 1 }}
              
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h6"
                          sx={{ fontWeight: "bold" }}
                          style={{ color: "#ffffff", marginBottom: "5px" }}
                        >
                          {card.title}
                        </Typography>
        
                        <Typography
                          variant="p"
                          style={{ topmargin: "3px", color: "#ffffff" }}
                        >
                          {card.Location}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ color: "#ffffff" }}>
                          {card.date}
                        </Typography>
                        <br></br>
                        <Typography
                          variant="p"
                          sx={{ fontWeight: "bold" }}
                          style={{ color: "#ffffff", marginBottom: "5px" }}
                        >
                          Rs.{card.Cost}/-
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
        
            <Stack spacing={2} alignItems={"center"}>
              <Pagination
                count={10}
                sx={{ marginTop: 7 }}
                variant="outlined"
                color="primary"
                onChange={(e, v) => setpage(v - 1)}
              />
            </Stack>
          </Container>
        </Fade>
        </div>
      </main>



    </div>
  );



}



