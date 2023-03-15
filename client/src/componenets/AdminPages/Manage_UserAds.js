
import Navbar from './Navbar2';
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

const Manage_UserAds = () => {



 
  
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
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
    if (filter == "All ADs") {

      console.log(Filter)
      axios.get(`http://localhost:3006/Get_AD`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })

    } else if (filter == "Reported ADs") {

      axios.get(`http://localhost:3006/Get_Reported_ADs`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })


    }


  }

  const Del_Ads = (id) => {

    axios.put(`http://localhost:3006/del_MyAD/${id}`).then((res) => {
      console.log(res.data);
      setListOfAds(
        listOfAds.filter((val) => {
          return val.Ad_id != id
        }))
    })

  }
  return (

    <div style={{ backgroundColor: "rgba(0, 95, 96, 0.8)" }}>
    <Navbar />
      <main>
      <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"50PX" }}>
      <input
        style={{ width: '50%', marginRight: '0.5rem', backgroundColor: '#FFFFFF',color:"rgba(0, 95, 96, 0.8)" }}
        autoComplete='off'
        placeholder='Search'
        type='text'
        className='customform w-50'
        list='item-list'
        onChange={(e)=>{setSearch(e.target.value)}}
      />
    
      <FormControl style={{ minWidth: 150 ,borderRadius:"20px"}} size='small'>
        <InputLabel id='demo-select-small' style={{color:"rgba(0, 95, 96, 0.8)"}}>Filters</InputLabel>
        <Select
          labelId='demo-select-small'
          id='demo-select-small'
          value={Filter}
          label='Filters'
          onChange={Selectfilter}
          style={{borderRadius:"20px",height:"45px",color:"rgba(0, 95, 96, 0.8)"}}
  
        >
          <MenuItem value=''  style={{borderRadius:"20px",color:"rgba(0, 95, 96, 0.8)"}}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"All ADs"}  style={{borderRadius:"20px",color:"rgba(0, 95, 96, 0.8)"}}>All ADs</MenuItem>
          <MenuItem  value={"Reported ADs"}  style={{borderRadius:"20px",color:"rgba(0, 95, 96, 0.8)"}}>Reported ADs</MenuItem>
         </Select>
      </FormControl>
    </div>
        <Container sx={{ py: 8 }}>

          <Grid container spacing={4}>
            {listOfAds.filter((card)=>{
              return search.toLowerCase()===''?card:(card.title.toLowerCase().includes(search) ||card.adCategory.toLowerCase().includes(search)); 
            }).map((card) => (
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
                  />
                  <CardContent sx={{ flexGrow: 1 }}  >
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
                  </CardContent>
  
                  <Button class="pkg-btn" style={{ 'margin-left': '60px', color: 'orange' }} onClick={()=>{Del_Ads(card.Ad_id)}}>Delete</Button>
           
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

export default Manage_UserAds

