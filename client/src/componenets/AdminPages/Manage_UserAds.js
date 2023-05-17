
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



  const navigate = useNavigate()
  
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [check, setcheck] = useState();
  const [img, setimg] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_MYAD`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      console.log(response.data);
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setListOfAds(temp);
      console.log("After parse : ", temp)
      setcheck(1);
    });
  }, []);
  



  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value)
    if (filter == "All ADs") {

      console.log(Filter)
      axios.get(`http://localhost:3006/Get_MYAD`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)
        });
        setListOfAds(data)
      })
      setcheck(1)
    } else if (filter == "Reported ADs") {

      axios.get(`http://localhost:3006/Get_Reported_ADs`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
      })
      setcheck(2)

    } else if (filter == "Deleted ADs") {

      axios.get(`http://localhost:3006/Get_Deleted_ADs`).then((response) => {
        var data = response.data;
        data.forEach(element => {

          element.Images = JSON.parse(element.Images)

        });
        setListOfAds(data)
        setcheck(0);
      })


    }


  }

  const Del_Ads = (id,email) => {

    axios.put(`http://localhost:3006/del_MyAD/${id}`).then((res) => {
      console.log(res.data);
      setListOfAds(
        listOfAds.filter((val) => {
          return val.Ad_id != id
        }))
    })
    axios.put(`http://localhost:3006/wrongReport/${email}`).then((res) => {
      console.log(res.data);
    })
  }

  const UN_Report = (id,email) => {
console.log(email);
    axios.put(`http://localhost:3006/UnReport/${id}`).then((res) => {
      console.log(res.data);
      setListOfAds(
        listOfAds.filter((val) => {
          return val.Ad_id != id
        }))
    })
    axios.put(`http://localhost:3006/rightReport/${email}`).then((res) => {
      console.log(res.data);
    })
  }
  const activeAd = (id) => {
    axios.put(`http://localhost:3006/activeAd/${id}`).then((res) => {
      console.log(res.data);
      setListOfAds(
        listOfAds.filter((val) => {
          return val.Ad_id != id
        }))
    })

  }
  useEffect(() => {
    if (!localStorage.getItem('Adminemail')) {
      navigate('/Adminlogin')
    }
  }, [])
  return (

    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <Navbar />
      <main>
      <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"90PX" }}>
      <input
        style={{ width: '50%', marginRight: '0.5rem', backgroundColor: '#FFFFFF',color:"rgba(0, 95, 96, 0.8)", borderRadius:"30px", border:"2px solid #008083" }}
        autoComplete='off'
        placeholder='Search Ad'
        type='text'
        className='madmin w-50'
        
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
          style={{borderRadius:"20px",height:"45px",color:"#000000"}}
  
        >
           <MenuItem value=''  style={{borderRadius:"20px",color:"#000000)"}}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"All ADs"}  style={{borderRadius:"20px",color:"#000000"}}>All ADs</MenuItem>
          <MenuItem  value={"Reported ADs"}  style={{borderRadius:"20px",color:"#000000"}}>Reported ADs</MenuItem>
          <MenuItem  value={"Deleted ADs"}  style={{borderRadius:"20px",color:"#000000"}}>Deleted ADs</MenuItem>
         </Select>
      </FormControl>
    </div>
{listOfAds!=""?

    <Container sx={{ py: 8 }}>
  <Grid container spacing={4}>
    {listOfAds
      .filter((card) => {
        return (
          search.toLowerCase() === "" ||
          card.title.toLowerCase().includes(search) ||
          card.adCategory.toLowerCase().includes(search)
        );
      })
      .map((card) => (
        <Grid item key={card} xs={12} sm={6} md={check === 2 ? 6 : 3}>
          {check === 2 ? 
            <div>
              <Card
                style={{
                  backgroundColor: "#FFFFFF",
                  height: "500px",
                  borderRadius: "20px",
                  width: "420px",
                }}
                raised
                sx={{
                  maxWidth: 500,
                  margin: "0 auto",
                  padding: "0.1em",
                  maxHeight: 550,
                }}
              >
                <CardMedia
                  component="img"
                  height={200}
                  image={card.Images[0]}
                  alt="random"
                  sx={{ padding: "1em 1em 0 1em" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h6"
                    sx={{ fontWeight: "bold", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
                    {card.Description}
                  </Typography>
                  <br></br>
                  <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
                    {card.Location}
                  </Typography>
                  <br></br>
                  <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
                  Reported By : {card.ReportedBy}
                  </Typography>
                  <br></br>
                <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
                Reason : {card.Reason}
                </Typography>
                <br></br>
                  {/* Add more card content as needed */}
                  <Button
                  class="pkg-btn" style={{ 'margin-left': '5px', color: 'white' }}
                    onClick={() => {
                      Del_Ads(card.Ad_id, card.ReportedBy);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                  class="pkg-btn" style={{ 'margin-left': '05px', color: 'white' }}
                    onClick={() => {
                      UN_Report(card.Ad_id, card.ReportedBy);
                    }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </div>
           : 
            <Card
              style={{
                backgroundColor: "#FFFFFF",
                height: "430px",
                borderRadius: "20px",
              }}
              raised
              sx={{
                maxWidth: 300,
                margin: "0 auto",
                padding: "0.1em",
                maxHeight: 450,
              }}
            >
              <CardMedia
                component="img"
                height={200}
                image={card.Images[0]}
                alt="random"
                sx={{ padding: "1em 1em 0 1em" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
              <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{ fontWeight: "bold", color: "rgba(0, 95, 96, 0.8)" }}
            >
              {card.title}
            </Typography>
            <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
              {card.Description}
            </Typography>
            <br></br>
            <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
            Rs.{card.Cost}
          </Typography>
            <br></br>
            <Typography variant="p" color="rgba(0, 95, 96, 0.8)">
              {card.Location}
            </Typography>
               

               
                  </CardContent>
                  {
                  check == 1 &&
                  <Button class="pkg-btn" style={{ 'margin-left': '60px', color: 'white' }} onClick={()=>{Del_Ads(card.Ad_id)}}>Delete AD</Button>
                  }
                  
                  {
                  check ==0 && <Button class="pkg-btn" style={{ 'margin-left': '50px', color: 'white' }} onClick={()=>{activeAd(card.Ad_id)}}>Activate Ad</Button>
                  }
               
                 </Card>
                }
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} alignItems={"center"}>
            <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
          </Stack>
        </Container>
          :<div>
          <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340 }}>No Ads</h2>
          
        </div>    }
      </main>




    </div>
  );



}

export default Manage_UserAds

