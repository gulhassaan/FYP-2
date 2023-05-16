
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

const UserReq = () => {



  const navigate = useNavigate();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  const [check, setcheck] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3006/Get_UsersReq`).then((response) => {
      console.log("THis is Response Data : ", response.data)
       setcheck(1)
      setListOfUsers(response.data);
    });
  }, []);



 
  function view(id) {
    console.log(id);
    localStorage.setItem('EmailAuth',id);
    navigate("/authenticate");
  }

 

  return (
<div>

<div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
<Navbar/>
<h1 style={{ color: "rgba(0, 95, 96, 0.8)",marginLeft:350,marginTop:50}}>Users Requests For Authentication</h1>
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
    
    
    </div>
  {listOfUsers!=""?
        <main>
          <Container sx={{ py: 5, marginTop: 2 }}>
        
            <Grid container spacing={4}>
              {listOfUsers.filter((card)=>{
                return search.toLowerCase()===''?card:(card.Name.toLowerCase().includes(search) ||card.user.toLowerCase().includes(search)); 
              }).map((card) => (
                <Grid class="manageusers-card" item key={card} xs={12} sm={6} md={3}>
                  <Card
                    style={{ backgroundColor: "#FFFFFF", height: "260px", width: "340px", borderRadius: "20px" }}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center"

                    }}

                  >
                    <CardContent sx={{ flexGrow: 1 }}  onClick={() => {
                      view(card.user);
                    }}>
                      <Typography gutterBottom variant="h6" component="h6" style={{ color: "rgba(0, 95, 96, 0.8)" }} sx={{ fontWeight: 'bold' }}>
                       {card.Name}
                      </Typography>
                      <Typography variant="p" style={{ color: "rgba(0, 95, 96, 1)", fontSize: "18px" }}>
                      {card.user}
                      </Typography>
                      <br></br>
                      <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                     CNIC: {card.CNIC}
                    </Typography>
                    <br></br>
                    <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                    National Tax Number: {card.NTN}
                    </Typography>
                    </CardContent>
                
                  
                    <Box alignItems={"center"} >
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2} alignItems={"center"}>
              <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
            </Stack>
          </Container>
        </main>
        :<div>
          <h2 style={{marginTop:100,marginBottom:340,marginLeft:600}}>No User Requests</h2>
        </div>        }
      </main>
         
    </div>
    </div>

  );



}

export default UserReq

