import { useEffect,useState } from "react";
import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import avatarUser from "../images/newUser.jpg" 
import Navbar from './Navbar2';
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { AlignTop } from "phosphor-react";
const Authenticate = () => {
  // Sample user data
  const [Ads, setAds] = useState([]);
  const [User,setUser] = useState([]);
  const [Images, setImages] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(0);
  useEffect(() => {
    var user = localStorage.getItem('EmailAuth')
    axios.get(`http://localhost:3006/Get_Up_UserAuth/${user}`)
      .then((response) => {
        var temp = response.data;
        temp.forEach(element => {
            element.Images = JSON.parse(element.Images)
          });
       console.log(temp)
        setUser(temp[0])     
        setImages(temp[0].Images)  
      });
  }, []);


const verify =(email)=>{
    axios.put(`http://localhost:3006/setAuth/${email}`).then((res) => {
        console.log(res.data);
        User(
          User.filter((val) => {
            return val.user != email
          }))
      })
      axios.put(`http://localhost:3006/setAuth2/${email}`).then((res) => {
        console.log(res.data);
        User(
          User.filter((val) => {
            return val.user != email
          }))
      })
      navigate('/userreq')
}

const del =(email)=>{
  axios.put(`http://localhost:3006/delAuth/${email}`).then((res) => {
      console.log(res.data);
      User(
        User.filter((val) => {
          return val.user != email
        }))
    })
    axios.delete(`http://localhost:3006/delAuth2/${email}`).then((res) => {
      console.log(res.data);
      User(
        User.filter((val) => {
          return val.user != email
        }))
    })
    navigate('/userreq')
}

useEffect(() => {
  if (!localStorage.getItem('Adminemail')) {
    navigate('/Adminlogin')
  }
}, [])
  return (
    <div>    
    <Navbar />
    <Container maxWidth="md" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
    <h1 style={{marginLeft:350}}>Verify User</h1>
      <Paper elevation={3} style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
      <Grid item>
      <img src={avatarUser} alt="Profile Picture" style={{ width: "120px", height: "120px",marginLeft:350, marginBottom: "20px" }} />
       </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
       
         
          <Grid item style={{marginleft:300}}>
          <div style={{marginLeft:230}}>
            <Typography variant="h4" gutterBottom>
              Name: {User.Name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {User.user}
            </Typography>
            <Typography variant="body1" gutterBottom>
              CNIC: {User.CNIC}
            </Typography>
            <Typography variant="body1" gutterBottom>
             NTN: {User.NTN}
          </Typography>
          </div>

            <div className="grid-container">
            {Images.map((image, index) => (
              <div className="grid-item" key={index}>
                <img
                  src={image}
                  alt={image.alt}
                  style={{ maxWidth: '100%', height: '15%',marginTop:10,marginLeft:100 }}
                />
              </div>
            ))}
           
          </div>

          <div>
          <Button class="verify-btn" style={{marginLeft:150,marginTop:30}} onClick={()=>{verify(User.user)}}>Verify User</Button>
          <Button class="verify-btn" style={{marginLeft:5,marginTop:30}} onClick={()=>{del(User.user)}}>Reject Request</Button>
          </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>

  
    </div>

  );
};

export default Authenticate;
