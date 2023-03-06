
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
import Navbar from './NavbarHome';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EmailContext } from "../../App";
import { AdDContext } from "../../App";

export const Home = () => {


  const { Email } = useContext(EmailContext)
  const { AdD, setAdD } = useContext(AdDContext);
  console.log(Email);
  const navigate = useNavigate();

  localStorage.setItem("newemail", Email)
  console.log("LCOAL  :", localStorage.getItem("email"))
  console.log("THIS IS LOCAL : ", localStorage.getItem("email"))
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [Search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_AD`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      console.log(response.data);
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setListOfAds(temp);
      console.log("After parse : ", temp)
    });
  }, []);
  const moreinfo = () => {
    navigate('/Addetail')
  }
  function view(id) {
    console.log(id)
    setAdD(id)
    navigate("/AdDetail")

  }
  const searching = (e) => {
    var S_AD = e.target.value;
    setSearch(e.target.value)
    console.log("THIS is search  : ", e.target.value)
    if (S_AD.length != 0) {
      axios.get(`http://localhost:3006/Search_Ad/${S_AD}`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })
    }
    else {
      axios.get(`http://localhost:3006/Get_AD`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })
    }
  }

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
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (

    <div style={{ backgroundColor: "rgba(0, 95, 96, 0.8)" }}>
      <Navbar />
      <main>
      <input
      style={{"margin-top": "40px","width":"50px","marginLeft":"280px"}}
        autoComplete="off"
        placeholder='Search'
        type="text"
        className="customform w-50"
        list="item-list"
        onChange={searching}
      ></input>
        <FormControl sx={{ m: 1, minWidth: 180,marginLeft:60}} size="small">
          <InputLabel id="demo-select-small">Filters</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"

            value={Filter}
            label="Filters"
            onChange={Selectfilter}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"High TO Low"}>High TO Low</MenuItem>
            <MenuItem value={"Low To High"}>Low To High</MenuItem>
            <MenuItem value={"Latest"}>Latest</MenuItem>
            <MenuItem value={"Oldest"}>Oldtest</MenuItem>
          </Select>
        </FormControl>



        <Container sx={{ py: 8 }}>

          <Grid container spacing={4}>
            {listOfAds.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card
                  style={{ backgroundColor: "#F78104", height: "400px", borderRadius: "20px" }}
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
                    height={200}
                    image={card.Images[0]}
                    alt="random"
                    sx={{ padding: "1em 1em 0 1em" }}
                    onClick={() => { view(card.Ad_id) }}
                  />
                  <CardContent sx={{ flexGrow: 1 }} onClick={() => { view(card.Ad_id) }} >
                    <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                      {card.title}
                    </Typography>

                    <Typography variant="p">
                      {card.Description}
                    </Typography>
                    <br></br>
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

                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} alignItems={"center"}>
            <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
          </Stack>
        </Container>
      </main>




    </div>
  );



}



