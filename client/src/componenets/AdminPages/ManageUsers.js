
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

const ManageUsers = () => {

 


  const navigate = useNavigate()
  const [listOfUsers, setListOfUsers] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  const [check, setcheck] = useState();
const[uCheck,setucheck]=useState(0);
  useEffect(() => {
    axios.put("http://localhost:3006/SetReportUser").then((response) => {
      console.log(response.data);
    })
    axios.get(`http://localhost:3006/Get_Users`).then((response) => {
      console.log("THis is Response Data : ", response.data)
       setcheck(1)
      setListOfUsers(response.data);
    });
  }, []);


  // const searching = (e) => {
  //   var S_User = e.target.value;
  //   setSearch(e.target.value)

  //   if (S_User.length != 0) {
  //     axios.get(`http://localhost:3006/Search_Users/${S_User}`).then((response) => {
  //       var data = response.data;
  //       setListOfUsers(data)
  //     })
  //   }
  //   else {
  //     axios.get(`http://localhost:3006/Get_User`).then((response) => {
  //       var data = response.data;
  //       setListOfUsers(data)
  //     })
  //   }
  // }

  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value)
    if (filter == "All Users") {
      setcheck(1);
      console.log(Filter)
      axios.get(`http://localhost:3006/Get_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })

    } else if (filter === "Reported Users") {
      setcheck(1);
      axios.get(`http://localhost:3006/Get_Reported_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }
    else if (filter === "Blocked Users") {
      setcheck(0);
      axios.get(`http://localhost:3006/Get_Blocked_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }  else if (filter === "UsersthatReport") {
        axios.get("http://localhost:3006/GetUserThatReport").then((response) => {
        var data = response.data;
        console.log("HELO OO ",data)
        setListOfUsers(data)
      })
    }
  }

  const BlockUser = (email) => {
    axios.put(`http://localhost:3006/blockUser/${email}`).then((res) => {
      console.log(res.data);
      setListOfUsers(
        listOfUsers.filter((val) => {
          return val.email != email
        }))
    })
  }


  const UnblockUser = (email) => {
    axios.put(`http://localhost:3006/UnblockUser/${email}`).then((res) => {
      console.log(res.data);
      setListOfUsers(
        listOfUsers.filter((val) => {
          return val.email != email
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
        placeholder='Search User'
        type='text'
        className='madmin w-50'
        list='item-list'
        onChange={(e)=>{setSearch(e.target.value)}}
      />
    
      <FormControl style={{ minWidth: 150 ,borderRadius:"20px"}} size='small'>
      <InputLabel id='demo-select-small' style={{color:"#000000"}}>Filters</InputLabel>
        <Select
          labelId='demo-select-small'
          id='demo-select-small'
          value={Filter}
          label='Filters'
          onChange={Selectfilter}
          style={{borderRadius:"20px",height:"45px",color:"rgba(0, 95, 96, 0.8)"}}
  
        >
          <MenuItem value=''  style={{borderRadius:"20px",color:"#000000"}}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"All Users"}  style={{borderRadius:"20px",color:"#000000"}} onClick={()=>{setucheck(0)}}>All Users</MenuItem>
          <MenuItem value={"Reported Users"} style={{borderRadius:"20px",color:"#000000)"}} onClick={()=>{setucheck(0)}}>Reported Users</MenuItem>  
          <MenuItem value={"Blocked Users"}  style={{borderRadius:"20px",color:"#000000"}} onClick={()=>{setucheck(0)}}>Blocked Users</MenuItem>
          <MenuItem value={"UsersthatReport"}  style={{borderRadius:"20px",color:"#000000"}} onClick={()=>{setucheck(1)}}>Users Who Report Ads</MenuItem>
         </Select>
      </FormControl>
    </div>
        <main>
        {listOfUsers!=""?
        <Container sx={{ py: 5, marginTop: 2 }}>

            <Grid container spacing={4}>
              {listOfUsers.filter((card)=>{
                return search.toLowerCase()===''?card:(card.Name.toLowerCase().includes(search) ||card.email.toLowerCase().includes(search)); 
              }).map((card) => (
                <Grid class="manageusers-card" item key={card} xs={12} sm={6} md={3}>
                  <Card
                    style={{ backgroundColor: "#FFFFFF", height: "260px", width: "300px", borderRadius: "20px" }}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center"

                    }}

                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h6" style={{ color: "rgba(0, 95, 96, 0.8)" }} sx={{ fontWeight: 'bold' }}>
                        {card.Name}
                      </Typography>
                      <Typography variant="p" style={{ color: "rgba(0, 95, 96, 1)", fontSize: "18px" }}>
                        {card.email}
                      </Typography>
                      <br></br>
                      <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                      +92 {card.contact_number}
                    </Typography>
                   
                    {uCheck==1 &&
                    <div>
                    <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                    Wrong Reports: {card.WrongReports}
                  </Typography>
                  <br></br>
                  <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                  Right Reports: {card.CorrectReport}
                    </Typography>
                </div>
                    }
                    </CardContent>
                
                    <Box alignItems={"center"} >
                      <CardActions sx={{ marginLeft: 9 }}>
                        {check == 1 ?
                          <Button class="pkg-btn" style={{ color: 'white','margin-left': '25px' }} onClick={() => { BlockUser(card.email) }}>Block</Button>
                          : <Button class="pkg-btn" style={{ 'margin-left': '12px', color: 'white' }} onClick={() => { UnblockUser(card.email) }}>Unblock</Button>
                        }
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2} alignItems={"center"}>
              <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
            </Stack>
          </Container>:<div>
          <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340 }}>No Users</h2>
          
        </div>}
        </main>

      </main>
    </div>
  );



}

export default ManageUsers

