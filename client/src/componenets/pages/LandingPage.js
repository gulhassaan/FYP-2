

// // function Home() {


// //   return (
// //     <div>
// //       {listOfPosts.map((value, key) => {
// //         return (
// //           <div className="post">
// //             <div className="title"> {value.title} </div>
// //             <div className="body">{value.postText}</div>
// //             <div className="footer">{value.username}</div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }
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
import gif from '../images/intro.gif';
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

  // const searching = (e) => {
  //   var S_AD = e.target.value;
  //   setSearch(e.target.value)
  //   console.log("THIS is search  : ", e.target.value)
  //   if (S_AD.length != 0) {
  //     axios.get(`http://localhost:3006/Search_Ad/${S_AD}`).then((response) => {
  //       var data = response.data;
  //       data.forEach(element => {

  //         element.Images = JSON.parse(element.Images)

  //       });
  //       setListOfAds(data)
  //     })
  //   }
  //   else {
  //     axios.get(`http://localhost:3006/Get_AD`).then((response) => {
  //       var data = response.data;
  //       data.forEach(element => {

  //         element.Images = JSON.parse(element.Images)

  //       });
  //       setListOfAds(data)
  //     })
  //   }
  // }

  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value)
    if (filter == "High TO Low") {

      console.log(Filter)
      axios.get(`http://localhost:3006/filterHtoL`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })

    } else if (filter == "Low To High") {

      axios.get(`http://localhost:3006/filterLtoH`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })


    }
    else if (filter == "Latest") {
      axios.get(`http://localhost:3006/filterLatest`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })
    }
    else if (filter == "Oldest") {
      axios.get(`http://localhost:3006/filterOldest`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })
    }

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
        <div class="overlaybg"></div>
          <video src={landingvideo} autoPlay loop muted />
        </div>
        <div className='ContentLanding'>
          <Fade top distance="10%" duration={1500}>
            <h2 className='txt-align' style={{ color: "rgba(0, 95, 96, 0.8", fontWeight: "bolder" }}>Fresh Recommendations</h2>
          </Fade>
          <Fade top distance="20%" duration={1500}>
            <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", paddingTop: "50PX" }}>
              <input
                style={{ width: '50%', marginRight: '0.5rem', backgroundColor: 'rgba(255, 255, 255)', color: "rgba(0, 95, 96, 0.8)" }}
                autoComplete='off'
                placeholder='Search'
                type='text'
                className='customform w-50'
                list='item-list'
                onChange={(e) => setSearch(e.target.value)}
              />

              <FormControl style={{ backgroundColor: "rgba(255, 255, 255)", minWidth: 150, borderRadius: "30px" }} size='small'>
                <InputLabel id='demo-select-small' style={{ color: "rgba(0, 95, 96, 0.8)" }}>Sort by</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  value={Filter}
                  label='Filters'
                  onChange={Selectfilter}
                  style={{ borderRadius: "20px", height: "45px", color: "rgba(0, 95, 96, 0.8)" }}
                  autoComplete='off'
                >
                  <MenuItem value='' style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'High TO Low'} style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}>High to Low</MenuItem>
                  <MenuItem value={'Low To High'} style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}>Low to High</MenuItem>
                  <MenuItem value={'Latest'} style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}>Latest</MenuItem>
                  <MenuItem value={'Oldest'} style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Fade>
          <Fade top distance="10%" duration={1500}>
            <Container sx={{ py: 8 }}>

              <Grid container spacing={4}>
                {listOfAds.filter((card) => {
                  return search.toLowerCase() === '' ? card : (card.title.toLowerCase().includes(search) || card.adCategory.toLowerCase().includes(search));
                }).map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={3}>
                    <Card
                      style={{ backgroundColor: "#FFFFFF", height: "330px", borderRadius: "20px" }}
                      sx={{
                        maxWidth: 280,
                        margin: "0 auto",
                        padding: "0.1em",
                        maxHeight: 450
                      }}
                    >
                      <CardMedia
                        component="img"

                        height={200}
                        image={card.Images[0]}
                        alt="random"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", borderRadius: "20px" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}  >
                        <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                          {card.title}
                        </Typography>
                        <Typography variant="p" style={{ topmargin: "5px", color: "rgba(0, 95, 96, 0.8)" }}>
                          {card.Location}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                          {card.date}
                        </Typography>
                        <br></br>
                        <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                          Rs.{card.Cost}/-
                        </Typography>
                      </CardContent>
                      <Box alignItems={"center"} >
                        <CardActions sx={{ marginLeft: 8 }}>
                          <Button class="forgot-btn" onClick={moreinfo}>More Info</Button>

                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Stack spacing={2} alignItems={"center"}>
                <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
              </Stack>
            </Container>
          </Fade>
        </div>
      </main>



    </div>
  );



}



